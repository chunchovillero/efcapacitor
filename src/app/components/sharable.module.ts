import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CorazonComponent } from './corazon/corazon.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { CountlikeComponent } from './countlike/countlike.component';
import { FiltrarPipe } from '../pipes/filtrar.pipe';
import { RespuestascComponent } from './respuestasc/respuestasc.component';
import { PorcentajeComponent } from './porcentaje/porcentaje.component';
import { CountcomentariosComponent } from './countcomentarios/countcomentarios.component';
import { SearchComponent } from './search/search.component';
import { FiltroPipe } from '../pipes/filtro.pipe';
import { BuscarcotiPipe } from '../pipes/buscarcoti.pipe';
import { UltimomensajeComponent } from './ultimomensaje/ultimomensaje.component';
import { IstipingComponent } from './istiping/istiping.component';
import { AgregarautoPage } from '../pages/agregarauto/agregarauto.page';
import { StoritopComponent } from './storitop/storitop.component';
import { StorietopPage } from '../pages/storietop/storietop.page';
// import { StorieviewerPage } from '../pages/storieviewer/storieviewer.page';
// import { CreatestoriePage } from '../pages/createstorie/createstorie.page';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
    declarations: [
      CorazonComponent,
      ComentariosComponent,
      CountlikeComponent,
      RespuestascComponent,
      FiltrarPipe,
      PorcentajeComponent,
      CountcomentariosComponent,
      SearchComponent,
      FiltroPipe,
      BuscarcotiPipe,
      UltimomensajeComponent,
      IstipingComponent,
      AgregarautoPage,
      StoritopComponent,
      TabsComponent,
      StorietopPage,
      // StorieviewerPage,
      // CreatestoriePage
    ],
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
    ],
    exports:[
      CorazonComponent,
      ComentariosComponent,
      CountlikeComponent,
      RespuestascComponent,
      FiltrarPipe,
      PorcentajeComponent,
      CountcomentariosComponent,
      SearchComponent,
      FiltroPipe,
      BuscarcotiPipe,
      UltimomensajeComponent,
      IstipingComponent,
      StoritopComponent,
      TabsComponent,
      StorietopPage
    ]
  })
  export class SharableModule { }