import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-terminosycondiciones',
  templateUrl: './terminosycondiciones.page.html',
  styleUrls: ['./terminosycondiciones.page.scss'],
})
export class TerminosycondicionesPage implements OnInit {

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
