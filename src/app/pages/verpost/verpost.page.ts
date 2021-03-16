import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, Comentario } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { Plugins} from '@capacitor/core';
import * as moment from 'moment';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

const { Storage } = Plugins;


@Component({
  selector: 'app-verpost',
  templateUrl: './verpost.page.html',
  styleUrls: ['./verpost.page.scss'],
})
export class VerpostPage implements OnInit {
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

  slideOpts = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  user: any;
  idpost: string;
  public listadousuarios: any = [];
  public listadocomentarios: any = [];
  public item: any;
  coment: any;

  constructor(
    private route: ActivatedRoute,
    public userService: DataService,
    private viewer: PhotoViewer
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.route.snapshot.paramMap.get('usuario');
    this.idpost = this.route.snapshot.paramMap.get('item');
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

    this.getAllUser();
    this.getcomentarios();
    this.getpost();
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

  getpost() {
    this.userService.ShowPost(this.idpost).subscribe((resultado) => {
      this.item = resultado.payload.data();
    });
  }

  hace(time){
    // return moment().format('MMDDYYYY HH:mm:ss a');
    return moment(time, 'MMDDYYYY HH:mm:ss').locale('es').fromNow();
  }

  comentar() {
    const mensaje: Comentario = {
      comentario: this.coment,
      date: new Date(),
      uid: this.user,
      id: this.idpost,
      respuesta: 'no'
     };
    this.userService.ComentarPost( mensaje );
    this.coment = '';
  }

  zoom(image) {
    const title = '';
    const options = {
      share: true, // default is false
      closeButton: false, // default is true
      copyToReference: true, // default is false
      headers: 'nmnmnm',  // If this is not provided, an exception will be triggered
      piccasoOptions: { } // If this is not provided, an exception will be triggered
    };
    this.viewer.show(image, title, options);
  }

}
