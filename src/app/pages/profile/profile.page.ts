import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, Push } from '../../models/data.model';
import { Plugins} from '@capacitor/core';
import { DataService } from '../../services/data.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import * as moment from 'moment';
import { MenuController, NavController, AlertController } from '@ionic/angular';

const { Storage } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  slideOpts = {
    slidesPerView: 4,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }};

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

  profile: Profile = {
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

  idprofile: any;
  subuser: any;
  subverSilosigo: any;
  losigo: any = [];
  getseguidores: any;
  listadoseguidores: any = [];
  getseguidos: any;
  listadoseguidos: any = [];
  subgetMisSucurales: any;
  listadosucursales: any = [];
  latitudecm: any;
  longitudecm: any;
  subsusuarios: any;
  getPostbyId: any = [];
  listadopost: any = [];
  subgetmispostcount: any;
  mispostcount: any = [];
  subgetmispost: any;
  mispost: any = [];
  listadousuarios: any = [];
  constructor(
    public userService: DataService,
    private route: ActivatedRoute,
    private launchNavigator: LaunchNavigator,
    private viewer: PhotoViewer,
    private navCtrl: NavController,
    public menu: MenuController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.menu.enable(true);
  }

  ionViewWillEnter() {
    this.idprofile = this.route.snapshot.paramMap.get('id');
    this.showdata();
  }

  ionViewWillLeave() {
    this.subuser.unsubscribe();
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
    this.usuario.tipocuenta = user.tipo_cuenta;

    this.subuser = this.userService.getDataUser(this.idprofile).subscribe( usuarios => {
      this.versilosigo();
      this.getSeguidores();
      this.getSeguidos();
      this.getmispostcount();
      this.getAllUser();
      this.getMisSucurales();
      const data = usuarios.payload.data() as Profile;
      this.profile.name = data.name;
      this.profile.descripcion = data.descripcion;
      this.profile.avatar = data.avatar;
      this.profile.fondo = data.fondo;
      this.profile.tipocuenta = data.tipocuenta;
      this.profile.experiencia = data.experiencia;
      this.profile.especialidad = data.especialidad;
      this.profile.pushid = data.pushid;
      this.profile.direccion = data.direccion;
      this.profile.infoadicional = data.infoadicional;
      this.profile.telefono = data.telefono;
      this.profile.pl = data.pl;
      this.profile.emailcontacto = data.emailcontacto;
      this.profile.categorias = data.categorias;
      this.profile.categoriasnombre = data.categoriasnombre;
      });
  }

  verfotoperfil() {
  }

  editarPerfil() {
    this.navCtrl.navigateForward('/editarperfil');
  }
  seguir() {
    this.userService.crearSeguidor(this.usuario.id, this.idprofile).then(
      res => {
        this.sendPushSeguir();
        }, err => {
      }
    );
  }

  sendPushSeguir() {
    const data: Push = {
      url: '/profile/' + this.usuario.id,
      mensaje: this.usuario.name + ' ha empezado a seguirte',
      header: 'Tienes un nuevo seguidor',
      pushid: this.profile.pushid
    };
    this.userService.sendPush(data);
  }

  dejardeseguir() {
    this.userService.dejardeseguir(this.losigo[0].id);
  }

  versilosigo() {
    this.subverSilosigo = this.userService.verSilosigo( this.idprofile, this.usuario.id ).subscribe( losigo => {
    this.losigo = losigo;
    });
  }

  getSeguidores() {
    this.getseguidores = this.userService.getSeguidores(this.idprofile).subscribe( seguidores => {
      this.listadoseguidores = seguidores;
    });
  }

  getSeguidos() {
    this.getseguidos = this.userService.getSeguidos(this.idprofile).subscribe( seguidor => {
      this.listadoseguidos = seguidor;
    });
  }

  getMisSucurales() {
    this.subgetMisSucurales = this.userService.getMisSucurales(this.idprofile).subscribe( sucursales => {
      this.listadosucursales = sucursales;
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.listadosucursales.length; index++) {
        const element = this.listadosucursales[index];
        if (element.nombresucursal === 'Casa Matriz') {
          if (element.latitud !== '' && element.longitud !== '') {
            this.latitudecm =  element.latitud;
            this.longitudecm = element.longitud;
          }
        }
      }

    });
  }

  getAllUser() {
    this.subsusuarios = this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  getmispostcount() {
    this.subgetmispostcount = this.userService.getmispostcount(this.idprofile).subscribe( publicidad => {
      this.mispostcount = publicidad;
      this.getmispost();
    });
  }

  getmispost() {
    this.subgetmispost = this.userService.getmispost(10, this.idprofile).subscribe( publicidad => {
      this.mispost = publicidad;
    });
  }

  navme(lat, lng) {
    this.launchNavigator.navigate([lat, lng]).then(
      success => {
      }, error => {
      }
    );
  }

  llamar(numero) {
    // this.callNumber.callNumber(numero, true);
  }

  zoom(image) {
    const title = '';
    const options = {
      share: false
    };
    this.viewer.show(image, title, options);
  }

  hace(time) {
    return moment(time, 'MMDDYYYY HH:mm:ss').locale('es').fromNow();
  }

  async delpost(idpost) {
    const alert = await this.alertController.create({
      header: 'Eliminar Publicación!',
      message: 'Estas seguro de eliminar esta publicación!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Eliminar',
          handler: () => {
          this.deletePost(idpost);
          }
        }
      ]
    });
    await alert.present();
  }

  eliminarPost(idpost) {
    this.delpost(idpost);
  }

  deletePost(idpost) {
    this.userService.eliminarpost(idpost);
  }

}
