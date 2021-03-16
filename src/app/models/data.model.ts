export interface Roles {
    editor?: boolean;
    admin?: boolean;
  }

export interface UserInterface {
    id?: any;
    name?: any;
    email?: any;
    password?: any;
    photoUrl?: any;
    roles?: Roles;
  }

export interface Profile {
    id?: any;
    uid?: any;
    descripcion?: any;
    emailcontacto?: any;
    name?: any;
    avatar?: any;
    fondo?: any;
    tipocuenta?: any;
    direccion?: any;
    experiencia?: any;
    especialidad?: any;
    infoadicional?: any;
    cotizaciones?: any;
    notificaciones?: any;
    rut?: any;
    pushid?: any;
    pl?: any;
    seguidores?: any;
    seguidos?: any;
    telefono?: any;
    categorias?: any;
    categoriasnombre?: any;
  }

export interface Historia {
  userid?: any;
  date?: Date;
  media?: any;
  medialocal?: any;
  duration?: any;
  elementos?: any;
  tipo?: any;
}

export interface Resgistro {
    email?: string;
    password?: string;
    tipocuenta?: string;
    rut?: string;
    nombre?: string;
    imagencarnet?: string;
    avatar?: string;
    fondo?: string;
  }

export interface Imagen {
    url?: string;
  }

export interface Post {
    id?: string;
    comentario?: string;
    imagen?: any;
    nombreCreador?: string;
    avatarCreador?: string;
    time?: string;
    tipo: any;
    comentarios: any;
  }

export interface PostEditar {
    creador?: string;
    texto?: string;
    images?: any;
    nombrecreador?: string;
    avatarcreador?: string;
    tipopost: any;
    comentarios: any;
  }

export interface Marcas {
    nombre?: string;
    modelos?: any;
  }

export interface Autos {
    uid?: string;
    color?: string;
    imagenes?: any;
    marca?: string;
    modelo?: string;
    patente?: string;
  }

export interface Usuarios {
    id?: string;
    descripcion?: string;
    name?: string;
    avatar?: any;
    fondo?: any;
    tipocuenta?: any;
    direccion?: any;
    experiencia?: any;
    especialidad?: any;
    infoadicional?: any;
  }

export interface Storie {
    id?: string;
  }

export interface AllPromociones {
    id?: string;
  }

export interface MisPromociones {
    id?: string;
  }

export interface VerPromocion {
    id?: string;
    descuento?: any;
    fecha_caducidad?: any;
    inscritos?: any;
    precio_normal?: any;
    tipo?: any;
    titulo?: any;
    uid?: any;
    descripcion?: any;
  }

export interface Publicidad {
    imagen?: any;
  }

export interface Comentario {
    comentario?: any;
    date?: Date;
    uid?: any;
    id?: any;
    respuesta?: any;
  }

export interface Addsucursal {
    usuario?: any;
    nombresucursal?: any;
    direccion?: any;
    comuna?: any;
    latitud?: any;
    longitud?: any;
    telefono?: any;
    email?: any;
  }

export interface Cotizacion {
    categorianombre?: any;
    categoriaslug?: any;
    date?: any;
    estado?: any;
    uid?: any;
    descripcion?: any;
    imagenes?: any;
    latitud?: any;
    longitud?: any;
    direccion?: any;
    comuna?: any;
    rango?: any;
    idcoti?: any;
    precioacordado?: any;
    elegido?: any;
  }

export interface Easygo {
    date?: any;
    estado?: any;
    uid?: any;
    descripcion?: any;
    imagenes?: any;
    latitud?: any;
    longitud?: any;
    direccion?: any;
    comuna?: any;
    ideasygo?: any;
  }

export interface PutSolicitudCotizacion {
    uid?: any;
    tallerid?: any;
    sucursalid?: any;
    cotizacionid?: any;
    date?: Date;
    nombresucursal?: any;
  }

export interface PutNotificacion {
    de?: any;
    para?: any;
    texto?: any;
    date?: Date;
    url?: any;
    tipo?: any;
    idcotizacion?: any;
  }

export interface Chats {
    creador?: any;
    participante?: any;
    date?: Date;
    idcotizacion?: any;
    preciofinal?: any;
    tipo?: any;
    istiping?: any;
    quienistiping?: any;
}

export interface Mensaje {
    mensajero?: any;
    mensaje?: any;
    tipo?: any;
    date?: Date;
    imagen?: any;
    idchat?: any;
}

export interface Users {
    nombre?: any;
    avatar?: any;
    uid?: any;
  }

export interface Producto {
    titulo?: any;
    descripcion?: any;
    uid?: any;
    date?: Date;
    precio?: any;
    imagenes?: any;
  }

export interface Putpromocionuser {
    promocionid?: any;
    estado?: any;
    date?: Date;
  }

export interface Putpromociontaller {
    userid?: any;
    estado?: any;
    date?: Date;
    rut?: any;
  }

export interface Crearclan {
    email?: any;
    uid?: any;
    tipocuenta?: any;
    name?: any;
    date?: Date;
  }

export interface Notificacion {
    cotizacionid?: any;
    date?: any;
    nameu?: any;
    nombresucursal?: any;
    sucursalid?: any;
    tallerid?: any;
    titulo?: any;
    uid?: any;
  }

export interface Viaje {
    id?: any;
    color?: any;
    estaciones?: any;
    estado?: any;
    latitud?: any;
    longitud?: any;
    marca?: any;
    modelo?: any;
    patente?: any;
    sexos?: any;
    uid?: any;
  }

export interface Quieroviaje {
    id?: any;
    estacion?: any;
    estado?: any;
    latitud?: any;
    longitud?: any;
    rut?: any;
    uid?: any;
    viaje?: any;
  }

export interface Push {
    url?: any;
    mensaje?: any;
    header?: any;
    pushid?: any;
  }
