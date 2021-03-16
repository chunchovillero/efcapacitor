import { Component, OnInit } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeRewardVideo, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';


@Component({
  selector: 'app-admob',
  templateUrl: './admob.page.html',
  styleUrls: ['./admob.page.scss'],
})
export class AdmobPage implements OnInit {

  constructor(
    private admob: AdMobFree
  ) { }

  ngOnInit() {
    const bannerConfig: AdMobFreeBannerConfig = {
      autoShow: true,
      isTesting: true,
      bannerAtTop: false,
      overlap: true
    };

    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {
    });
  }

  interstitial() {
    const reward: AdMobFreeRewardVideoConfig = {
      id: 'ca-app-pub-6362707412354116/4349447581',
      autoShow: true,
      isTesting: false,
    };

    this.admob.rewardVideo.config(reward );
    this.admob.rewardVideo.prepare().then(() => {
      console.log('video inter terminado');
    });
  }

  reward() {
    const bannerConfig: AdMobFreeBannerConfig = {
      autoShow: true,
      isTesting: true,
      bannerAtTop: false,
      overlap: true
    };

    this.admob.interstitial.config(bannerConfig);
    this.admob.interstitial.prepare().then(() => {
      console.log('reward terminado');

    });

  }
}
