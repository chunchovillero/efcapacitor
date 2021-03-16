import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticateService } from './services/auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { File } from '@ionic-native/file/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';



firebase.initializeApp(environment.firebaseConfig);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnaa365emUiwLwABQRqBkqxEkiweno-Gg',
      libraries: ['places']
    }),
    AgmDirectionModule,
    HttpClientModule,
    NoopAnimationsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy, useClass: IonicRouteStrategy,
   },
   AuthenticateService,
   File,
   MediaCapture,
   WebView,
   Geolocation,
   NativeGeocoder,
   OneSignal,
   PhotoViewer,
   AdMobFree,
   LaunchNavigator,
   VideoEditor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}