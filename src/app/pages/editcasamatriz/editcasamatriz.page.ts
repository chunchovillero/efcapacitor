import { Component, NgZone, OnInit } from '@angular/core';
import { Profile, Addsucursal } from '../../models/data.model';
import { Plugins } from '@capacitor/core';
import { DataService } from '../../services/data.service';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';



const { Storage } = Plugins;
const { Filesystem } = Plugins;


@Component({
  selector: 'app-editcasamatriz',
  templateUrl: './editcasamatriz.page.html',
  styleUrls: ['./editcasamatriz.page.scss'],
})
export class EditcasamatrizPage implements OnInit {

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

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public search: any;
  id: any;
  errorMessage = '';
  addsucursal: Addsucursal =  {
    usuario: '',
    nombresucursal: '',
    direccion: '',
    comuna: '',
    latitud: '',
    longitud: '',
    telefono: '',
    email: ''
  };

  categorias: any = [];
  listadocategorias: any = [];

  existecasamatriz = 0;
  listadosucursales: any = [] ;
  idcasamatriz: any;

  public categoriasseleccionadasnombre: any = [];
  public categoriasseleccionadasslug: any = [];
  categoriasdesucursal: any = [];
  subgetcategorias: any;
  subgetmissucursales: any;
  subuser: any;
  constructor(
    public navCtrl: NavController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public modalController: ModalController,
    public userService: DataService,
    public route: ActivatedRoute,
    public alertController: AlertController

  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.addsucursal.usuario = '';
    this.addsucursal.nombresucursal = '';
    this.addsucursal.direccion = '';
    this.addsucursal.comuna = '';
    this.addsucursal.latitud = '';
    this.addsucursal.longitud = '';
    this.addsucursal.telefono = '';
    this.listadocategorias = [];
    this.getMisSucurales();
    this.showdata();
  }

  ionViewWillLeave() {
  }

  async showdata() {
    const ret = await Storage.get({ key: 'usuario' });
    const user = JSON.parse(ret.value);
    this.usuario.id = user.id;
    this.usuario.name = user.name;

    this.subuser = this.userService.getDataUser(this.usuario.id).subscribe( usuarios => {
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
      this.usuario.emailcontacto = data.emailcontacto;
      this.usuario.categorias = data.categorias;
      this.usuario.categoriasnombre = data.categoriasnombre;
    });
  }

  getCategorias() {
    this.listadocategorias = [];
    this.subgetcategorias = this.userService.getCategorias().subscribe( categorias => {
      this.categorias = categorias;
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.categorias.length; index++) {
        const element = this.categorias[index];
        const n = this.categoriasdesucursal.includes(element.slug);
        if (n === true) {
            this.listadocategorias.push({nombre : element.nombre, slug: element.slug, isChecked: true });
        } else {
            this.listadocategorias.push({nombre : element.nombre, slug: element.slug, isChecked: false });
        }
      }
    });
  }

  cambio() {
    this.mapsAPILoader.load().then(() => {
      const nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      const autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.addsucursal.direccion = place['formatted_address'];
          this.search = '';
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.addsucursal.latitud = place.geometry.location.lat();
          this.addsucursal.longitud = place.geometry.location.lng();
        });
      });
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }

  crearSucursal() {
    this.addsucursal.nombresucursal = 'Casa Matriz';
    this.addsucursal.usuario = this.id;
    this.userService.crearSucursal(this.addsucursal, this.categoriasseleccionadasslug, this.categoriasseleccionadasnombre)
    .then(res => {
      this.volverPerfil();
    }, err => {
    });
  }

  actualizarsucursal() {
    this.addsucursal.nombresucursal = 'Casa Matriz';
    this.addsucursal.usuario = this.id;
    // tslint:disable-next-line: max-line-length
    this.userService.EditarSucursal(this.addsucursal, this.idcasamatriz, this.categoriasseleccionadasslug, this.categoriasseleccionadasnombre)
    .then(res => {
      this.volverPerfil();
    }, err => {
      this.errorMessage = err.message;
    });
  }

  async volverPerfil() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo',
      message: 'Tu perfil ha sido actualizado correctamente.',
      buttons: [
        {
          text: 'Volver a mi perfil',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.navCtrl.navigateForward('/profile/' + this.usuario.id);
          }
        }
      ]
    });

    await alert.present();
  }


  actualizarInfo() {
    this.putCategorias(this.listadocategorias);
    this.userService.updateInfo(this.addsucursal, this.id, this.categoriasseleccionadasslug, this.categoriasseleccionadasnombre, )
    .then(res => {
      if ( this.existecasamatriz === 0 ) {
        this.crearSucursal();
      } else {
        this.actualizarsucursal();
      }
    }, err => {
    });
  }

  putCategorias(categorias) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < categorias.length; index++) {
      if (categorias[index].isChecked) {
        this.categoriasseleccionadasnombre.push(categorias[index].nombre);
        this.categoriasseleccionadasslug.push(categorias[index].slug);
      }
    }
  }

  getMisSucurales() {
    this.subgetmissucursales = this.userService.getMisSucurales(this.id).subscribe( sucursales => {
      this.listadosucursales = sucursales;
      this.verificarcasamatriz();
    });
  }

  verificarcasamatriz() {
    let cont = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.listadosucursales.length; index++) {
      if (this.listadosucursales[index].nombresucursal === 'Casa Matriz') {
        cont++;
        this.idcasamatriz = this.listadosucursales[index].id;
        this.addsucursal.direccion = this.listadosucursales[index].direccion;
        this.addsucursal.latitud = this.listadosucursales[index].latitud;
        this.addsucursal.longitud = this.listadosucursales[index].longitud;
        this.addsucursal.comuna = this.listadosucursales[index].comuna;
        this.addsucursal.email = this.listadosucursales[index].email;
        this.addsucursal.telefono = this.listadosucursales[index].telefono;
        this.categoriasdesucursal = this.listadosucursales[index].categorias;
      }
    }
    this.getCategorias();

    if (cont > 0) {
      this.existecasamatriz = 1;
    } else {
    }
  }

}
