import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { PushService } from '../../services/push.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-decidir',
  templateUrl: './decidir.page.html',
  styleUrls: ['./decidir.page.scss'],
})
export class DecidirPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private pushService: PushService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.showdata();
    }, 1000);
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.pushService.configuracionInicial(user.id);

    if (user.tipo_cuenta === 'Usuario') {
      this.navCtrl.navigateForward('/cotizar');
    }
    if (user.tipo_cuenta  === 'Taller') {
      this.navCtrl.navigateForward('/solicitudes');
    }
  }
}
