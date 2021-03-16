import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { Profile, PutSolicitudCotizacion} from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import { MapsAPILoader } from '@agm/core';
import { AlertController, ToastController, LoadingController, NavController } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders} from '@angular/common/http';

declare const google: any;
// tslint:disable-next-line: no-namespace
declare namespace google.maps.places {
  export interface PlaceResult { geometry; }
}

const { Storage } = Plugins;
const { Geolocation } = Plugins;
const { Filesystem } = Plugins;

@Component({
  selector: 'app-creareasygo',
  templateUrl: './creareasygo.page.html',
  styleUrls: ['./creareasygo.page.scss'],
})
export class CreareasygoPage implements OnInit {
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

  constructor(
    public userService: DataService,
    private route: ActivatedRoute,
    private nativeGeocoder: NativeGeocoder,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    public alertController: AlertController,
    public toastController: ToastController,
    private mediaCapture: MediaCapture,
    private storage2: AngularFireStorage,
    public loadingController: LoadingController,
    private httpClient: HttpClient,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
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
    this.locate();
  }

  async fin() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo!!!',
      subHeader: 'Tu promoción EasyGo ha sido creada',
      // tslint:disable-next-line: max-line-length
      message: 'Se ha creado tu promoción EasyGo con dirección ' + this.geoAddress + '.',

      buttons: [
        {
          text: 'IR A EASYGO',
          handler: () => {
            this.navCtrl.navigateForward('/easygo');
          }
        }
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

  tomarImagen(){
    this.cargando('Cargando imágenes');
    const options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureImage(options).then(async (data: MediaFile[]) => {
      for (const media of data){
        const fullPath = media.fullPath;
        try{
          const mediaBinary = await Filesystem.readFile({path: fullPath});
          if (mediaBinary.data){
            const fullData = 'data:' + media.type + ';base64,' + mediaBinary.data;
            this.media.push({base64 : fullData, tipo: media.type, binary: mediaBinary.data, name: media.name, carpeta: 'imagenes'});
            // this.tofirebase(media.name, mediaBinary.data, media.type, 'imagenes');
          }

        }
        catch (error){
          this.loading.dismiss();
        }
      }
      this.loading.dismiss();
    },
    (err: CaptureError) => {
      this.loading.dismiss();
    });
  }

  grabarVideo(){
    this.cargando('Cargando video');
    const options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options).then(async (data: MediaFile[]) => {
      for (const media of data){
        const fullPath = media.fullPath;
        try{
          const mediaBinary = await Filesystem.readFile({path: fullPath});
          if (mediaBinary.data){
            const fullData = 'data:' + media.type + ';base64,' + mediaBinary.data;
            this.media.push({base64 : fullData, tipo: media.type, binary: mediaBinary.data, name: media.name, carpeta: 'videos'});
            // this.tofirebase(media.name, mediaBinary.data, media.type, 'imagenes');
          }
        }
        catch (error){
          this.loading.dismiss();
        }
      }
      this.loading.dismiss();
    },
    (err: CaptureError) => {
      this.loading.dismiss();
    });
  }

  elegirImagen() {
  }


  private tofirebase(name: string, localurl: string, type: string, carpeta: string): void {
    this.myPhotosRef = firebase.storage().ref(carpeta);
    const path = carpeta + '/' + name;
    const fileRef = this.storage2.ref(path);
    this.task = this.myPhotosRef.child(name)
      .putString(localurl, 'base64', { contentType: type })
      .then(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
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
    if (this.subiendo === this.media.length) {
      if (this.media.length > 0) {
        this.loading.dismiss();
      }

      this.guardarSolicitud();
    } else {
      const actual = this.subiendo + 1;
      this.cargando('Subiendo archivo ' + actual + ' de ' + this.media.length);
      this.loading.dismiss();
      // tslint:disable-next-line: max-line-length
      this.tofirebase(this.media[this.subiendo].name, this.media[this.subiendo].binary, this.media[this.subiendo].tipo, this.media[this.subiendo].carpeta);
    }
  }

  guardarSolicitud() {
    const data = {
      descripcion: this.descripcion,
      direccion: this.geoAddress,
      latitud: this.geoLatitude,
      longitud: this.geoLongitude,
      imagenes: this.upload,
      estado: 'abierta'
    };

    console.log('subir con esta data', data);

    this.userService.crearEasyGo(this.usuario.id, data)
        .then(res => {
          const resid = res.id;
          this.fin();
        }, err => {
        });
  }
}
