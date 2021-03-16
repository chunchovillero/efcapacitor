import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, Push } from '../../models/data.model';
import { Plugins } from '@capacitor/core';
import { DataService } from '../../services/data.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-seguidos',
  templateUrl: './seguidos.page.html',
  styleUrls: ['./seguidos.page.scss'],
})
export class SeguidosPage implements OnInit {

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

  user: any;
  losigo: any = [];
  listadoseguidos: any [];
  listadomisseguidos: any [];
  listadoseguidores: any [];
  listadopost: any [];
  listadousuarios: any [];
  ver: string;
  subuser: any;
  propietario: Profile;

  constructor(
    private route: ActivatedRoute,
    public userService: DataService

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.route.snapshot.paramMap.get('user');
    this.ver = this.route.snapshot.paramMap.get('ver');
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

      this.getAllUser();
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
      this.getSeguidores();
      this.getSeguidos();
      this.getmisSeguidos();
    });
  }

  getSeguidos() {
    this.userService.getSeguidos(this.user).subscribe( seguidor => {
      this.listadoseguidos = seguidor;
    });
  }
  getSeguidores() {
    this.userService.getSeguidores(this.user).subscribe( seguidores => {
      this.listadoseguidores = seguidores;
    });
  }

  getmisSeguidos() {
    this.userService.getSeguidos(this.usuario.id).subscribe( seguidor => {
      this.listadomisseguidos = seguidor;
    });
  }

  versilosigo(id) {
    let losigo = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index <  this.listadomisseguidos.length; index++) {
      const element =  this.listadomisseguidos[index];
      if (element.seguido === id) {
        losigo = 1;
      }
    }
    return losigo;
  }

  seguir(id) {
    this.userService.crearSeguidor(this.usuario.id, id)
    .then(res => {
      this.sendPushSeguir(id);
    }, err => {
      console.log(err);
    });
  }

  sendPushSeguir(id) {
    this.userService.getOnceDataUser(id).toPromise()
            .then( user => {
              this.propietario = user.data() as Profile;
              console.log('propietario', this.propietario);
              const data: Push = {
                url: '/profile/' + this.usuario.id,
                mensaje: this.usuario.name + ' ha empezado a seguirte',
                header: 'Tienes un nuevo seguidor',
                pushid: this.propietario.pushid
              };
              this.userService.sendPush(data);
            });
  }

  dejardeseguir(id) {
    // tslint:disable-next-line: prefer-for-of
    let losigo = '';
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index <  this.listadomisseguidos.length; index++) {
      const element =  this.listadomisseguidos[index];
      if (element.seguido === id) {
        losigo = element.id;
        this.userService.dejardeseguir(losigo);
      }
    }
  }

  quever(ev: any) {
    this.ver = ev.detail.value;
  }

}
