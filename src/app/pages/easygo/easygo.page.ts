import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/data.model';
import { Plugins } from '@capacitor/core';
import { DataService } from '../../services/data.service';
import { database } from 'firebase';

const { Storage } = Plugins;

@Component({
  selector: 'app-easygo',
  templateUrl: './easygo.page.html',
  styleUrls: ['./easygo.page.scss'],
})
export class EasygoPage implements OnInit {

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
  listusuarios: any;
  public listadousuarios: any = [];
  listpostcount: any;
  listpost: any;
  listadoposttalleres: any = [];
  listadoposttallerescount: any = [];
  listadohistorias: any = [];
  usuarioshistoria: any = [];
  arrayusuario: any = [];
  listhistorias: any;
  subgetmiseasygo: any;
  miseasygo: any = [];
  user: any;

  constructor(
    public userService: DataService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listadohistorias = [];
    this.usuarioshistoria = [];
    this.arrayusuario = [];
    this.showdata();
  }

  ionViewWillLeave() {
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
    this.usuario.tipocuenta = user.tipo_cuenta;
    this.usuario.avatar = user.avatar;
    this.yo();
    this.getAllUser();
  }

  yo() {
    this.user = this.userService.getDataUser(this.usuario.id).subscribe( usuarios => {
      const data = usuarios.payload.data() as Profile;
      this.usuario.avatar = data.avatar;
    });
  }

  getAllUser() {
    this.listusuarios = this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
      this.getAllhistorias();
      this.getEasyGo();
    });
  }

  getEasyGo() {
    this.subgetmiseasygo = this.userService.getmisEasyGo(this.usuario.id).subscribe( easygobyuser => {
      this.miseasygo = easygobyuser;
    });
}

  getAllhistorias() {
    this.listhistorias = this.userService.getAllEasyGo().subscribe( historias => {
      this.listadohistorias = historias;
      this.pararsub();
      this.crearusuarios();
    });
  }

  crearusuarios() {
    const con = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.listadohistorias.length; index++) {
      const element = this.listadohistorias[index];
      const n = this.arrayusuario.includes(element.uid);

      if(n) {
      } else {
        this.usuarioshistoria.push({ userid: element.uid, historias: [], currentItem: 0});
        this.arrayusuario.push(element.uid);
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
        if (usuarioid === element.uid) {
          this.usuarioshistoria[index].historias.push(element);
        }
      }
    }
  }

  pararsub() {
    this.listhistorias.unsubscribe();
    this.listusuarios.unsubscribe();
  }

  actualizar() {
    this.showdata();
  }

}
