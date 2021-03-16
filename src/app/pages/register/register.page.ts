import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthenticateService } from '../../services/auth.service';
import { Plugins } from '@capacitor/core';
import { database } from 'firebase';

const { Storage } = Plugins;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  errorMessage = '';
  successMessage = '';
  
  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'pattern', message: 'Ingresa un email válido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener 5 caractéres como minimo.' }
    ],
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener 3 caractéres como minimo.' }
    ],
    rut: [
      { type: 'required', message: 'El rut es obligatorio' },
      { type: 'minlength', message: 'El rut debe tener 8 caractéres como minimo sin puntos ni guion.' }
    ],
    tipocuenta: [
     { type: 'required', message: 'Seleccione el tipo de cuenta.' },
   ],
  };

  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    public userService: DataService,
    private authService: AuthenticateService,
    public alertController: AlertController,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      nombre: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      rut: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      tipocuenta: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  signup(value){
    console.log('a crear');
    this.authService.createAccount(value)
     .then(res => {
       console.log('datos de registro', value, res.user.uid);
       this.crearUsuario(value, res.user.uid);
     }, err => {
       this.errorMessage = err.message;
       this.successMessage = '';
     });
  }

  crearUsuario(value, uid) {
    this.userService.crearUsuario(value, uid)
      .then(res => {
        this.setUsuario(value, uid);
      }, err => {
        this.errorMessage = err.message;
      });
  }

  async setUsuario(data, uid) {
    await Storage.set({
      key: 'usuario',
      value: JSON.stringify({
        id: uid,
        name: data.nombre,
        tipo_cuenta: data.tipocuenta
      })
    });
    console.log('usuario seteado');
    this.showdata();
    this.volverPerfil(data, uid);
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
  }

  async volverPerfil(data, uid) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo ' + data.nombre + ', ya te has registrado',
      message: 'Tu registro se ha creado satisfactoriamente, ahora modifica tu perfil para que los demas usuarios sepan de ti.',
      buttons: [
        {
          text: 'Modificar mi perfil',
          cssClass: 'secondary',
          handler: (blah) => {
            this.navCtrl.navigateForward('/profile/' + uid);
          }
        }
      ]
    });

    await alert.present();
  }
}
