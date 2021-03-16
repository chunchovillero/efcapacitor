import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-respuestasc',
  templateUrl: './respuestasc.component.html',
  styleUrls: ['./respuestasc.component.scss'],
})
export class RespuestascComponent implements OnInit {

  public listadorespuestas: any = [];
  public listadousuarios: any = [];

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

  @Input() iduser: any;
  @Input() idcomentario: any;
  isauth: any;

  constructor(
    public userService: DataService,
    public modalController: ModalController
  ) {
    this.isauth = this.userService.isAuth().subscribe(user => {
      if (user) {
        this.usuario.id = user.uid;
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
          this.usuario.cotizaciones = data.cotizaciones;
              });
      } else {
      }
    });
  }

  ngOnInit() {
    this.isauth.unsubscribe();
    this.getRespuestas();
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  getRespuestas() {
    this.userService.getrespuestas(this.idcomentario).subscribe( comentarios => {
      this.listadorespuestas = comentarios;
    });
  }
}
