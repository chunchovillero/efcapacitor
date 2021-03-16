import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/data.model';
import { Plugins } from '@capacitor/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';


const { Storage } = Plugins;

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.page.html',
  styleUrls: ['./cotizar.page.scss'],
})
export class CotizarPage implements OnInit {

  listadocategorias: any = [];
  public listadopublicidad: any = [];
  public categoria: any;
  subgetcategorias: any;
  subgetPublicidadSlide: any;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    init: true,
    autoplay: {
      delay : 4000
    }
  };

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

  constructor(
    public userService: DataService,
    public modalCtrl: ModalController,
    public router: Router,
    public menu: MenuController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menu.enable(true);
    setTimeout(() => {
      this.showdata();
    }, 1000);

    this.getCategorias();
    this.getPublicidadSlide();
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
    this.usuario.tipocuenta = user.tipo_cuenta;
  }

  ionViewWillLeave() {
    this.subgetcategorias .unsubscribe();
    this.subgetPublicidadSlide.unsubscribe();
  }

  getCategorias() {
      this.subgetcategorias = this.userService.getCategorias().subscribe( categorias => {
        this.listadocategorias = categorias;
      });
  }

  getPublicidadSlide() {
    this.subgetPublicidadSlide = this.userService.getPublicidadSlide().subscribe( publicidad => {
      this.listadopublicidad = publicidad;
    });
  }

}
