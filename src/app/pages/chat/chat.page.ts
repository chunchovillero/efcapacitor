import { Component, OnInit, ViewChild } from '@angular/core';
import { Cotizacion, Profile, Mensaje, Chats, Push } from '../../models/data.model';
import { Plugins,  CameraResultType, CameraSource} from '@capacitor/core';
import { IonContent, AlertController, ActionSheetController, LoadingController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import * as firebase from 'firebase/app';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus/ngx';




const { Storage } = Plugins;
const { Filesystem } = Plugins;
const { Camera } = Plugins;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent, { read: IonContent }) myContent: IonContent;

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

  mensaje: Mensaje = {
    mensajero: '',
    mensaje: '',
    tipo: '',
    imagen: '',
    idchat: ''
  };

  chat: Chats = {
    creador: '',
    participante: '',
    date: new Date(),
    idcotizacion: '',
    preciofinal: '',
    tipo: ''
  };

  cotizacion: Cotizacion = {
    categorianombre: '',
    categoriaslug: '',
    date: '',
    estado: '',
    uid: '',
    descripcion: '',
    imagenes: [],
    latitud: '',
    longitud: '',
    direccion: '',
    comuna: '',
    rango: ''
  };

  public mensajes: any = [];
  message: any = '';
  respuesta: any = '';
  chatid: any;
  listadousuarios: any = [];
  de: any;
  para: any;
  datospara: any = [];
  datosde: any = [];
  subuser: any;
  yosoy: any;
  elchat: any;
  elotro: any = [];
  foto: any = 0;
  loading: any;
  media: any = [];
  options: { width: number; quality: number; outputType: number; maximumImagesCount: number; };
  myPhotosRef: any;
  task: AngularFireUploadTask;
  upload: any = [];
  subiendo: any = 0;

  constructor(
    public userService: DataService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    public alertController: AlertController,
    public router: Router,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    // private mediaCapture: MediaCapture,
    // private videoCapturePlus: VideoCapturePlus,
    private storage2: AngularFireStorage,
    private viewer: PhotoViewer
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.subiendo = 0;
    this.chatid = this.route.snapshot.paramMap.get('id');
    this.showdata();
  }

  ionViewWillLeave() {
    this.elchat.unsubscribe();
    if (this.yosoy === 'participante') {
      this.userService.updateChatparticipante(this.chatid, '0');
    }
    if (this.yosoy === 'creador') {
      this.userService.updateChatcreador(this.chatid, '0');
    }
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
    this.getChat();
    this.getAllUser();
  }

  getChat() {
    this.elchat = this.userService.getChat(this.chatid).subscribe( cotizacion => {
      const data = cotizacion.payload.data() as Chats;
      this.chat.creador = data.creador;
      this.chat.participante =  data.participante;
      this.chat.date = data.date;
      this.chat.idcotizacion = data.idcotizacion;
      this.chat.preciofinal = data.preciofinal;
      this.chat.tipo = data.tipo;
      this.chat.istiping = data.istiping;

      if (this.usuario.id === this.chat.creador ) {
      this.de = this.chat.creador;
      this.para = this.chat.participante;
      this.yosoy = 'creador';
      this.userService.updateChatcreador(this.chatid, '1');
      this.userService.getOnceDataUser(this.chat.participante).toPromise()
            .then( user => {
              this.elotro = user.data() as Profile;
            });
      }

      if (this.usuario.id === this.chat.participante ) {
      this.de = this.chat.participante;
      this.para = this.chat.creador;
      this.yosoy = 'participante';
      this.userService.updateChatparticipante(this.chatid, '1');
      this.userService.getOnceDataUser(this.chat.creador).toPromise()
            .then( user => {
              this.elotro = user.data() as Profile;
            });
      }

      if (this.chat.tipo === 'Cotizacion') {
      this.getCotizacion();
      }

      this.userService.getDataUser(this.para).subscribe( usuarios => {
        this.datospara = usuarios.payload.data() as Profile;
      });

      this.userService.getDataUser(this.de).subscribe( usuarios3 => {
        this.datosde = usuarios3.payload.data() as Profile;
      });
    });

    this.getMensajes();
  }

  getMensajes() {
    this.userService.getMensajes(this.chatid).subscribe( mensajes => {
      this.mensajes = mensajes;
      this.ScrollToBottom();
    });
  }

  ScrollToBottom() {
    setTimeout(() => {
      this.myContent.scrollToBottom(10);
    }, 1000);

  }

  getCotizacion() {
    this.userService.getCotizacion(this.chat.idcotizacion).subscribe( cotizacion => {
      const data = cotizacion.payload.data() as Cotizacion;
      this.cotizacion.categorianombre = data.categorianombre;
      this.cotizacion.categoriaslug = data.categoriaslug;
      this.cotizacion.date = data.date;
      this.cotizacion.uid = data.uid;
      this.cotizacion.estado = data.estado;
      this.cotizacion.latitud = data.latitud;
      this.cotizacion.longitud = data.longitud;
      this.cotizacion.comuna = data.comuna;
      this.cotizacion.direccion = data.direccion;
      this.cotizacion.idcoti = this.chat.idcotizacion;
      this.cotizacion.imagenes = data.imagenes;
      this.cotizacion.descripcion = data.descripcion;
      this.cotizacion.precioacordado = data.precioacordado;
      this.cotizacion.elegido = data.elegido;
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  hace(time) {
    return moment(time, 'MMDDYYYY HH:mm:ss').locale('es').format('l LTS');
  }

  enviarMensaje() {
    const data: Mensaje = {
      idchat: this.chatid,
      mensajero: this.usuario.id,
      mensaje: this.message,
      tipo: 'text',
      date: new Date()
    };

    this.respuesta = this.message;
    this.sendPush(this.respuesta);
    if (this.message !== '') {
      this.userService.sendMensaje(data)
      .then(res => {
        this.userService.updateChat2(this.chatid, '0', '');
        this.ScrollToBottom();
        this.userService.updateChat(this.chatid);
    }, err => {
      console.log(err);
    });
    }
    this.message = '';
  }

  sendPush(respuesta) {
    const data: Push = {
      url: '/chat/' + this.chatid,
      mensaje: respuesta,
      header: this.usuario.name + ' te envió mensaje',
      pushid: this.elotro.pushid
    };
    this.userService.sendPush(data);
  }

  sendPushElegir() {
    const data: Push = {
      url: '/cotizacion/' + this.chat.idcotizacion,
      mensaje: this.cotizacion.descripcion,
      header: this.usuario.name + ' te ha elegido para realizar su solicitud',
      pushid: this.elotro.pushid
    };
    this.userService.sendPush(data);
  }

  istiping() {
    if (this.chat.istiping === '0' && this.message.length > 0 ) {
      this.userService.updateChat2(this.chatid, '1', this.usuario.id);
    }

    if (this.chat.istiping === '1' && this.message.length === 0 ) {
      this.userService.updateChat2(this.chatid, '0', '');
    }
  }

  async elegir() {
    const alert = await this.alertController.create({
      header: 'Si estas seguro de elegir esta cotizacion, ingresa el precio final acordado',
      inputs: [
        {
          name: 'preciofinal',
          type: 'number',
          placeholder: 'Precio final'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          handler: (alertData) => {
            this.chat.preciofinal = alertData.preciofinal;
            this.elegirfinal();
          }
        }
      ]
    });
    await alert.present();
  }

  elegirfinal() {
    this.userService.elegirtaller( this.chat.idcotizacion, this.chat.creador, this.chatid, this.chat.preciofinal)
      .then(res => {
        this.sendPushElegir();
        this.gracias();
      }, err => {
        console.log(err);
      });
  }

  async gracias() {
    const alert = await this.alertController.create({
      header: 'Excelente, has elegido esta propuesta con un precio final de ' + this.chat.preciofinal + ' ',
      buttons: [
          {
          text: 'Continuar',
          handler: () => {
            this.router.navigate(['/cotizacion', this.chat.idcotizacion]);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Agrega una imagen o un video',
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
    }
    );
    await actionSheet.present();
  }

  async tomarImagen() {
    const image = await Camera.getPhoto({
      quality: 70,
      width: 600,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    this.foto = 1;
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
    this.foto = 1;
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
  //     this.foto = 1;
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
  //     this.foto = 1;
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


  async cargando(texto: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: texto,
    });
    await this.loading.present();
  }

  enviarMensajeImagen() {
    this.cargando('Subiendo archivos');
    // tslint:disable-next-line: max-line-length
    this.tofirebase(this.media[this.subiendo].name, this.media[this.subiendo].binary, this.media[this.subiendo].tipo, this.media[this.subiendo].carpeta);
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
          this.loading.dismiss();
          this.enviarConImagen();
        });
      });
  }


  enviarConImagen() {
    const data: Mensaje = {
      idchat: this.chatid,
      mensajero: this.usuario.id,
      mensaje: this.message,
      tipo: 'image',
      date: new Date()
    };

    this.respuesta = this.message;
    this.sendPush(this.respuesta);
    if (this.foto === 1) {
      this.userService.sendMensajeImagen(data, this.upload)
      .then(res => {
        this.userService.updateChat2(this.chatid, '0', '');
        this.ScrollToBottom();
        this.userService.updateChat(this.chatid);
    }, err => {
      console.log(err);
    });
    }
    this.media = [];
    this.upload = [];
    this.foto = 0;
    this.message = '';
  }

  zoom(image) {
    const title = '';
    const options = {
        share: false
    };
    this.viewer.show(image, title, options);
  }

  limpiar() {
    this.media = [];
    this.upload = [];
    this.foto = 0;
    this.message = '';
  }

}
