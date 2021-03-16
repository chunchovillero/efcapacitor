import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Profile } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { AuthenticateService } from '../../services/auth.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any;
  configuracion: any = [];
  isauth: any;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    public userService: DataService,
    private authService: AuthenticateService,
    public menuCtrl: MenuController
  ) { }
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

  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  errorMessage = '';


  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Ingrese un email.' },
      { type: 'pattern', message: 'Ingrese un email válido.' }
    ],
    password: [
      { type: 'required', message: 'Ingrese una contraseña.' },
      { type: 'minlength', message: 'La contraseña debe contener mas de 5 caracteres.' }
    ]
  };

  ngOnInit() {

    this.getConfiguracion();

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  ionViewWillEnter() {
    this.getConfiguracion();
    this.menuCtrl.enable(false);
  }

  getConfiguracion() {
    this.userService.ShowConfiguracion().subscribe((configuracion) => {
      this.configuracion = configuracion.payload.data();
    });
  }

  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      this.errorMessage = '';
      this.isauth = this.userService.isAuth().subscribe(user => {
        if (user) {
          this.usuario.id = user.uid;
          this.user = this.userService.getDataUser(this.usuario.id).subscribe( usuarios => {
            const data = usuarios.payload.data() as Profile;
            this.setUsuario(data);
            if (user) {
            setTimeout(() => {
                this.isauth.unsubscribe();
                this.navCtrl.navigateForward('/decidir');
             }, 200);
            }
          });
        } else {
        }
      });
    }, err => {
      this.errorMessage = 'Las credenciales no son válidas';
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
  }

  ionViewWillLeave() {
    this.user.unsubscribe();
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

}
