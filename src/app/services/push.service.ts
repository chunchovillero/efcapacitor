import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { DataService } from './data.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  userIdPush: string;

  constructor(
    private oneSignal: OneSignal,
    public userService: DataService,
    private navCtrl: NavController
  ) { }

  configuracionInicial(id = 0) {

    this.oneSignal.startInit('0e5be7b4-f28f-4880-8492-12908a4df11f', '177471917342');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe(( noti ) => {
      console.log('notificacion recibida', noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      console.log('notificacion abierta', noti);
      const url = noti.notification.payload.additionalData.url;
      this.navCtrl.navigateForward(url);
    });

    this.oneSignal.getIds().then(info => {
      this.userIdPush = info.userId;
      if(id === 0) {
      } else {
        this.userService.editpushid(id, this.userIdPush)
          .then(res => {
          }, err => {
          });
      }
    });

    this.oneSignal.endInit();

  }
}
