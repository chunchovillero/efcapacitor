import { Component, OnInit, ɵConsole } from '@angular/core';
import { Profile, Post, Usuarios } from '../../models/data.model';
import { Observable } from 'rxjs';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { CrearpostPage } from '../crearpost/crearpost.page';

const { Storage } = Plugins;

// import * as $ from 'jquery';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuarios: Usuarios;
  public listadousuarios: any = [];
  public listadostories: any = [];
  public listadopublicidad: any = [];
  public listadoposttalleres: any = [];
  public listadoposttallerescount: any = [];
  public listadopostpromocion: any = [];
  public listadopost: any = [];
  public listadopostpublicidad: any = [];
  public search: any;
  public cantidad = 10;
  public postamostrar: any = [];
  loading: any;
  public ver: any;
  listusuarios: any;
  listpost: any;
  listpostcount: any;
  listadoamostrar: any = [];

  desde = 0;
  hasta = 10;
  incremento = 10;

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
  alt: number;

  slideOpts = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };
  listo = 0;
  sublistadopublicidad;
  puedeordenar: any = 1;

  constructor(
    public userService: DataService,
    public modalCtrl: ModalController,
    private viewer: PhotoViewer,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.altura();
    this.showdata();
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
    this.usuario.tipocuenta = user.tipo_cuenta;
    this.getAllUser();
    this.getPublicidadSlide();
  }

  ionViewWillLeave() {
  }

  doRefresh(event) {
    this.cantidad = 10;
    this.postamostrar = [];
    this.listadoamostrar = [];
    this.desde = 0;
    this.hasta = 10;

    this.ordenar(this.desde, this.hasta);

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  altura() {
    this.alt =  window.innerHeight;
  }

  getAllUser() {
    this.listusuarios = this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
      this.getAllPostTallerescount();
    });
  }

  getAllPostTallerescount() {
    this.listpostcount =  this.userService.getAllPostTallerescount().subscribe( publicidad => {
      this.listadoposttallerescount = publicidad;
      this.getAllPostTalleres();
    });
  }

  getAllPostTalleres() {
    this.listpost = this.userService.getAllPostTalleres().subscribe( publicidad => {
      this.listadoposttalleres = publicidad;
      this.listo = 1;
      // this.detenerpost();

      setTimeout(() => {
        if (this.puedeordenar === 1) {
          this.ordenar(this.desde, this.hasta);
          this.puedeordenar = 0;
        }
      }, 1000);

    });
  }

  getPublicidadSlide() {
    this.sublistadopublicidad = this.userService.getPublicidadSlide().subscribe( publicidad => {
      this.listadopublicidad = publicidad;
    });
  }

  ordenar(desde, hasta) {

    this.desde = desde;
    this.hasta = hasta;
    if (this.hasta > this.listadoposttalleres.length) {
      this.hasta = this.listadoposttalleres.length;
    }
    // tslint:disable-next-line: prefer-for-of
    for (let index = this.desde; index < this.hasta; index++) {
      const element = this.listadoposttalleres[index];
      this.listadoamostrar.push(element);
    }
  }

  loadData(event) {
    this.desde = this.desde + this.incremento;
    this.hasta = this.hasta + this.incremento;

    if ( this.hasta > this.listadoposttalleres.length ) {
      this.hasta = this.listadoposttalleres.length;
      this.ordenar(this.desde, this.hasta);
      event.target.complete();
      return;
    } else {
      this.ordenar(this.desde, this.hasta);
      event.target.complete();
    }
  }

  hace(time) {
    return moment(time, 'MMDDYYYY HH:mm:ss').locale('es').fromNow();
  }

  zoom(image) {
    const title = '';
    const options = {
      share: true, // default is false
      closeButton: false, // default is true
      copyToReference: true, // default is false
      headers: 'nmnmnm',  // If this is not provided, an exception will be triggered
      piccasoOptions: { } // If this is not provided, an exception will be triggered
    };
    this.viewer.show(image, title, options);
  }

  async crearPost() {
    const modal = await this.modalController.create({
      component: CrearpostPage,
      componentProps: {
        uid: this.usuario.id,
      }
    });
    return await modal.present();
  }
}
