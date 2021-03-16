import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  search: any;
  listadousuarios: any [];
  textobuscar: any;

  constructor(
    public userService: DataService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
      this.userService.getAllUser().subscribe( usuarios => {
        this.listadousuarios = usuarios;
      });
    }

    buscar( event ) {
      this.textobuscar = event.detail.value;
    }

    enviar(uid) {
      this.textobuscar = '';
      this.search = '';
      this.router.navigate(['/profile', uid]);
    }

}
