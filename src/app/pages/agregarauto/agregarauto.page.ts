import { Component, OnInit } from '@angular/core';
import { Profile, Autos } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { finalize } from 'rxjs/operators';
import { File } from '@ionic-native/file/ngx';
import { Plugins, FilesystemDirectory, FilesystemEncoding, CameraResultType, CameraSource } from '@capacitor/core';
export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
const { Filesystem } = Plugins;
const { Storage } = Plugins;
const { Camera } = Plugins;

@Component({
  selector: 'app-agregarauto',
  templateUrl: './agregarauto.page.html',
  styleUrls: ['./agregarauto.page.scss'],
})
export class AgregarautoPage implements OnInit {

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

  listadomarcas: any;
  listadomodelos: any;

  auto: Autos =  {
    uid: '',
    color: '',
    imagenes: [],
    marca: '',
    modelo: '',
    patente: ''
  };

  uid: any;

  options: any;
  imageResponse: any = [];
  uploadProgress = 0;
  mensaje: any = '';

  // Upload Task
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: any = '';

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  // Uploaded Image List
  images: Observable<MyData[]>;

  // File details
  fileName: string;
  fileSize: number;

  // Status check
  isUploading: boolean;
  isUploaded: boolean;
  subiendo: any = 0;
  cantidadsel: any;
  sub: any;
  errorMessage: any;
  media = [];
  upload = [];
  loading: HTMLIonLoadingElement;
  myPhotosRef: any;

  constructor(
    public userService: DataService,
    private modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController,
    private storage2: AngularFireStorage,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.media = [];
    this.upload = [];
    this.subiendo = 0;
    this.showdata();
    this.Marcas();
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
  }

  Marcas() {
    this.userService.Marcas().subscribe( marcas => {
      this.listadomarcas = marcas;
    });
  }

  selectMarcas(modelo){
    const modeloelegido = modelo.detail.value;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.listadomarcas.length; index++) {
      const element = this.listadomarcas[index];
      if (element.nombre === modeloelegido){
        this.listadomodelos = element.modelos;
      }
    }
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
    if (this.media.length === 0) {
      this.crearAuto();
    } else {
      if (this.subiendo === this.media.length) {
        this.auto.imagenes = this.upload;
        this.loading.dismiss();
        this.crearAuto();
      } else {
        const actual = this.subiendo + 1;
        this.cargando('Subiendo archivo ' + actual + ' de ' + this.media.length);
        // tslint:disable-next-line: max-line-length
        this.tofirebase(this.media[this.subiendo].name, this.media[this.subiendo].binary, this.media[this.subiendo].tipo, this.media[this.subiendo].carpeta);
      }
    }
  }

  crearAuto() {
    if (this.auto.marca === '') {
      this.Toast('Seleccione una marca');
      return;
    }

    if (this.auto.modelo === '') {
      this.Toast('Seleccione el modelo');
      return;
    }

    if (this.auto.patente === '') {
      this.Toast('Ingrese la patente');
      return;
    }

    if (this.auto.color === '') {
      this.Toast('Ingrese el color');
      return;
    }

    this.auto.uid = this.usuario.id;
    this.cargando('Guardando auto');
    this.userService.crearAuto(this.auto)
    .then(res => {
      this.loading.dismiss();
      this.modalController.dismiss();
    }, err => {
      this.errorMessage = err.message;
    });
  }

  cerrar() {
    this.modalController.dismiss();
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

}
