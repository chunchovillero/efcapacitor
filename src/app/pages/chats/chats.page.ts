import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Mensaje, Profile } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

const { Storage } = Plugins;

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

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
  getseguidores: any;
  listadoseguidores: any = [];
  getseguidos: any;
  listadoseguidos: any = [];

  listadousuarios: any = [];
  listadochats: any = [];
  consultarchat1: any = [];
  consultarchat2: any = [];
  mischatcount: any = 0;
  mischats: any = [];
  chatamostrar: any = [];

  segmentTab = 'Chats';
  chatData: any;
  click: any;
  title: boolean;
  tipo: string;
  errorMessage: any;
  getconsultarchat1: any;
  getconsultarchat2: any;
  consu = 0;

  constructor(
    public userService: DataService,
    public router: Router
  ) { }

  ngOnInit() {
    this.showdata();
  }

  ionViewWillEnter() {
    this.getAllchats();
    this.getAllUser();
    this.listadoseguidores = [];
    this.listadoseguidos = [];
    this.listadousuarios = [];
    this.listadochats = [];
    this.consultarchat1 = [];
    this.consultarchat2 = [];
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
      this.getSeguidores();
      this.getSeguidos();
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  segmentChanged(event: any) {
    this.segmentTab = event.detail.value;
  }

  toggleSearchTitl() {
    this.title = !this.title;
  }

  getAllchats() {
    this.userService.getAllchats().subscribe( chats => {
      this.listadochats = chats;
      console.log('cambia');
      this.mischat();
    });
  }

  mischat() {
    this.mischats = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.listadochats .length; index++) {
      const element = this.listadochats [index];
      if (element.creador === this.usuario.id || element.participante === this.usuario.id) {
        this.mischats.push(element);
      }
    }

    if (this.mischatcount !== this.mischats.length ) {
      this.mischatcount = this.mischats.length;
      this.chatamostrar = this.mischats;
    } else {
      this.chatamostrar.sort( (a, b) => {
        return (new Date(b.date) as any) - (new Date(a.date) as any);
      });
    }


  }

  getSeguidores() {
    this.getseguidores = this.userService.getSeguidores(this.usuario.id).subscribe( seguidores => {
      this.listadoseguidores = seguidores;
    });
  }

  getSeguidos() {
    this.getseguidos = this.userService.getSeguidos(this.usuario.id).subscribe( seguidor => {
      this.listadoseguidos = seguidor;
    });
  }

  inicarChat(id) {
    this.consu = 1;
    this.getconsultarchat1 = this.userService.consultarChat1(this.usuario.id, id).subscribe( consultarchat => {
      this.consultarchat1 = consultarchat;
      if ( this.consu === 1) {
        if (this.consultarchat1.length === 0) {
          this.consultarChat2(id);
        } else {
          this.consu = 0;
          this.router.navigate(['/chat', this.consultarchat1[0].id]);
        }
      }
    });
  }

  consultarChat2(id) {
    this.getconsultarchat2 = this.userService.consultarChat2(this.usuario.id, id).subscribe( consultarchat => {
      this.consultarchat2 = consultarchat;
      if ( this.consu === 1) {
        if (this.consultarchat2.length === 0) {
          this.crearChatok(id);
        } else {
          this.consu = 0;
          this.router.navigate(['/chat', this.consultarchat2[0].id]);
        }
      }
    });
  }

  crearChatok(id) {
    this.consu = 0;
    this.getconsultarchat1.unsubscribe();
    this.getconsultarchat2.unsubscribe();
    this.tipo = 'Normal';
    this.userService.crearChatNormal(this.usuario.id, id, 'sinid', this.tipo)
      .then(res => {
        this.router.navigate(['/chat', res.id]);
      }, err => {
        this.errorMessage = err.message;
      });
  }
}
