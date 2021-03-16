import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource  } from '@capacitor/core';
import { Profile, Post } from '../../models/data.model';
// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import * as firebase from 'firebase/app';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ActionSheetController, LoadingController, AlertController, NavController, ToastController, ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
// import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus/ngx';




const { Camera } = Plugins;
const { Storage } = Plugins;
const { Filesystem } = Plugins;

@Component({
  selector: 'app-crearpost',
  templateUrl: './crearpost.page.html',
  styleUrls: ['./crearpost.page.scss'],
})
export class CrearpostPage implements OnInit {

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

  post: Post =  {
    id: '',
    comentario: '',
    imagen: [],
    nombreCreador: '',
    avatarCreador: '',
    tipo: '',
    comentarios: []
  };

  media = [];
  upload = [];
  loading: HTMLIonLoadingElement;
  options: any;
  myPhotosRef: any;
  task: AngularFireUploadTask;
  subiendo: any = 0;
  mensaje: any = '';
  errorMessage: any;

  constructor(
    public userService: DataService,
    // private mediaCapture: MediaCapture,
    public actionSheetController: ActionSheetController,
    private storage2: AngularFireStorage,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private navCtrl: NavController,
    public toastController: ToastController,
    private modalController: ModalController,
    // private videoCapturePlus: VideoCapturePlus
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.media = [];
    this.upload = [];
    this.subiendo = 0;
    this.mensaje = '';
    this.showdata();
  }

  ionViewWillLeave() {
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
  }


  deleteimg(i) {
    this.media.splice(i, 1);
  }

  async tomarImagen() {
    const image = await Camera.getPhoto({
      quality: 100,
      width: 700,
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
      quality: 100,
      width: 700,
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

  private tofirebase(name: string, localurl: string, type: string, carpeta: string): void {
    this.myPhotosRef = firebase.storage().ref(carpeta);
    const path = carpeta + '/' + name;
    const fileRef = this.storage2.ref(path);
    this.task = this.myPhotosRef.child(name)
      .putString(localurl, 'base64', { contentType: type })
      .then(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
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
    if (this.subiendo === this.media.length) {
      if (this.media.length > 0) {
        this.loading.dismiss();
      }

      this.crearPost();
    } else {
      const actual = this.subiendo + 1;
      this.cargando('Subiendo archivo ' + actual + ' de ' + this.media.length);
      // tslint:disable-next-line: max-line-length
      this.tofirebase(this.media[this.subiendo].name, this.media[this.subiendo].binary, this.media[this.subiendo].tipo, this.media[this.subiendo].carpeta);
    }
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

  crearPost() {
    if (this.mensaje === '') {
      this.Toast('Ingresa un comentario para la publicación');
      return;
    }

    if (this.media.length === 0) {
      this.Toast('Debe ingresar al menos una imagen');
      return;
    }

    if (this.media.length === 0) {
      this.guardarPost();
    } else {
      if (this.subiendo === this.media.length) {
        if (this.media.length > 0) {
          this.loading.dismiss();
        }
        this.guardarPost();
      } else {
        const actual = this.subiendo + 1;
        this.cargando('Subiendo archivo ' + actual + ' de ' + this.media.length);
        // tslint:disable-next-line: max-line-length
        this.tofirebase(this.media[this.subiendo].name, this.media[this.subiendo].binary, this.media[this.subiendo].tipo, this.media[this.subiendo].carpeta);
      }
    }
  }

  guardarPost() {
    this.cargando('Guardando publicación');

    this.post.id = this.usuario.id;
    this.post.tipo = 'post';
    this.post.comentario = this.mensaje;

    this.userService.crearPost(this.post, this.upload)
      .then(res => {
        this.loading.dismiss();
        this.fin();
      }, err => {
        this.errorMessage = err.message;
      });
  }
  async fin() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo!!!',
      subHeader: 'Tu publicación ha sido creda',
      // tslint:disable-next-line: max-line-length
      message: '',

      buttons: [
        {
          text: 'IR A HOME',
          handler: () => {
            this.navCtrl.navigateForward('/home');
          }
        },
        {
          text: 'IR A MI PERFIL',
          handler: () => {
            this.navCtrl.navigateForward('/profile/' + this.usuario.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Agregar a tu publicación',
      cssClass: 'acluis',
      buttons: [{
        text: 'Foto desde galería',
        icon: 'images',
        handler: () => {
          this.elegirImagen();
        }
      }, {
        text: 'Foto desde cámara',
        icon: 'camera',
        handler: () => {
          this.tomarImagen();
        }
      }
      // {
      //   text: 'Video desde cámara',
      //   icon: 'videocam',
      //   handler: () => {
      //     this.grabarVideo();
      //   }
      // }
    ]
    });
    await actionSheet.present();
  }

  cerrar() {
    this.modalController.dismiss();
  }

}
