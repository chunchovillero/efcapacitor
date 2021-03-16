import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
// tslint:disable-next-line: max-line-length
import { Profile, Usuarios, Storie, AllPromociones, MisPromociones, Publicidad, Addsucursal, Autos, Cotizacion, Chats, Producto, Post, Notificacion, Easygo } from '../models/data.model';
import { firestore } from 'firebase/app';
// import { Cotizaciones } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private AFauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) { }



  isAuth() {
    return this.AFauth.authState.pipe(map(auth => auth));
  }


  public getDataUser(uid: string) {
    return this.db.collection('usuarios').doc(uid).snapshotChanges();
  }

  public getDataEasyGo(easygoid: string) {
    return this.db.collection('easygo').doc(easygoid).snapshotChanges();
  }

  public getOnceDataUser(uid: string) {
    return this.db.collection('usuarios').doc(uid).get();
  }

  getCategorias() {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('categorias', ref => ref.orderBy('nombre', 'asc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getPublicidadSlide() {
    return this.db.collection('publicidad').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Publicidad;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getMisAutos(uid) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('autos', ref => ref.where('uid', '==', uid)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Autos;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getMisEasyGo(uid) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('autos', ref => ref.where('uid', '==', uid)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Easygo;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  public Marcas() {
    return this.db.collection('modelos').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Autos;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  eliminarauto(idauto) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`autos/${idauto}`);
    return userRef.delete();
  }

  eliminarEasyGo(ideasygo) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`easygo/${ideasygo}`);
    return userRef.delete();
  }

  crearAuto(value) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('autos').add({
        marca: value.marca,
        modelo: value.modelo,
        patente: value.patente,
        imagenes: value.imagenes,
        uid: value.uid,
        color: value.color,
        date: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  getAuto(autoid) {
    return this.db.collection('autos').doc(autoid).snapshotChanges();
  }

  crearCoti(uid, value) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('cotizaciones').add({
        uid,
        categorianombre: value.categorianombre,
        categoriaslug: value.categoriaslug,
        descripcion: value.descripcion,
        direccion: value.direccion,
        latitud: value.latitud,
        longitud: value.longitud,
        marca: value.marca,
        modelo: value.modelo,
        patente: value.patente,
        color: value.color,
        autoimagenes: value.autoimagenes,
        imagenes: value.imagenes,
        rango: value.rango,
        estado: value.estado,
        date: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject( err => {
      }));
    });
  }

  crearEasyGo(uid, value) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('easygo').add({
        uid,
        descripcion: value.descripcion,
        direccion: value.direccion,
        latitud: value.latitud,
        longitud: value.longitud,
        imagenes: value.imagenes,
        estado: value.estado,
        date: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject( err => {
      }));
    });
  }

  editarEasyGo(id, value) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`easygo/${id}`);
    return userRef.update({
        descripcion: value.descripcion,
        direccion: value.direccion,
        latitud: value.latitud,
        longitud: value.longitud,
        imagenes: value.imagenes,
      });
  }

  getAllSucurales() {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('sucursales').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  putSolicitudCotizacion(data) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('solicitudes').add({
        uid: data.uid,
        tallerid: data.tallerid,
        sucursalid: data.sucursalid,
        nombresucursal: data.nombresucursal,
        cotizacionid: data.cotizacionid,
        date: new Date()

      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  editpushid(uid, pushid) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`usuarios/${uid}`);
    return userRef.update({
      pushid
    });
  }

  getCotizacion(cotid) {
    return this.db.collection('cotizaciones').doc(cotid).snapshotChanges();
  }

  getEasygo(easygoid) {
    return this.db.collection('easygo').doc(easygoid).snapshotChanges();
  }

  verSilosigo(cliente, yo) {
    // tslint:disable-next-line: max-line-length
     return this.db.collection('seguidos', ref => ref.where('seguido', '==', cliente).where('seguidor', '==', yo)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as MisPromociones;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getSeguidores(uid) {
    return this.db.collection('seguidos', ref => ref.where('seguido', '==', uid)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as AllPromociones;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getSeguidos(uid) {
    return this.db.collection('seguidos', ref => ref.where('seguidor', '==', uid)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as AllPromociones;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getMisSucurales(uid) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('sucursales', ref => ref.where('idusuario', '==', uid)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  public getAllUser() {
    return this.db.collection('usuarios').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Usuarios;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getAllPostTallerescount() {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('post', ref => ref.where('tipopost', '==', 'post').orderBy('date', 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  // getAllPostTallerescount(): Observable<Post[]> {
  //   return this.db.collection<Post>(`post`).valueChanges();
  // }


  getPostbyId(uid) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('post', ref => ref.where('creador', '==', uid).orderBy('date' , 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getmispostcount(user) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('post', ref => ref.where('tipopost', '==', 'post').where('creador', '==', user).orderBy('date', 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getmispost(cantidad, user) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('post', ref => ref.where('tipopost', '==', 'post').where('creador', '==', user).orderBy('date', 'desc').limit(cantidad)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getmisEasyGo(user) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('easygo', ref => ref.where('uid', '==', user).orderBy('date', 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getLikePost(idpost) {
    return this.db.collection('likes', ref => ref.where('idpost', '==', idpost)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as AllPromociones;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  crearLike(idpost, iduser) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('likes').add({
        idpost,
        iduser,
        date: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  dejarlike(idlike) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`likes/${idlike}`);
    return userRef.delete();
  }

  getcomentarios(idpost) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('comentario', ref => ref.where('idpost', '==', idpost).where('respuesta', '==', 'no').orderBy('date', 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as AllPromociones;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  ComentarPost(mensaje) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('comentario').add({
        idpost: mensaje.id,
        iduser: mensaje.uid,
        comentario: mensaje.comentario,
        respuesta: mensaje.respuesta,
        date: new Date(),
        nano: new Date().getTime()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  ShowPost(postid) {
    return this.db.collection('post').doc(postid).snapshotChanges();
  }

  getrespuestas(idrespuesta) {
    return this.db.collection('comentario', ref => ref.where('respuesta', '==', idrespuesta)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as AllPromociones;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  ShowRespuesta(respuestaid) {
    return this.db.collection('comentario').doc(respuestaid).snapshotChanges();
  }

  getChat(chatid) {
    return this.db.collection('chats').doc(chatid).snapshotChanges();
  }

  getmensajes(idchat) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('mensajes', ref => ref.where('idchat', '==', idchat).orderBy('date', 'asc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as AllPromociones;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  updateAvatar(value, iduser) {
    return this.db.collection('usuarios').doc(iduser).update({
      avatar: value
    });
  }

  updateFondo(value, iduser) {
    return this.db.collection('usuarios').doc(iduser).update({
      fondo: value
    });
  }

  updateDescripcion(value, iduser) {
    return this.db.collection('usuarios').doc(iduser).update({
      descripcion: value
    });
  }

  updateDatos(name, descripcion, especialidad, experiencia, iduser) {
    return this.db.collection('usuarios').doc(iduser).update({
      name,
      descripcion,
      especialidad,
      experiencia
    });
  }

  crearSeguidor(seguidor, seguido) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('seguidos').add({
        seguidor,
        seguido,
        date: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  dejardeseguir(idfollow) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`seguidos/${idfollow}`);
    return userRef.delete();
  }

  crearSucursal(value, categorias, categoriasnombre) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('sucursales').add({
        idusuario: value.usuario,
        nombresucursal: value.nombresucursal,
        direccion: value.direccion,
        telefono: value.telefono,
        comuna: value.comuna,
        latitud: value.latitud,
        longitud: value.longitud,
        categorias,
        categoriasnombre,
        email: value.email,
        date: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  updateInfo(sucursal, usuario, categorias, categoriasnombre) {
    return this.db.collection('usuarios').doc(usuario).update({
      direccion: sucursal.direccion,
      telefono: sucursal.telefono,
      emailcontacto: sucursal.email,
      categorias,
      categoriasnombre
    });
  }

  EditarSucursal(value, idsucursal, categorias, categoriasnombre)  {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`sucursales/${idsucursal}`);
    return userRef.update({
      comuna: value.comuna,
      direccion: value.direccion,
      telefono: value.telefono,
      latitud: value.latitud,
      longitud: value.longitud,
      nombresucursal: value.nombresucursal,
      email: value.email,
      categorias,
      categoriasnombre
    });
  }

  getAllPostTalleres() {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('post', ref => ref.where('tipopost', '==', 'post').orderBy('date', 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  MisCotizacionesTaller(uid) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('solicitudes', ref => ref.where('tallerid', '==', uid).orderBy('date' , 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  MisCotizacionesUsuario(uid) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('cotizaciones', ref => ref.where('uid', '==', uid).orderBy('date' , 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  public getAllCotizaciones() {
    return this.db.collection('cotizaciones').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Cotizacion;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  consultarChat(idcotizacion, creador) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('chats', ref => ref.where('idcotizacion', '==', idcotizacion).where('creador', '==', creador)).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  consultarChat1(yo, otro) {
    console.log('servicio 1', yo, otro);
    // tslint:disable-next-line: max-line-length
    return this.db.collection('chats', ref => ref.where('creador', '==', yo).where('participante', '==', otro).where('tipo', '==', 'Normal')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  consultarChat2(yo, otro) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('chats', ref => ref.where('creador', '==', otro).where('participante', '==', yo).where('tipo', '==', 'Normal')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  crearChatCoti(creador, participante, cotid, tipo) {

    console.log('desde el servicio', creador, participante, cotid, tipo);
    return new Promise<any>((resolve, reject) => {
      this.db.collection('chats').add({
        creador,
        participante,
        statuscreador: '0',
        statusparticipante: '0',
        tipo,
        idcotizacion: cotid,
        istiping: '0',
        quienistiping: '',
        date: new Date(),
        update: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  crearChatNormal(creador, participante, cotid, tipo) {

    return new Promise<any>((resolve, reject) => {
      this.db.collection('chats').add({
        creador,
        participante,
        statuscreador: '0',
        statusparticipante: '0',
        tipo,
        idcotizacion: cotid,
        istiping: '0',
        quienistiping: '',
        date: new Date(),
        update: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  public getAllchatsById(idcotizacion) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('chats', ref => ref.where('idcotizacion', '==', idcotizacion).orderBy('update' , 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Usuarios;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getMensajes(idchat) {
    // tslint:disable-next-line: max-line-length
    return this.db.collection('mensajes', ref => ref.where('idchat', '==', idchat).orderBy('date' , 'asc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Addsucursal;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  sendMensaje(data) {
    return new Promise<any>((resolve, reject) => {
        this.db.collection('mensajes').add({
          idchat: data.idchat,
          mensajero: data.mensajero,
          mensaje: data.mensaje,
          tipo: data.tipo,
          leido: 'no',
          date: new Date()
        })
        .then( res => {
          resolve(res);
        }).catch( err => reject(err));
      });
  }

  sendMensajeImagen(data, imagen) {
    return new Promise<any>((resolve, reject) => {
        this.db.collection('mensajes').add({
          idchat: data.idchat,
          mensajero: data.mensajero,
          mensaje: data.mensaje,
          tipo: data.tipo,
          imagen,
          leido: 'no',
          date: new Date()
        })
        .then( res => {
          resolve(res);
        }).catch( err => reject(err));
      });
  }

  updateChat(chatid) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`chats/${chatid}`);
    return userRef.update({
      update: new Date()
    });
  }

  updateChatcreador(chatid, a) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`chats/${chatid}`);
    return userRef.update({
      statuscreador: a
    });
  }

  updateChatparticipante(chatid, a) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`chats/${chatid}`);
    return userRef.update({
      statusparticipante: a
    });
  }

  updateChat2(chatid, a, user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`chats/${chatid}`);
    return userRef.update({
      istiping: a,
      quienistiping: user
    });
  }

  public getAllchats() {
    return this.db.collection('chats', ref => ref.orderBy('update' , 'desc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Usuarios;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  crearPost(value, imagenes) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('post').add({
        avatarcreador: value.avatarCreador,
        texto: value.comentario,
        creador: value.id,
        images: imagenes,
        nombrecreador: value.nombreCreador,
        tipopost: value.tipo,
        comentarios: value.comentarios,
        date: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  crearUsuario(value, uid) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('usuarios').doc(uid).set({
        email: value.email,
            uid,
            tipocuenta: value.tipocuenta,
            name: value.nombre,
            // tslint:disable-next-line: max-line-length
            avatar: 'https://firebasestorage.googleapis.com/v0/b/autosleonapp.appspot.com/o/avatar%2Flogosolo-05.png?alt=media&token=8e53ad1f-535c-4f94-a2af-12bb4d618f92',
            // tslint:disable-next-line: max-line-length
            fondo: 'https://firebasestorage.googleapis.com/v0/b/autosleonapp.appspot.com/o/avatar%2Fbannertv.png?alt=media&token=8f2f7fc8-13a0-42c8-8ce6-5c3ae198eea8',
            telefono: '',
            experiencia: '',
            especialidad: '',
            infoadicional: '',
            descripcion: '',
            direccion: '',
            pl: '200',
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  public getAllhistorias() {
    return this.db.collection('historias', ref => ref.orderBy('date' , 'asc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Usuarios;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  public getAllEasyGo() {
    return this.db.collection('easygo', ref => ref.orderBy('date' , 'asc')).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Storie;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getMedia() {
    return this.db.collection('media').doc('media').snapshotChanges();
  }

  crearHistoria(historia) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('historias').add({
        media: historia.media,
        userid: historia.userid,
        elementos: historia.elementos,
        tipo: historia.tipo,
        duration: historia.duration,
        date: new Date()
      })
      .then( res => {
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  versilosigo(yo) {
   // tslint:disable-next-line: max-line-length
    return this.db.collection('seguidos', ref => ref.where('seguidor', '==', yo)).snapshotChanges().pipe(map(rooms => {
     return rooms.map(a => {
       const data = a.payload.doc.data() as MisPromociones;
       const id = a.payload.doc.id;
       return { id, ...data };
     });
   }));
 }

 sendPush(data) {
   const postdata = {
    app_id: '0e5be7b4-f28f-4880-8492-12908a4df11f',
    // tslint:disable-next-line: object-literal-key-quotes
    data: {'url': data.url},
    // tslint:disable-next-line: max-line-length
    contents: {
        en: data.mensaje,
        es: data.mensaje
    },
    headings: {
        en: data.header,
        es: data.header
    },
    include_player_ids: [data.pushid],
  };

   const httpOptions2 = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic M2I2MTc0NzctZTI1Mi00OTEzLWFiMjMtZjI4ZGFiNzU5YTVl'
    })
};
   this.http.post('https://onesignal.com/api/v1/notifications', postdata, httpOptions2)
      // tslint:disable-next-line: variable-name
      .subscribe(new_data => {
      }, error => {
      });
 }

 eliminarpost(idpost) {
  const userRef: AngularFirestoreDocument<any> = this.db.doc(`post/${idpost}`);
  return userRef.delete();
  }

  elegirtaller(idcotizacion, elegido, idchat, preciofinal) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`cotizaciones/${idcotizacion}`);
    return userRef.update({
      elegido,
      idchat,
      preciofinal,
      estado: 'cerrada'
    });
  }

  ShowConfiguracion() {
    return this.db.collection('configuracion').doc('rdP6JuscZ91RZ5JVdt5x').snapshotChanges();
  }
}
