import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, Comentario } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { Plugins} from '@capacitor/core';
import * as moment from 'moment';
const { Storage } = Plugins;

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.page.html',
  styleUrls: ['./respuestas.page.scss'],
})
export class RespuestasPage implements OnInit {

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

  idcomentario: any;
  idpost: any;
  iduser: any;
  public respuesta: any;
  public comentario: any;
  public listadousuarios: any = [];
  public listadorespuestas: any = [];

  constructor(
    private route: ActivatedRoute,
    public userService: DataService
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.idcomentario = this.route.snapshot.paramMap.get('item');
    this.idpost = this.route.snapshot.paramMap.get('post');
    this.iduser = this.route.snapshot.paramMap.get('usuario');
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

    this.getRespuesta();
    this.getAllUser();
    this.getRespuestas();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  getRespuesta() {
    this.userService.ShowRespuesta(this.idcomentario).subscribe((resultado) => {
      this.comentario = resultado.payload.data();
    });
  }

  getRespuestas() {
    this.userService.getrespuestas(this.idcomentario).subscribe( comentarios => {
      this.listadorespuestas = comentarios;
    });
  }

  enviarmensaje() {
    const mensaje : Comentario = {
      comentario: this.respuesta,
      date: new Date(),
      uid: this.iduser,
      id: this.idpost,
      respuesta: this.idcomentario
     };
    this.userService.ComentarPost( mensaje );
  }


  hace(time){
    return moment(time, 'MMDDYYYY HH:mm:ss').locale('es').fromNow();
  }

}
