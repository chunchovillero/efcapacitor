import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Profile } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AgregarautoPage } from '../agregarauto/agregarauto.page';

const { Storage } = Plugins;

@Component({
  selector: 'app-seleccionarauto',
  templateUrl: './seleccionarauto.page.html',
  styleUrls: ['./seleccionarauto.page.scss'],
})
export class SeleccionarautoPage implements OnInit {

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

  listadoautos: any = [];
  categorianombre: any;
  categoriaslug: any;
  submisautos: any;

  constructor(
    public userService: DataService,
    private modalController: ModalController,
    public alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.categorianombre = this.route.snapshot.paramMap.get('categorianombre');
    this.categoriaslug = this.route.snapshot.paramMap.get('categoriaslug');
    this.showdata();
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;
    this.misAutos();
  }

  misAutos() {
    this.submisautos = this.userService.getMisAutos(this.usuario.id).subscribe( autos => {
      this.listadoautos = autos;
    });
  }

  async agregarAuto() {
    const modal = await this.modalController.create({
      component: AgregarautoPage,
      componentProps: {
        uid: this.usuario.id,
      }
    });
    return await modal.present();
  }

  async eliminarauto(idauto) {

    const alert = await this.alertController.create({
      header: 'Eliminar auto',
      message: 'Esta seguro de eliminar este auto !!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.userService.eliminarauto(idauto)
            .then(res => {
            }, err => {
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
