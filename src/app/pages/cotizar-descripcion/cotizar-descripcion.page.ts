import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins, FilesystemDirectory, FilesystemEncoding, CameraResultType, CameraSource } from '@capacitor/core';
import { Profile, PutSolicitudCotizacion, Push } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import { MapsAPILoader } from '@agm/core';
import { AlertController, ToastController, LoadingController, NavController } from '@ionic/angular';
// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus/ngx';


declare const google: any;
// tslint:disable-next-line: no-namespace
declare namespace google.maps.places {
  export interface PlaceResult { geometry; }
}

const { Storage } = Plugins;
const { Geolocation } = Plugins;
const { Filesystem } = Plugins;
const { Camera } = Plugins;

@Component({
  selector: 'app-cotizar-descripcion',
  templateUrl: './cotizar-descripcion.page.html',
  styleUrls: ['./cotizar-descripcion.page.scss'],
})
export class CotizarDescripcionPage implements OnInit {

  usuario: Profile = {
    id: '',
    descripcion: '',
    name: '',
    avatar: '',
    fondo: '',
    tipocuenta: '',
    experiencia: '',
    especialidad: '',
    infoadicional: '',
    direccion: ''
  };

  coords: any;
  task: AngularFireUploadTask;
  categorianombre: any;
  categoriaslug: any;
  autoid: any;
  auto: any = [];
  subauto: any;
  geoLongitude: number;
  geoLatitude: number;
  geoAddress: string;
  public search: any;
  rango: any = 10;
  descripcion: any = '';
  media = [];
  upload = [];
  loading: HTMLIonLoadingElement;
  myPhotosRef: any;
  options: any;
  subiendo: any = 0;
  subgetallsucursales: any;
  listadosucursales: any = [];
  listadosucursalescategorias: any = [];
  listadosucursalesdistancia: any = [];
  idcotizacion: any;
  datosde: any = [];
  dejarsinimagen: any = 0;

  constructor(
    public userService: DataService,
    private route: ActivatedRoute,
    private nativeGeocoder: NativeGeocoder,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    public alertController: AlertController,
    public toastController: ToastController,
    // private mediaCapture: MediaCapture,
    // private videoCapturePlus: VideoCapturePlus,
    private storage2: AngularFireStorage,
    public loadingController: LoadingController,
    private httpClient: HttpClient,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.subiendo = 0;
    this.media = [];
    this.upload = [];
    this.listadosucursales = [];
    this.listadosucursalescategorias = [];
    this.listadosucursalesdistancia = [];
    this.auto = [];
    this.categorianombre = this.route.snapshot.paramMap.get('categorianombre');
    this.categoriaslug = this.route.snapshot.paramMap.get('categoriaslug');
    this.autoid = this.route.snapshot.paramMap.get('autoid');
    this.showdata();
  }

  ionViewWillLeave() {
    this.subauto.unsubscribe();
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
    this.getAuto();
    this.locate();
    this.getAllSucurales();
  }

  getAuto() {
    this.subauto = this.userService.getAuto(this.autoid).subscribe((resultado) => {
      this.auto = resultado.payload.data();
    });
  }

  getAllSucurales() {
    this.subgetallsucursales = this.userService.getAllSucurales().subscribe( sucursales => {
      this.listadosucursales = sucursales;
      this.validarCategoriaSucursal();
    });
  }

  validarCategoriaSucursal(){
    this.listadosucursalescategorias = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.listadosucursales.length; index++) {
      console.log(index);
      const element = this.listadosucursales[index];
      // tslint:disable-next-line: prefer-for-of
      for (let index2 = 0; index2 < this.listadosucursales[index].categorias.length; index2++) {
        const element2 = this.listadosucursales[index].categorias[index2];
        if (element2 === this.categoriaslug) {
          this.listadosucursalescategorias.push(this.listadosucursales[index]);
        }
      }
    }
  }

  validarDistancia() {
    this.listadosucursalesdistancia = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.listadosucursalescategorias.length; index++) {
      const element = this.listadosucursalescategorias[index];
      const p = 0.017453292519943295;
      const c = Math.cos;
      // tslint:disable-next-line: max-line-length
      const a = 0.5 - c((this.geoLatitude - element.latitud) * p) / 2 + c(element.latitud * p) * c((this.geoLatitude) * p) * (1 - c(((this.geoLongitude - element.longitud) * p))) / 2;
      const dis = (12742 * Math.asin(Math.sqrt(a)));
      const distancia =  Math.trunc(dis);

      if (distancia <= this.rango) {
        this.listadosucursalesdistancia.push(this.listadosucursalescategorias[index]);
      }
    }

    this.enviarTalleres();
  }

  enviarTalleres() {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.listadosucursalesdistancia.length; index++) {
      const element = this.listadosucursalesdistancia[index];

      const data: PutSolicitudCotizacion = {
        uid: this.usuario.id,
        tallerid: this.listadosucursalesdistancia[index].idusuario,
        sucursalid: this.listadosucursalesdistancia[index].id,
        nombresucursal: this.listadosucursalesdistancia[index].nombresucursal,
        cotizacionid: this.idcotizacion,
        date: new Date()
      };

      this.userService.putSolicitudCotizacion(data)
        .then(res => {
        }, err => {
      });
    }

    this.enviarNotificacion(this.idcotizacion);
  }

  async Toast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'secondary',
    });
    toast.present();
    return;
  }

  enviarNotificacion(idcotizacion) {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.listadosucursalesdistancia.length; index++) {
          const element = this.listadosucursalesdistancia[index];

          this.datosde = this.userService.getOnceDataUser(element.idusuario).toPromise()
            .then( user => {
              const userData = user.data() as Profile;

              const data: Push = {
                url: '/cotizacion/' + idcotizacion,
                mensaje: this.descripcion,
                header: 'Tienes una nueva solicitud de cotización',
                pushid: userData.pushid
              };
              this.userService.sendPush(data);

            });
        }

        this.fin(idcotizacion);
  }

  async fin(idcotizacion) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo!!!',
      subHeader: 'Solicitudes enviadas',
      // tslint:disable-next-line: max-line-length
      message: 'Hemos enviado tu solicitud a ' + this.listadosucursalesdistancia.length + ' talleres que coinciden con la categoria ' + this.categorianombre + ' y un rango de distancia de ' + this.rango + ' km(s).',

      buttons: [
        {
          text: 'VER SOLICITUD',
          handler: () => {
            this.navCtrl.navigateForward('/cotizacion/' + idcotizacion);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertimagen() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sin imagen',
      subHeader: 'No has ingresado imagenes',
      // tslint:disable-next-line: max-line-length
      message: 'Estas seguro de seguir sin selecionar imágenes?',

      buttons: [
        {
          text: 'VOLVER',
          handler: () => {
          }
        },
        {
          text: 'CONTINUAR',
          handler: () => {
            this.dejarsinimagen = 1;
            this.subir();
          }
        },
      ]
    });

    await alert.present();
  }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coords = coordinates.coords;
    this.geoLatitude = this.coords.latitude;
    this.geoLongitude = this.coords.longitude;
    this.reverse(this.coords);
  }

  reverse(resp) {
    this.nativeGeocoder.reverseGeocode(resp.latitude, resp.longitude)
    .then((result: NativeGeocoderResult[]) => {
      this.geoAddress = result[0].thoroughfare + ' ' + result[0].subThoroughfare + ', ' + result[0].locality ;
    })
    .catch((error: any) =>  console.log(error));
  }

  cambio() {
    this.mapsAPILoader.load().then(() => {
      const nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      const autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.geoAddress = place['formatted_address'];
          this.search = '';
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.geoLatitude = place.geometry.location.lat();
          this.geoLongitude = place.geometry.location.lng();
        });
      });
    });
  }

  deleteimg(i) {
    this.media.splice(i, 1);
  }

  async tomarImagen() {
    const image = await Camera.getPhoto({
      quality: 70,
      width: 600,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    const nombre = '' + (Math.floor(Math.random() * (999999999 - 111111111)) + 111111111) + '.jpeg';
    const imageUrl = image.base64String;
    try{
          const fullData = 'data:' + 'image/jpeg' + ';base64,' + imageUrl;
          this.media.push({base64 : fullData, tipo: 'image/jpeg', binary: image.base64String, name: nombre, carpeta: 'imagenes'});
        } catch (error){
        }
  }

  async elegirImagen() {
    const image = await Camera.getPhoto({
      quality: 70,
      width: 600,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    const nombre = '' + (Math.floor(Math.random() * (999999999 - 111111111)) + 111111111) + '.jpeg';
    const imageUrl = image.base64String;
    try{
          const fullData = 'data:' + 'image/jpeg' + ';base64,' + imageUrl;
          this.media.push({base64 : fullData, tipo: 'image/jpeg', binary: image.base64String, name: nombre, carpeta: 'imagenes'});
        } catch (error){
        }
  }

  // grabarVideo(){
  //   this.cargando('Cargando video');
  //   const options: CaptureImageOptions = { limit: 1 };
  //   this.mediaCapture.captureVideo(options).then(async (data: MediaFile[]) => {
  //     for (const media of data){
  //       const fullPath = media.fullPath;
  //       try{
  //         const mediaBinary = await Filesystem.readFile({path: fullPath});
  //         if (mediaBinary.data){
  //           const fullData = 'data:' + media.type + ';base64,' + mediaBinary.data;
  //           this.media.push({base64 : fullData, tipo: media.type, binary: mediaBinary.data, name: media.name, carpeta: 'videos'});
  //           // this.tofirebase(media.name, mediaBinary.data, media.type, 'imagenes');
  //         }
  //       }
  //       catch (error){
  //         this.loading.dismiss();
  //       }
  //     }
  //     this.loading.dismiss();
  //   },
  //   (err: CaptureError) => {
  //     this.loading.dismiss();
  //   });
  // }

  // grabarVideo() {
  //   this.cargando('Cargando video');
  //   console.log('entrando a video capture');
  //   const options: VideoCapturePlusOptions = {
  //     limit: 1,
  //     highquality: false,
  //     portraitOverlay: 'assets/img/camera/overlay/portrait.png',
  //     landscapeOverlay: 'assets/img/camera/overlay/landscape.png'
  //  };
  //   this.videoCapturePlus.captureVideo(options).then(async (data: MediaFile[]) => {
  //     console.log(data[0].fullPath);
  //     for (const media of data){
  //       const fullPath = media.fullPath;
  //       try{
  //         const mediaBinary = await Filesystem.readFile({path: fullPath});
  //         if (mediaBinary.data){
  //           const fullData = 'data:' + media.type + ';base64,' + mediaBinary.data;
  //           this.media.push({base64 : fullData, tipo: media.type, binary: mediaBinary.data, name: media.name, carpeta: 'videos'});
  //           // this.tofirebase(media.name, mediaBinary.data, media.type, 'imagenes');
  //         }
  //       }
  //       catch (error){
  //         this.loading.dismiss();
  //       }
  //     }
  //     this.loading.dismiss();
  //   }, error => console.log('Something went wrong'));
  // }

  private tofirebase(name: string, localurl: string, type: string, carpeta: string): void {
    this.myPhotosRef = firebase.storage().ref(carpeta);
    const path = carpeta + '/' + name;
    const fileRef = this.storage2.ref(path);
    this.task = this.myPhotosRef.child(name)
      .putString(localurl, 'base64', { contentType: type })
      .then(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL);
          this.loading.dismiss();
          this.upload.push({url : downloadURL, tipo: type, nombre: name});
          this.subiendo = this.subiendo + 1;
          this.subir();
        });
      });
  }

  async cargando(texto: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: texto,
    });
    await this.loading.present();
  }

  subir(){

    if (this.descripcion === '') {
      this.Toast('Ingresa una descripción');
      return;
    }

    if (this.geoAddress === '') {
      this.Toast('Ingresa una dirección');
      return;
    }
    if ( this.dejarsinimagen === 0) {
      if (this.media.length === 0) {
        this.alertimagen();
        return;
      }
    }

    if (this.subiendo === this.media.length) {
      if (this.media.length > 0) {
        this.loading.dismiss();
      }

      this.guardarSolicitud();
    } else {
      const actual = this.subiendo + 1;
      this.cargando('Subiendo archivo ' + actual + ' de ' + this.media.length);
      // tslint:disable-next-line: max-line-length
      this.tofirebase(this.media[this.subiendo].name, this.media[this.subiendo].binary, this.media[this.subiendo].tipo, this.media[this.subiendo].carpeta);
    }
  }

  guardarSolicitud() {
    const data = {
      categorianombre: this.categorianombre,
      categoriaslug: this.categoriaslug,
      descripcion: this.descripcion,
      direccion: this.geoAddress,
      latitud: this.geoLatitude,
      longitud: this.geoLongitude,
      marca: this.auto.marca,
      modelo: this.auto.modelo,
      patente: this.auto.patente,
      color: this.auto.color,
      autoimagenes: this.auto.imagenes,
      imagenes: this.upload,
      rango: this.rango,
      estado: 'abierta'
    };

    this.userService.crearCoti(this.usuario.id, data)
        .then(res => {
          const resid = res.id;
          this.idcotizacion = res.id;
          this.validarDistancia();
        }, err => {
        });
  }



}
