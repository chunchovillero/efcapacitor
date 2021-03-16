import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import * as firebase from "firebase"; 

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {
  forgotPasswordForm: FormGroup;
  // tslint:disable-next-line: variable-name
  errorMessage = '';

  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'Ingrese un Email válido' }
    ]
  };

  constructor(
    private authService: AuthenticateService,
    private AFauth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public alertController: AlertController,
    public menuCtrl: MenuController
  ) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  recoverPassword() {
    this.authService.resetPassword(this.forgotPasswordForm.value.email)
    .then(res => {
      this.Correcto();
    } , err => {
        this.errorMessage = 'El email no esta en nuestros registros, intentalo con otro.';
        this.Malo();
      });
  }


  async Correcto() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Enlace enviado',
      message: 'Hemos enviado un link a su correo electrónico con las indicaciones para cambiar su contraseña.',
      buttons: [
        {
          text: 'INICIAR SESION',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.navCtrl.navigateForward('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  async Malo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Email no registrado.',
      message: 'El email no esta en nuestros registros, intentalo con otro.',
      buttons: [
        {
          text: 'INTENTA NUEVAMENTE',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }
      ]
    });

    await alert.present();
  }

}
