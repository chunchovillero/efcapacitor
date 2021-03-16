import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { Chats } from 'src/app/models/data.model';

@Component({
  selector: 'app-ultimomensaje',
  templateUrl: './ultimomensaje.component.html',
  styleUrls: ['./ultimomensaje.component.scss'],
})
export class UltimomensajeComponent implements OnInit {
  @Input() idchat: any;
  @Input() parte: any;

  chat: Chats = {
    creador: '',
    participante: '',
    date: new Date(),
    idcotizacion: '',
    preciofinal: '',
    tipo: ''
  };

  listadomensajes: any = [];
  ultimomensaje: any = [];
  listadousuarios: any = [];
  constructor(
    public userService: DataService,
  ) {
    this.getAllUser();
    
  }

  ngOnInit() {

    this.getmensajes();
    this.getChat();
  }

  getmensajes() {
    this.userService.getmensajes(this.idchat).subscribe( mensajes => {
      this.listadomensajes = mensajes;
      this.ultimomensaje = this.listadomensajes[this.listadomensajes.length - 1];
    });
  }

  getChat() {
    this.userService.getChat(this.idchat).subscribe( cotizacion => {
      const data = cotizacion.payload.data() as Chats;
      this.chat.creador = data.creador;
      this.chat.participante =  data.participante;
      this.chat.date = data.date;
      this.chat.idcotizacion = data.idcotizacion;
      this.chat.preciofinal = data.preciofinal;
      this.chat.tipo = data.tipo;
      this.chat.istiping = data.istiping;
      this.chat.quienistiping = data.quienistiping;
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  hace(time){
    return moment(time, 'MMDDYYYY HH:mm:ss').locale('es').fromNow();
  }
}
