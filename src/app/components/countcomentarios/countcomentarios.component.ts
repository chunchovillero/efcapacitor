import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-countcomentarios',
  templateUrl: './countcomentarios.component.html',
  styleUrls: ['./countcomentarios.component.scss'],
})
export class CountcomentariosComponent implements OnInit {

  @Input() idpost: any;
  @Input() iduser: any;

  listadocomentarios: any = [];
  public listadousuarios: any = [];

  constructor(
      public userService: DataService,
      public modalCtrl: ModalController
    ) { }


  ngOnInit() {
    this.getcomentarios();
  }

  getcomentarios() {
    this.userService.getcomentarios(this.idpost).subscribe( comentarios => {
      this.listadocomentarios = comentarios;
    });
  }

}
