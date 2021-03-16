import { Component, OnInit } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.page.html',
  styleUrls: ['./cargar.page.scss'],
})
export class CargarPage implements OnInit {

  options: any;
  filelocal = '';
  filelocal2 = '';

  constructor(
    private mediaCapture: MediaCapture,
    private webview: WebView,
  ) {
  }

  ngOnInit() {
  }


}
