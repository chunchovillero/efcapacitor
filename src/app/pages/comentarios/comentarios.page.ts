import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, Comentario, Push } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { Plugins} from '@capacitor/core';
import * as moment from 'moment';

const { Storage } = Plugins;

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

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

  propietario: any;

  user: any;
  idpost: string;
  public listadousuarios: any = [];
  public listadocomentarios: any = [];
  public post: any;
  coment: any;

  constructor(
    private route: ActivatedRoute,
    public userService: DataService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.route.snapshot.paramMap.get('usuario');
    this.idpost = this.route.snapshot.paramMap.get('item');
    this.showdata();
  }

  ionViewWillLeave() {
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;

    this.userService.getDataUser(user.id).subscribe( usuarios => {
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
    });

    this.getAllUser();
    this.getcomentarios();
    this.getpost();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  getcomentarios() {
    this.userService.getcomentarios(this.idpost).subscribe( comentarios => {
      this.listadocomentarios = comentarios;
    });
  }

  getpost() {
    this.userService.ShowPost(this.idpost).subscribe((resultado) => {
      this.post = resultado.payload.data();
    });
  }

  hace(time){
    // return moment().format('MMDDYYYY HH:mm:ss a');
    return moment(time, 'MMDDYYYY HH:mm:ss').locale('es').fromNow();
  }

  comentar() {
    const mensaje: Comentario = {
      comentario: this.coment,
      date: new Date(),
      uid: this.user,
      id: this.idpost,
      respuesta: 'no'
     };
    this.userService.ComentarPost( mensaje );
    this.coment = '';
    if (this.post.creador !== this.usuario.id) {
      this.sendpush();
    }
  }

  sendpush() {
    this.userService.getOnceDataUser(this.post.creador).toPromise()
      .then( user => {
        this.propietario = user.data() as Profile;
        const data: Push = {
          url: '/verpost/' + this.idpost + '/' + this.usuario.id,
          mensaje: this.usuario.name + ' ha comentado tu publicación',
          header: 'Tienes unn nuevo comentario',
          pushid: this.propietario.pushid
        };
        this.userService.sendPush(data);
      });
  }
}
