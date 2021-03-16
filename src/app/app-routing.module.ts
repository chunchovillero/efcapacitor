import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';
import { NologueadoGuard } from './services/user/nologueado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [NologueadoGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterPageModule),
    canActivate: [NologueadoGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then((m) => m.VerifyEmailPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordPageModule),
  },
  {
    path: 'decidir',
    loadChildren: () => import('./pages/decidir/decidir.module').then( m => m.DecidirPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cotizar',
    loadChildren: () => import('./pages/cotizar/cotizar.module').then( m => m.CotizarPageModule)
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./pages/solicitudes/solicitudes.module').then( m => m.SolicitudesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'seleccionarauto/:categorianombre/:categoriaslug',
    loadChildren: () => import('./pages/seleccionarauto/seleccionarauto.module').then( m => m.SeleccionarautoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'agregarauto',
    loadChildren: () => import('./pages/agregarauto/agregarauto.module').then( m => m.AgregarautoPageModule)
  },
  {
    path: 'cotizar-descripcion/:categorianombre/:categoriaslug/:autoid',
    loadChildren: () => import('./pages/cotizar-descripcion/cotizar-descripcion.module').then( m => m.CotizarDescripcionPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cargar',
    loadChildren: () => import('./pages/cargar/cargar.module').then( m => m.CargarPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cotizacion/:id',
    loadChildren: () => import('./pages/cotizacion/cotizacion.module').then( m => m.CotizacionPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'seguidos/:user/:ver',
    loadChildren: () => import('./pages/seguidos/seguidos.module').then( m => m.SeguidosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'comentarios/:item/:usuario',
    loadChildren: () => import('./pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'respuesta/:item/:post/:usuario',
    loadChildren: () => import('./pages/respuestas/respuestas.module').then( m => m.RespuestasPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'editarperfil',
    loadChildren: () => import('./pages/editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'editcasamatriz/:id',
    loadChildren: () => import('./pages/editcasamatriz/editcasamatriz.module').then( m => m.EditcasamatrizPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'agregarsucursal/:id',
    loadChildren: () => import('./pages/agregarsucursal/agregarsucursal.module').then( m => m.AgregarsucursalPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'drag',
    loadChildren: () => import('./pages/drag/drag.module').then( m => m.DragPageModule)
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chats/chats.module').then( m => m.ChatsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'crearpost',
    loadChildren: () => import('./pages/crearpost/crearpost.module').then( m => m.CrearpostPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'recuperarcontrasena',
    loadChildren: () => import('./pages/recuperarcontrasena/recuperarcontrasena.module').then( m => m.RecuperarcontrasenaPageModule)
  },
  {
    path: 'storietop',
    loadChildren: () => import('./pages/storietop/storietop.module').then( m => m.StorietopPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'createstorie',
    loadChildren: () => import('./pages/createstorie/createstorie.module').then( m => m.CreatestoriePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'storieviewer',
    loadChildren: () => import('./pages/storieviewer/storieviewer.module').then( m => m.StorieviewerPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'megusta/:idpost/:iduser',
    loadChildren: () => import('./pages/megusta/megusta.module').then( m => m.MegustaPageModule)
  },
  {
    path: 'verpost/:item/:usuario',
    loadChildren: () => import('./pages/verpost/verpost.module').then( m => m.VerpostPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'creareasygo',
    loadChildren: () => import('./pages/creareasygo/creareasygo.module').then( m => m.CreareasygoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'easygo',
    loadChildren: () => import('./pages/easygo/easygo.module').then( m => m.EasygoPageModule)
  },
  {
    path: 'easygobyuser/:idtaller',
    loadChildren: () => import('./pages/easygobyuser/easygobyuser.module').then( m => m.EasygobyuserPageModule)
  },
  {
    path: 'vereasygo/:easygoid',
    loadChildren: () => import('./pages/vereasygo/vereasygo.module').then( m => m.VereasygoPageModule)
  },
  {
    path: 'iraeasygo/:easygoid',
    loadChildren: () => import('./pages/iraeasygo/iraeasygo.module').then( m => m.IraeasygoPageModule)
  },
  {
    path: 'editareasygo/:easygoid',
    loadChildren: () => import('./pages/editareasygo/editareasygo.module').then( m => m.EditareasygoPageModule)
  },
  {
    path: 'terminosycondiciones',
    loadChildren: () => import('./pages/terminosycondiciones/terminosycondiciones.module').then( m => m.TerminosycondicionesPageModule)
  },
  {
    path: 'politicasyprivacidad',
    loadChildren: () => import('./pages/politicasyprivacidad/politicasyprivacidad.module').then( m => m.PoliticasyprivacidadPageModule)
  },
  {
    path: 'admob',
    loadChildren: () => import('./pages/admob/admob.module').then( m => m.AdmobPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
