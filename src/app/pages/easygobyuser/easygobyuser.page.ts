import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Profile } from '../../models/data.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-easygobyuser',
  templateUrl: './easygobyuser.page.html',
  styleUrls: ['./easygobyuser.page.scss'],
})
export class EasygobyuserPage implements OnInit {

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

  byuser: string;
  subgetmiseasygo: any;
  miseasygo: any = [];
  subuser: any;
  constructor(
    private route: ActivatedRoute,
    public userService: DataService
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.byuser = this.route.snapshot.paramMap.get('idtaller');
    this.showdata();
  }

  ionViewWillLeave() {
    this.miseasygo = [];
    this.subgetmiseasygo.unsubscribe();
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
    this.usuario.tipocuenta = user.tipo_cuenta;

    this.subuser = this.userService.getDataUser(this.byuser).subscribe( profile => {
      const data = profile.payload.data() as Profile;
      this.profile.name = data.name;
      this.profile.descripcion = data.descripcion;
      this.profile.avatar = data.avatar;
      this.profile.fondo = data.fondo;
      this.profile.tipocuenta = data.tipocuenta;
      this.profile.experiencia = data.experiencia;
      this.profile.especialidad = data.especialidad;
      this.profile.direccion = data.direccion;
      this.profile.infoadicional = data.infoadicional;
      this.profile.telefono = data.telefono;
      this.profile.pl = data.pl;
      this.profile.emailcontacto = data.emailcontacto;
      this.profile.categorias = data.categorias;
      this.profile.categoriasnombre = data.categoriasnombre;
      });
    this.getEasyGoByTaller();
  }

  getEasyGoByTaller() {
      this.subgetmiseasygo = this.userService.getmisEasyGo(this.byuser).subscribe( easygobyuser => {
        this.miseasygo = easygobyuser;
      });
  }

}
