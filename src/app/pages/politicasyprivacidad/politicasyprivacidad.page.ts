import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-politicasyprivacidad',
  templateUrl: './politicasyprivacidad.page.html',
  styleUrls: ['./politicasyprivacidad.page.scss'],
})
export class PoliticasyprivacidadPage implements OnInit {
  configuracion: any = [];

  constructor(
    public userService: DataService,
  ) { }

  ngOnInit() {
    this.getConfiguracion();
  }

  getConfiguracion() {
    this.userService.ShowConfiguracion().subscribe((configuracion) => {
      this.configuracion = configuracion.payload.data();
    });
  }

}
