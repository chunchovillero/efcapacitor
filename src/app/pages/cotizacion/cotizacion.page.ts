import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, Cotizacion, Mensaje, Push } from '../../models/data.model';
import { Plugins} from '@capacitor/core';
import { DataService } from '../../services/data.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HttpClient, HttpHeaders} from '@angular/common/http';


const { Storage } = Plugins;

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.page.html',
  styleUrls: ['./cotizacion.page.scss'],
})
export class CotizacionPage implements OnInit {

  idcotizacion: string;
  propietario: any = [];
  listadousuarios: any = [];

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

  cotizacion: Cotizacion = {
    categorianombre: '',
    categoriaslug:'',
    date: '',
    estado: '',
    uid: '',
    descripcion: '',
    imagenes: [],
    latitud: '',
    longitud: '',
    direccion: '',
    comuna: '',
    rango: ''
  };
  subuser: any;
  tipo: any;
  consultarchat: any = [];
  respuesta: any = '';
  errorMessage: any;
  listadochats: any = [];
  datosde: any;
  mensaje: any;

  constructor(
    private route: ActivatedRoute,
    public userService: DataService,
    private viewer: PhotoViewer,
    public router: Router,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.idcotizacion = this.route.snapshot.paramMap.get('id');
    this.showdata();
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
      this.usuario.pushid = data.pushid;
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
    this.getCotizacion();
    this.consultarChat();
    this.getAllUser();
    this.getAllchatsById();
  }

  consultarChat() {
    this.userService.consultarChat(this.idcotizacion, this.usuario.id).subscribe( consultarchat => {
      this.consultarchat = consultarchat;
    });
  }

  getCotizacion() {
    this.userService.getCotizacion(this.idcotizacion).subscribe( cotizacion => {
      const data = cotizacion.payload.data() as Cotizacion;
      this.cotizacion.categorianombre = data.categorianombre;
      this.cotizacion.categoriaslug = data.categoriaslug;
      this.cotizacion.date = data.date;
      this.cotizacion.uid = data.uid;
      this.cotizacion.estado = data.estado;
      this.cotizacion.latitud = data.latitud;
      this.cotizacion.longitud = data.longitud;
      this.cotizacion.comuna = data.comuna;
      this.cotizacion.direccion = data.direccion;
      this.cotizacion.idcoti = this.idcotizacion;
      this.cotizacion.imagenes = data.imagenes;
      this.cotizacion.descripcion = data.descripcion;
      this.cotizacion.precioacordado = data.precioacordado;
      this.cotizacion.elegido = data.elegido;
      console.log(this.cotizacion);

      this.userService.getOnceDataUser(this.cotizacion.uid).toPromise()
            .then( user => {
              this.propietario = user.data() as Profile;
            });
    });
  }

  zoom(image) {
    const title = '';
    const options = {
        share: false
    };
    this.viewer.show(image, title, options);
  }

  getAllUser() {
    this.userService.getAllUser().subscribe( usuarios => {
      this.listadousuarios = usuarios;
    });
  }

  async crearChat() {
    if (this.consultarchat.length > 0) {
      this.router.navigate(['/chat', this.consultarchat[0].id]);
    } else {
      this.crearChatok();
    }
  }

  crearChatok() {
    this.tipo = 'Cotizacion';
    const mensaje: Mensaje = {
      mensajero: this.usuario.id,
      mensaje: this.respuesta,
      tipo: 'text',
      date: new Date()
    };

    this.sendPush();

    this.userService.crearChatCoti(this.usuario.id, this.cotizacion.uid, this.idcotizacion, this.tipo)
      .then(res => {
        this.enviarMensaje(res.id);
      }, err => {
        this.errorMessage = err.message;
      });
  }

  enviarMensaje(chatid) {
    const data: Mensaje = {
      idchat: chatid,
      mensajero: this.usuario.id,
      mensaje: this.respuesta,
      tipo: 'text',
      date: new Date()
    };

    this.userService.sendMensaje(data)
    .then(res => {
      this.router.navigate(['/chat', chatid]);
    }, err => {
    console.log(err);
    });
  }

  getAllchatsById() {
    this.userService.getAllchatsById(this.idcotizacion).subscribe( chats => {
      this.listadochats = chats;
    });
  }

  sendPush() {
    const data: Push = {
      url: '/cotizacion/' + this.idcotizacion,
      mensaje: this.respuesta ,
      header: this.usuario.name + ' te envió una nueva respuesta a tu cotización',
      pushid: this.propietario.pushid
    };
    this.userService.sendPush(data);
  }
}
