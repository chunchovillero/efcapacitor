import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-countlike',
  templateUrl: './countlike.component.html',
  styleUrls: ['./countlike.component.scss'],
})
export class CountlikeComponent implements OnInit {

  @Input() idpost: any;

  public listadolikes: any = [];
  listadocomentarios: any = [];

  constructor(
    public userService: DataService
  ) { }

  ngOnInit() {
    this.getLikes();
    this.getcomentarios();
  }

  getcomentarios() {
    this.userService.getcomentarios(this.idpost).subscribe( comentarios => {
      this.listadocomentarios = comentarios;
    });
  }


  getLikes() {
    this.userService.getLikePost(this.idpost).subscribe( likes => {
      this.listadolikes = likes;
    });
  }

}
