import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, Easygo } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Plugins } from '@capacitor/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

const { Storage } = Plugins;
const { Geolocation } = Plugins;

@Component({
  selector: 'app-iraeasygo',
  templateUrl: './iraeasygo.page.html',
  styleUrls: ['./iraeasygo.page.scss'],
})
export class IraeasygoPage implements OnInit {
  easygoid: any;

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

  easygo: Easygo = {
    date: '',
    estado: '',
    uid: '',
    descripcion: '',
    imagenes: '',
    latitud: '',
    longitud: '',
    direccion: '',
    comuna: '',
    ideasygo: ''
  };

  subuser: any;
  listadousuarios: any = [];
  propietario: any = [];
  coords: any;
  geoLongitude: number;
  geoLatitude: number;
  geoAddress: any = '';
  geteasygo: any;
  distancia: any = '';
  public origin: any;
  public destination: any;

  constructor(
    private route: ActivatedRoute,
    public userService: DataService,
    private viewer: PhotoViewer,
    public router: Router,
    private nativeGeocoder: NativeGeocoder,
    private ngZone: NgZone,
    private launchNavigator: LaunchNavigator,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.easygoid = this.route.snapshot.paramMap.get('easygoid');
    this.showdata();
  }

  ionViewWillLeave() {
    this.subuser.unsubscribe();
    this.geteasygo.unsubscribe();
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
      this.easygoDatos();
    });
    this.getAllUser();
    
  }

  easygoDatos() {
    this.geteasygo = this.userService.getEasygo(this.easygoid).subscribe( easygo => {
      const data = easygo.payload.data() as Easygo;
      this.easygo.date = data.date;
      this.easygo.uid = data.uid;
      this.easygo.estado = data.estado;
      this.easygo.latitud = data.latitud;
      this.easygo.longitud = data.longitud;
      this.easygo.comuna = data.comuna;
      this.easygo.direccion = data.direccion;
      this.easygo.imagenes = data.imagenes;
      this.easygo.descripcion = data.descripcion;
      this.locate();

      console.log(this.easygo);

      this.userService.getOnceDataUser(this.easygo.uid).toPromise()
            .then( user => {
              this.propietario = user.data() as Profile;
            });
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coords = coordinates.coords;
    this.geoLatitude = this.coords.latitude;
    this.geoLongitude = this.coords.longitude;

    this.origin = { lat: this.geoLatitude, lng: this.geoLongitude };
    this.destination = { lat: this.easygo.latitud, lng: this.easygo.longitud };
    console.log(this.origin, this.destination);

    this.reverse(this.coords);
  }

  reverse(resp) {
    this.nativeGeocoder.reverseGeocode(resp.latitude, resp.longitude)
    .then((result: NativeGeocoderResult[]) => {
      this.geoAddress = result[0].thoroughfare + ' ' + result[0].subThoroughfare + ', ' + result[0].locality ;
      this.ObtenerDistacia();
    })
    .catch((error: any) =>  console.log(error));
  }

  ObtenerDistacia() {
      const p = 0.017453292519943295;
      const c = Math.cos;
      // tslint:disable-next-line: max-line-length
      const a = 0.5 - c((this.geoLatitude - this.easygo.latitud) * p) / 2 + c(this.easygo.latitud * p) * c((this.geoLatitude) * p) * (1 - c(((this.geoLongitude - this.easygo.longitud) * p))) / 2;
      const dis = (12742 * Math.asin(Math.sqrt(a)));
      this.distancia =  Math.trunc(dis);
  }

  zoom(image) {
    const title = '';
    const options = {
        share: false
    };
    this.viewer.show(image, title, options);
  }

  navme() {
    this.launchNavigator.navigate([this.easygo.latitud, this.easygo.longitud]).then(
      success => {
      }, error => {
      }
    );
  }

  iniciar() {
    this.origin = { lat: -33.4429046, lng: -70.6560586 };
    this.destination = { lat: this.easygo.latitud, lng: this.easygo.longitud };
  }

}
