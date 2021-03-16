import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-corazon',
  templateUrl: './corazon.component.html',
  styleUrls: ['./corazon.component.scss'],
})
export class CorazonComponent implements OnInit {

  @Input() iduser: any;
  @Input() idpost: any;
  public idlike: any;
  public listadolikes: any [];
  public megusta: any = 0;

  constructor(
    public userService: DataService
  ) { }

  ngOnInit() {
    this.getLikes();
  }

  getLikes() {
    this.userService.getLikePost(this.idpost).subscribe( likes => {
      this.listadolikes = likes;
      this.Megusta();
    });
  }

  getComentarios() {
    this.userService.getLikePost(this.idpost).subscribe( likes => {
      this.listadolikes = likes;
      this.Megusta();
    });
  }

  Like() {
      this.userService.crearLike(this.idpost, this.iduser)
      .then(res => {
        this.idlike = res.id;
      }, err => {
      });
  }

  public Megusta() {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.listadolikes.length; index++) {
      const element = this.listadolikes[index];
      if (element.iduser === this.iduser) {
        this.megusta = 1;
        this.idlike = element.id;
      }
    }
  }

  EliminarLike() {
    this.userService.dejarlike(this.idlike);
    this.megusta = 0;
    this.idlike = '';
  }

}
