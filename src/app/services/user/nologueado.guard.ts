import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { DataService } from '../data.service';
import { Plugins } from '@capacitor/core';
import { Profile } from '../../models/data.model';
import { NavController } from '@ionic/angular';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class NologueadoGuard implements CanActivate {
  datosde: Promise<void>;
  constructor(
    private router: Router,
    public userService: DataService,
    public navCtrl: NavController
    ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          const userid = user.uid;
          this.datosde = this.userService.getOnceDataUser(userid).toPromise()
            .then( usuario => {
              const userData = usuario.data() as Profile;
              this.setUsuario(userData);
            });
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async setUsuario(data) {
    await Storage.set({
      key: 'usuario',
      value: JSON.stringify({
        id: data.uid,
        name: data.name,
        tipo_cuenta: data.tipocuenta
      })
    });
    this.showdata();
  }
  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.navCtrl.navigateForward('/decidir');
  }
}
