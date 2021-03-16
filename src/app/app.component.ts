import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushService } from './services/push.service';
import { Profile } from './models/data.model';
import { DataService } from './services/data.service';
import { AuthenticateService } from './services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
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
  subgetmispost: any;
  mispost: any = [];
  listadomiscotizaciones: any = [];
  getuser: any;
  isauth: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pushService: PushService,
    public userService: DataService,
    public authService: AuthenticateService,
    public loadingController: LoadingController
  ) {
    this.isauth = this.userService.isAuth().subscribe(user => {
      if (user) {
        this.usuario.id = user.uid;
        this.getuser = this.userService.getDataUser(this.usuario.id).subscribe( usuarios => {
          const data = usuarios.payload.data() as Profile;
          if (user) {
            this.usuario.name = data.name;
            this.usuario.descripcion = data.descripcion;
            this.usuario.avatar = data.avatar;
            this.usuario.fondo = data.fondo;
            this.usuario.tipocuenta = data.tipocuenta;
            this.usuario.experiencia = data.experiencia;
            this.usuario.especialidad = data.especialidad;
            this.usuario.direccion = data.direccion;
            this.usuario.infoadicional = data.infoadicional;
            this.usuario.uid = data.uid;
            this.getPublicaciones();
            this.getMisCotizaciones();
            this.actualizarPushid();
          }
        });
      } else {
      }
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushService.configuracionInicial(0);
    });
  }

  getPublicaciones() {
    this.subgetmispost = this.userService.getmispost(10, this.usuario.id).subscribe( publicidad => {
      this.mispost = publicidad;
    });
  }

  actualizarPushid() {
    this.userService.editpushid(this.usuario.uid, this.pushService.userIdPush)
      .then(res => {
      }, err => {
        console.log(err);
      });
  }

  actualizarPushidCerrar() {
    this.userService.editpushid(this.usuario.uid, '')
      .then(res => {
      }, err => {
        console.log(err);
      });
  }

  CerrarSesion() {
    this.presentLoading();
    this.authService.logoutUser(this.usuario.id);
    setTimeout(() => {
      this.actualizarPushidCerrar();
    }, 4000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cerrando Sesion...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  actualizarDatos() {
    this.userService.getDataUser(this.usuario.id).subscribe( usuarios => {
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
      this.usuario.uid = data.uid;
      this.actualizarPushid();
    });
  }

  getMisCotizaciones() {
    if (this.usuario.tipocuenta === 'Taller') {
      this.getMisCotizacionesTaller();
    }

    if (this.usuario.tipocuenta === 'Usuario') {
      this.getMisCotizacionesUsuario();
    }
  }

  getMisCotizacionesTaller() {
    this.userService.MisCotizacionesTaller(this.usuario.id).subscribe( miscotizaciones => {
      this.listadomiscotizaciones = miscotizaciones;
    });
  }

  getMisCotizacionesUsuario() {
    this.userService.MisCotizacionesUsuario(this.usuario.id).subscribe( miscotizaciones => {
      this.listadomiscotizaciones = miscotizaciones;
    });
  }
}
