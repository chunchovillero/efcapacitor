import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/data.model';
import { Plugins } from '@capacitor/core';
import { DataService } from '../../services/data.service';
import { ActionSheetController, AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import * as moment from 'moment'; 
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


const { Storage } = Plugins;
const { Filesystem } = Plugins;

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

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
  listadonotificaciones: any = [];
  listadocotizaciones: any = [];
  listadousuarios: any = [];
  listadomiscotizaciones: any = [];

  constructor(
    public userService: DataService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private mediaCapture: MediaCapture,
    private storage2: AngularFireStorage,
    public alertController: AlertController,
    private navCtrl: NavController,
    private viewer: PhotoViewer,
    public menu: MenuController
  ) { }

  ngOnInit() {
    this.menu.enable(true);
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
      this.getAllCotizaciones();
      this.getAllUser();
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
      this.getAllCotizaciones();
    });
  }

  getMisCotizacionesTaller() {
    this.userService.MisCotizacionesTaller(this.usuario.id).subscribe( miscotizaciones => {
      this.listadomiscotizaciones = miscotizaciones;
    });
  }

  getMisCotizacionesUsuario() {
    this.userService.MisCotizacionesUsuario(this.usuario.id).subscribe( miscotizaciones => {
      this.listadomiscotizaciones = miscotizaciones;
      console.log('mis cotizacionnes', this.listadomiscotizaciones);
    });
  }


  getAllCotizaciones() {
    this.userService.getAllCotizaciones().subscribe( cotizaciones => {
      this.listadocotizaciones = cotizaciones;

      if (this.usuario.tipocuenta === 'Taller') {
        this.getMisCotizacionesTaller();
      }

      if (this.usuario.tipocuenta === 'Usuario') {
        this.getMisCotizacionesUsuario();
      }
    });
  }

  hace(time){
    return moment(time, 'MMDDYYYY HH:mm:ss').locale('es').fromNow();
  }

  zoom(image) {
    const title = '';
    const options = {
        share: false
    };
    this.viewer.show(image, title, options);
  }

}
