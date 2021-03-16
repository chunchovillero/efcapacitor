import { Component, OnInit, Input, NgModule } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FiltrarPipe } from '../../pipes/filtrar.pipe';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {
  @Input() idpost: any;
  @Input() iduser: any;

  listadocomentarios: any = [];
  public listadousuarios: any = [];

  constructor(
      public userService: DataService,
      public modalCtrl: ModalController,
      private navCtrl: NavController,
    ) { }

  ngOnInit() {
    this.getcomentarios();
    this.getAllUser();
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

  comentar(idpost, iduser) {
    this.navCtrl.navigateRoot('/comentarios/' + idpost + '/' + iduser);
  }
}
