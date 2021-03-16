import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Plugins } from '@capacitor/core';
import { Profile, Historia } from '../../models/data.model';
import { ViewFlags } from '@angular/compiler/src/core';
import { CreatestoriePage } from '../createstorie/createstorie.page';
import { ModalController } from '@ionic/angular';
import { StorieviewerPage } from '../storieviewer/storieviewer.page';
import * as firebase from 'firebase/app';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { VideoEditor } from '@ionic-native/video-editor/ngx';



const { Storage } = Plugins;

@Component({
  selector: 'app-storietop',
  templateUrl: './storietop.page.html',
  styleUrls: ['./storietop.page.scss'],
})
export class StorietopPage implements OnInit {

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

  listhistorias: any;
  listadohistorias: any = [];
  listusuarios: any;
  listadousuarios: any = [];
  historiasordenadas: any = [];
  usuarioshistoria: any = [];
  arrayusuario: any = [];
  subido = 0;
  preparando = 0;
  myPhotosRef: any;
  task: AngularFireUploadTask;
  mediaduration: any;
  setInterval: number | undefined;

  constructor(
    public userService: DataService,
    public modalController: ModalController,
    private storage2: AngularFireStorage,
    private videoEditor: VideoEditor
  ) { }

  ngOnInit() {
    this.showdata();
    console.log('sasas');
    this.setInterval = window.setTimeout(() => {
      this.showdata();
      console.log('data actualizada de las historias');
     }, 30000);
  }

  ionViewWillEnter() {
    this.showdata();
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
    this.getAllUser();
  }

  getAllhistorias() {
    this.listadohistorias = [];
    this.usuarioshistoria = [];
    this.arrayusuario = [];

    this.listhistorias = this.userService.getAllhistorias().subscribe( historias => {
      this.listadohistorias = historias;
      this.pararsub();
      this.crearusuarios();
    });
  }

  getAllUser() {
    this.listusuarios = this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
      this.getAllhistorias();
    });
  }

  crearusuarios() {
    const con = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.listadohistorias.length; index++) {
      const element = this.listadohistorias[index];
      const n = this.arrayusuario.includes(element.userid);

      if(n) {
      } else {
        this.usuarioshistoria.push({ userid: element.userid, historias: [], currentItem: 0});
        this.arrayusuario.push(element.userid);
      }
    }
    this.insertarhistoria();
  }

  insertarhistoria() {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.usuarioshistoria.length; index++) {
      const usuarioid = this.usuarioshistoria[index].userid;

      // tslint:disable-next-line: prefer-for-of
      for (let index2 = 0; index2 < this.listadohistorias.length; index2++) {
        const element = this.listadohistorias[index2];

        if (usuarioid === element.userid) {
          this.usuarioshistoria[index].historias.push(element);
        }
      }
    }
  }

  pararsub() {
    this.listhistorias.unsubscribe();
    this.listusuarios.unsubscribe();
  }

  async verhistorias(i) {
    const modal = await this.modalController.create({
      component: StorieviewerPage,
      componentProps: {
        name: this.usuario.name,
        contenido: this.usuarioshistoria,
        tapped: i,
        listo: 0,
        listadousuarios: this.listadousuarios
      }
    });
    await modal.present();
  }

  async crearhistoria() {
    const modal = await this.modalController.create({
      component: CreatestoriePage,
      componentProps: {
        usuarios: this.listadousuarios,
        media: [],
        listo: 0
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if(data.listo === 1) {
      this.preparando = 1;

      if (data.historia.tipo === 0) {
        this.historia.media = data.historia.media ;
        this.historia.userid = data.historia.userid;
        this.historia.duration = data.historia.duration;
        this.historia.elementos = data.historia.elementos;
        this.historia.tipo = data.historia.tipo;

        this.userService.crearHistoria(this.historia)
          .then(res => {
            this.preparando = 0;
            this.subido = 1;
            setTimeout(() => {
              this.subido = 0;
            }, 5000333333);
            this.getAllhistorias();
          }, err => {
          });
      } else {
        this.tofirebase(data.historia);
      }
      this.getAllhistorias();
    }
  }

  private tofirebase(historia): void {
    const nombre = '' + (Math.floor(Math.random() * (999999999 - 111111111)) + 111111111) + '.jpeg';
    this.myPhotosRef = firebase.storage().ref('historias');
    const path = 'historias' + '/' + nombre;
    const fileRef = this.storage2.ref(path);
    this.task = this.myPhotosRef.child(nombre)
      .putString(historia.medialocal, 'base64', { contentType: 'type' })
      .then(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          this.historia.media = downloadURL ;
          this.historia.userid = historia.userid;
          this.historia.duration = historia.duration;
          this.historia.elementos = historia.elementos;
          this.historia.tipo = historia.tipo;
          if(this.historia.tipo === 2) {
          }
          this.userService.crearHistoria(this.historia)
              .then(res => {
                this.getAllhistorias();
                this.preparando = 0;
                this.subido = 1;
                setTimeout(() => {
                  this.subido = 0;
                }, 5000);
              }, err => {
              });
        });
      });
  }

}
