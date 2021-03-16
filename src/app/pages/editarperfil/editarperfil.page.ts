import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/data.model';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DataService } from '../../services/data.service';
import { ActionSheetController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase/app';


const { Storage } = Plugins;
const { Filesystem } = Plugins;
const { Camera } = Plugins;

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {

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
  subuser: any;
  loading: HTMLIonLoadingElement;
  avatar: any = '';
  avatarlocal: any = '';
  fondo: any = '';
  fondolocal: any = '';
  options: any = [];
  myPhotosRef: any;
  task: AngularFireUploadTask;
  nombrecambio: any = '';
  descripcioncambio: any = '';
  telefonocambio: any = '';
  especialidadcambio: any = '';
  experienciacambio: any = '';

  constructor(
    public userService: DataService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private storage2: AngularFireStorage,
    public alertController: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.avatar = '';
    this.avatarlocal = '';
    this.fondo = '';
    this.fondolocal = '';

    this.showdata();
  }

  ionViewWillLeave() {
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
    this.nombrecambio = this.usuario.name;

    this.subuser = this.userService.getDataUser(this.usuario.id).subscribe( usuarios => {
      const data = usuarios.payload.data() as Profile;
      this.usuario.name = data.name;
      this.nombrecambio = this.usuario.name;
      this.usuario.descripcion = data.descripcion;
      this.descripcioncambio = this.usuario.descripcion;
      this.usuario.avatar = data.avatar;
      this.usuario.fondo = data.fondo;
      this.usuario.tipocuenta = data.tipocuenta;
      this.usuario.experiencia = data.experiencia;
      this.experienciacambio = this.usuario.experiencia;
      this.usuario.especialidad = data.especialidad;
      this.especialidadcambio = this.usuario.especialidad;
      this.usuario.direccion = data.direccion;
      this.usuario.infoadicional = data.infoadicional;
      this.usuario.telefono = data.telefono;
      this.telefonocambio = this.usuario.telefono;
      this.usuario.pl = data.pl;
      this.usuario.emailcontacto = data.emailcontacto;
      this.usuario.categorias = data.categorias;
      this.usuario.categoriasnombre = data.categoriasnombre;
    });
  }

  async cargando(texto: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: texto,
    });
    await this.loading.present();
  }

  async editaravatar() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Foto desde galería',
        icon: 'images',
        handler: () => {
          this.pickImageAvatar();
        }
      }, {
        text: 'Foto desde cámara',
        icon: 'camera',
        handler: () => {
          this.capturarFotoAvatar();
        }
      }]
    });
    await actionSheet.present();
  }

  async editarportada() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Foto desde galería',
        icon: 'images',
        handler: () => {
          this.pickImageFondo();
        }
      }, {
        text: 'Foto desde cámara',
        icon: 'camera',
        handler: () => {
          this.capturarFotoFondo();
        }
      }]
    });
    await actionSheet.present();
  }

  async pickImageAvatar() {
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
          this.avatar = fullData;
          this.avatarlocal = imageUrl;
        } catch (error){
        }
  }

  async capturarFotoAvatar() {
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
          this.avatar = fullData;
          this.avatarlocal = imageUrl;
        } catch (error){
        }
  }


  async capturarFotoFondo() {
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
          this.fondo = fullData;
          this.fondolocal = imageUrl;
        } catch (error){
        }
  }

  async pickImageFondo() {
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
          this.fondo = fullData;
          this.fondolocal = imageUrl;
        } catch (error){
        }
  }

 guardarCambios() {
   // guardar avatar
   if ( this.avatar ){
     this.cargando('Actualizando avatar');
     this.tofirebaseavatar();
   } else {
      // guardar fondo
    if ( this.fondo ){
      this.cargando('Actualizando portada');
      this.tofirebasefondo();
    } else {
      // guardar datos
      this.cargando('Actualizando datos');
      // actualizando nombre
      // tslint:disable-next-line: max-line-length
      this.userService.updateDatos(this.nombrecambio, this.descripcioncambio, this.especialidadcambio, this.experienciacambio, this.usuario.id)
          .then(res => {
            this.loading.dismiss();
            this.volverPerfil();
          }, err => {
      });
    }
   }
 }

  private tofirebaseavatar(): void {
    this.myPhotosRef = firebase.storage().ref('avatar');
    const path = 'avatar' + '/' + this.usuario.id;
    const fileRef = this.storage2.ref(path);
    this.task = this.myPhotosRef.child(this.usuario.id)
      .putString(this.avatarlocal, 'base64', { contentType: 'image/jpeg' })
      .then(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          this.userService.updateAvatar(downloadURL, this.usuario.id)
              .then(res => {
                this.loading.dismiss();
                this.avatar  = '';
                this.guardarCambios();
              }, err => {
              });
          });
      });
  }

  private tofirebasefondo(): void {
    this.myPhotosRef = firebase.storage().ref('fondo');
    const path = 'fondo' + '/' + this.usuario.id;
    const fileRef = this.storage2.ref(path);
    this.task = this.myPhotosRef.child(this.usuario.id)
      .putString(this.fondolocal, 'base64', { contentType: 'image/jpeg' })
      .then(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          this.userService.updateFondo(downloadURL, this.usuario.id)
              .then(res => {
                this.loading.dismiss();
                this.fondo  = '';
                this.guardarCambios();
              }, err => {
              });
          });
      });
  }

  async volverPerfil() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo',
      message: 'Tu perfil ha sido actualizado correctamente.',
      buttons: [
        {
          text: 'Volver a mi perfil',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.navCtrl.navigateForward('/profile/' + this.usuario.id);
          }
        }
      ]
    });

    await alert.present();
  }

}
