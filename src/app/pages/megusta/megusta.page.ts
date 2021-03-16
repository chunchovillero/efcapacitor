import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { Profile, Push } from '../../models/data.model';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-megusta',
  templateUrl: './megusta.page.html',
  styleUrls: ['./megusta.page.scss'],
})
export class MegustaPage implements OnInit {
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


  idpost: any;
  iduser: any;

  public listadolikes: any = [];
  public listadousuarios: any = [];
  public listadoseguidores: any = [];
  propietario: any;
  subuser: any;

  constructor(
    public userService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.iduser = this.route.snapshot.paramMap.get('iduser');
    this.idpost = this.route.snapshot.paramMap.get('idpost');
    this.showdata();
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
      this.getSeguidores();
    });
  }

  ionViewWillLeave() {
  }

  getLikes() {
    this.userService.getLikePost(this.idpost).subscribe( likes => {
      this.listadolikes = likes;
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  getSeguidores() {
    this.userService.versilosigo(this.iduser).subscribe( seguidores => {
      this.listadoseguidores = seguidores;
      this.getLikes();
    });
  }

  versilosigo(id) {
    let losigo = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index <  this.listadoseguidores.length; index++) {
      const element =  this.listadoseguidores[index];
      if (element.seguido === id) {
        losigo = 1;
      }
    }
    return losigo;
  }

  seguir(id) {
    this.userService.crearSeguidor(this.iduser, id)
    .then(res => {
      this.sendPushSeguir(id);
    });
  }

  sendPushSeguir(id) {
    this.userService.getOnceDataUser(id).toPromise()
            .then( user => {
              this.propietario = user.data() as Profile;
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
    for (let index = 0; index <  this.listadoseguidores.length; index++) {
      const element =  this.listadoseguidores[index];
      if (element.seguido === id) {
        losigo = element.id;
        this.userService.dejardeseguir(losigo);
      }
    }
  }

}
