import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Historia, Profile } from '../../models/data.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as firebase from 'firebase/app';
import { DataService } from '../../services/data.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
// import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus/ngx';

const { Filesystem } = Plugins;
const { Storage } = Plugins;
const { Camera } = Plugins;

@Component({
  selector: 'app-createstorie',
  templateUrl: './createstorie.page.html',
  styleUrls: ['./createstorie.page.scss'],
})
export class CreatestoriePage implements OnInit {
  isWaiting: boolean;
  @ViewChild('video') set videoElement(video: ElementRef) {
    if (video) {
      this.video = video.nativeElement;

      this.video.onwaiting = () => {
        this.isWaiting = true;
      };

      this.video.onready = this.video.onload = this.video.onplaying = this.video.oncanplay = () => {
        this.isWaiting = false;
      };

      this.video.addEventListener('loadedmetadata', () => {
        this.historia.duration = Math.ceil(this.video.duration);
        this.video.play();
      });
    } else {
      if (this.video) {
        this.video = null;
      }
    }
  }
  video: any = '';

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

  historia: Historia = {
    userid: '',
    // tslint:disable-next-line: max-line-length
    media: '',
    tipo: 1000,
    duration: 5,
    elementos: '',
    medialocal: ''
  };

  ver = 0;
  filelocal = '';
  inputtop: any = 120;
  inputleft: any = 25;
  ancho: any;
  elementos = [];
  rotate: any = 0;
  elementoaeditar: any = 'nada';
  tamanoinput: any = 18;
  colorinput: any = '#fff';
  texto = '';
  gifs: any = [];
  iconos: any = [];
  fondos: any = [];
  media: any = [];
  options: any;

  slideOpts = {
    slidesPerView: 12,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };
  subuser: any;
  loading: HTMLIonLoadingElement;


  constructor(
    public modalController: ModalController,
    public userService: DataService,
    public loadingController: LoadingController,
    // private mediaCapture: MediaCapture,
    // private videoCapturePlus: VideoCapturePlus
  ) { }

  ngOnInit() {
    this.getMedia();
    this.getGif();
    this.getIconos();
    this.getFondos();
  }

  ionViewWillEnter() {
    this.showdata();
  }

  ionViewWillLeave() {
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;

    this.subuser = this.userService.getDataUser(this.usuario.id).subscribe( usuarios => {
      const data = usuarios.payload.data() as Profile;
      this.usuario.name = data.name;
      this.usuario.descripcion = data.descripcion;
      this.usuario.avatar = data.avatar;
      this.usuario.fondo = data.fondo;
      this.usuario.tipocuenta = data.tipocuenta;
      this.usuario.experiencia = data.experiencia;
      this.usuario.especialidad = data.especialidad;
      this.usuario.direccion = data.direccion;
      this.usuario.infoadicional = data.infoadicional;
      this.usuario.telefono = data.telefono;
      this.usuario.pl = data.pl;
      this.usuario.emailcontacto = data.emailcontacto;
      this.usuario.categorias = data.categorias;
      this.usuario.categoriasnombre = data.categoriasnombre;
    });
  }

  getFondos() {
    const storageRef = firebase.storage().ref('fondos');
    storageRef.listAll().then(result => {
      result.items.forEach(async ref => {
        this.fondos.push({
          name: ref.name,
          full: ref.fullPath,
          url: await ref.getDownloadURL(),
          ref
        });
      });
    });
    setTimeout( () => {
    }, 300);
  }

  getIconos() {
    const storageRef = firebase.storage().ref('iconos');
    storageRef.listAll().then(result => {
      result.items.forEach(async ref => {
        this.iconos.push({
          name: ref.name,
          full: ref.fullPath,
          url: await ref.getDownloadURL(),
          ref
        });
      });
    });
    setTimeout( () => {
    }, 300);
  }

  getGif() {
    const storageRef = firebase.storage().ref('gif');
    storageRef.listAll().then(result => {
      result.items.forEach(async ref => {
        this.gifs.push({
          name: ref.name,
          full: ref.fullPath,
          url: await ref.getDownloadURL(),
          ref
        });
      });
    });
    setTimeout( () => {
    }, 300);
  }

  getMedia() {
    this.userService.getMedia().subscribe((resultado) => {
      this.media = resultado.payload.data();
    });
  }

  elegir(opcion) {
    this.ver = opcion;
  }

  cerrarHistorias() {
    this.modalController.dismiss({
      listo: 0
    });
  }

  click(i) {
    this.colorinput = this.elementos[i].color;
    this.tamanoinput = this.elementos[i].fontsize;
    this.rotate = this.elementos[i].rotate;
    this.ver = 2;
    this.texto = this.elementos[i].texto;
    this.elementoaeditar = i;
  }

  click2(i) {
    this.ancho = this.elementos[i].width;
    this.rotate = this.elementos[i].rotate;
    this.ver = 7;
    this.elementoaeditar = i;
  }

  click2listo() {
    this.elementos[this.elementoaeditar].width = this.ancho;
    this.elementos[this.elementoaeditar].rotate = this.rotate;
    this.ver = 0;
    this.rotate = 0;
    this.elementoaeditar = 'nada';
    }

  drop(event: CdkDragDrop<string[]>, i) {
    const top =  this.elementos[i].top + event.distance.y;
    const left = this.elementos[i].left + event.distance.x;
    this.elementos[i].top =  top;
    this.elementos[i].left = left;
  }

  textolisto() {
    this.elementos.push({
      tipo : 'text',
      texto : this.texto,
      top: this.inputtop,
      left: this.inputleft,
      fontsize: this.tamanoinput,
      color: this.colorinput,
      rotate: this.rotate
    });
    this.ver = 0;
    this.texto = '';
    this.tamanoinput = 18;
    this.colorinput = '#fff';
    this.rotate = 0;
  }

  textoeditado() {
    this.elementos[this.elementoaeditar].texto = this.texto;
    this.elementos[this.elementoaeditar].color = this.colorinput;
    this.elementos[this.elementoaeditar].fontsize = this.tamanoinput;
    this.elementos[this.elementoaeditar].rotate = this.rotate;
    this.tamanoinput = 18;
    this.colorinput = '#fff';
    this.ver = 0;
    this.texto = '';
    this.rotate = 0;
  }

  delete() {
    if (this.elementoaeditar === 'nada') {
      this.ver = 0;
    } else {
      this.elementos.splice(this.elementoaeditar, 1);
      this.ver = 0;
      this.elementoaeditar = 'nada';
    }
  }

  setColor(color) {
    this.colorinput = color;
  }

  imagenlisto() {
    this.ver = 0;
  }

  setFondo(url) {
    this.historia.media = url;
    this.filelocal = url;
    this.historia.tipo = 0;
    this.ver = 0;
  }

  setGif(url) {
    this.elementos.push({
      tipo : 'imagen',
      url,
      top: this.inputtop,
      left: this.inputleft,
      width: 100,
      rotate: 0
    });

    this.ver = 0;
  }

  seticon(url) {
    this.elementos.push({
      tipo : 'imagen',
      url,
      top: this.inputtop,
      left: this.inputleft,
      width: 50
    });
    this.ver = 0;
  }

  async cargando(texto: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: texto,
    });
    await this.loading.present();
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

    console.log('imagen tomada', imageUrl);
    try{
          const fullData = 'data:' + 'image/jpeg' + ';base64,' + imageUrl;
          this.filelocal = fullData;
          this.historia.medialocal = image.base64String;
          this.historia.tipo = 1;
        } catch (error){
        }
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
          this.filelocal = fullData;
          this.historia.medialocal = image.base64String;
          this.historia.tipo = 1;
        } catch (error){
        }
  }

//   grabarVideo(){
//     this.cargando('Cargando video');
//     const options: CaptureImageOptions = { limit: 1 };
//     this.mediaCapture.captureVideo(options).then(async (data: MediaFile[]) => {
//       for (const media of data){
//         const fullPath = media.fullPath;
//         try{
//           const mediaBinary = await Filesystem.readFile({path: fullPath});
//           if (mediaBinary.data){
//             const fullData = 'data:' + 'video/mp4' + ';base64,' + mediaBinary.data;
//             this.filelocal = fullData;
//             this.historia.medialocal = mediaBinary.data;
//             this.historia.tipo = 2;
//           }
//         }
//         catch (error){
//           this.loading.dismiss();
//         }
//       }
//       this.loading.dismiss();
//     },
//     (err: CaptureError) => {
//       this.loading.dismiss();
//     });
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
//           this.filelocal = fullData;
//           this.historia.medialocal = mediaBinary.data;
//           this.historia.tipo = 2;
//         }
//       }
//       catch (error){
//         this.loading.dismiss();
//       }
//     }
//     this.loading.dismiss();
//   }, error => console.log('Something went wrong'));
// }

  finalizar() {
    this.historia.userid = this.usuario.id;
    this.historia.elementos = this.elementos;
    this.modalController.dismiss({
      listo: 1,
      historia: this.historia
    });
  }


}
