import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-storieviewer',
  templateUrl: './storieviewer.page.html',
  styleUrls: ['./storieviewer.page.scss'],
})
export class StorieviewerPage implements OnInit {
  @ViewChild('slideWithNav') slides: IonSlides;
  @ViewChild('progress') set progressElement(progress: any) {
    if (progress) {
      progress = progress.nativeElement;

      progress.addEventListener('animationend', () => { this.nextStoryItem(); });
      progress.addEventListener('webkitAnimationEnd', () => { this.nextStoryItem(); });
    }
  }

  @ViewChild('video') set videoElement(video: ElementRef) {
    if (video) {
      this.video = video.nativeElement;

      this.video.onwaiting = () => {
        this.isWaiting = true;
      };

      this.video.onready = this.video.onload = this.video.onplaying = this.video.oncanplay = () => {
        this.isWaiting = false;
      };

      this.video.addEventListener('loadedmetadata', () => {
        const itemactual = this.contenido[this.current].currentItem;
        this.video.play();
      });
    } else {
      if (this.video) {
        this.video = null;
      }
    }
  }

  name: any;
  contenido: any;
  listadousuarios: any;
  tapped: any;
  slideOpts: any;
  listo: number;
  public isPaused = false;
  public video: any;
  public isWaiting = false;
  sliderIndex: number;
  current = 0;
  esultimo;

  constructor(
    private platform: Platform,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.slideropciones();
    this.listo = 1;
    setTimeout(() => {
      this.getCurrentStory();
      this.Eslaultima();
    }, 200);
  }


  changeStoryItem(event: any, story: any) {

    if (event.y < 70 || event.y > this.platform.height() - 70) {
      return;
    }

    if (event.x < this.platform.width() / 2) {

      if (story.currentItem > 0) {
        story.currentItem--;
      } else {
        this.getCurrentStory();
        setTimeout(() => {
          this.slides.slideTo(this.current - 1);
        }, 200);
      }
    } else {
      this.nextStoryItem();
    }
  }

  nextStoryItem() {
    // tslint:disable-next-line: no-unused-expression
    this.getCurrentStory();
    this.Eslaultima();

    setTimeout(() => {
      if (this.contenido[this.current].currentItem < this.contenido[this.current].historias.length - 1) {
        this.contenido[this.current].currentItem++;
      } else {
        if (this.esultimo) {
          this.cerrarHistorias();
        } else {
          this.SiguienteSlide();
        }
      }
    }, 200);
  }

  getCurrentStory() {
    this.slides.getActiveIndex()
      .then(index => {
        this.current = index;
      });
  }

  Eslaultima() {
    this.slides.isEnd()
      .then(index => {
        this.esultimo = index;
      });
  }

  SiguienteSlide() {
    this.slides.slideTo(this.current + 1);
    this.getCurrentStory();
  }

  cerrarHistorias() {
    this.modalController.dismiss();
  }

  cambiaslide() {
    this.getCurrentStory();
    this.Eslaultima();
  }

  pauseStory() {
    this.isPaused = true;
  }

  playStory() {
    this.isPaused = false;
  }

  hace(time) {
    return moment(time, 'MMDDYYYY HH:mm:ss').locale('es').fromNow();
  }

  slideropciones() {
      this.slideOpts = {
        initialSlide: this.tapped,
        slidesPerView: 1,
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        on: {
          beforeInit() {
            const swiper = this;
            swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
            swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
            const overwriteParams = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: true,
              resistanceRatio: 0,
              spaceBetween: 0,
              centeredSlides: false,
              virtualTranslate: true,
            };
            this.params = Object.assign(this.params, overwriteParams);
            this.originalParams = Object.assign(this.originalParams, overwriteParams);
          },
          setTranslate() {
            const swiper = this;
            const {
              $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
            } = swiper;
            const params = swiper.params.cubeEffect;
            const isHorizontal = swiper.isHorizontal();
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let wrapperRotate = 0;
            let $cubeShadowEl;
            if (params.shadow) {
              if (isHorizontal) {
                $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
                if ($cubeShadowEl.length === 0) {
                  $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                  $wrapperEl.append($cubeShadowEl);
                }
                $cubeShadowEl.css({ height: `${swiperWidth}px` });
              } else {
                $cubeShadowEl = $el.find('.swiper-cube-shadow');
                if ($cubeShadowEl.length === 0) {
                  $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                  $el.append($cubeShadowEl);
                }
              }
            }
            for (let i = 0; i < slides.length; i += 1) {
              const $slideEl = slides.eq(i);
              let slideIndex = i;
              if (isVirtual) {
                slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
              }
              let slideAngle = slideIndex * 90;
              let round = Math.floor(slideAngle / 360);
              if (rtl) {
                slideAngle = -slideAngle;
                round = Math.floor(-slideAngle / 360);
              }
              const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
              let tx = 0;
              let ty = 0;
              let tz = 0;
              if (slideIndex % 4 === 0) {
                tx = -round * 4 * swiperSize;
                tz = 0;
              } else if ((slideIndex - 1) % 4 === 0) {
                tx = 0;
                tz = -round * 4 * swiperSize;
              } else if ((slideIndex - 2) % 4 === 0) {
                tx = swiperSize + (round * 4 * swiperSize);
                tz = swiperSize;
              } else if ((slideIndex - 3) % 4 === 0) {
                tx = -swiperSize;
                tz = (3 * swiperSize) + (swiperSize * 4 * round);
              }
              if (rtl) {
                tx = -tx;
              }
              if (!isHorizontal) {
                ty = tx;
                tx = 0;
              }
               // tslint:disable-next-line: max-line-length
              const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
              if (progress <= 1 && progress > -1) {
                wrapperRotate = (slideIndex * 90) + (progress * 90);
                if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
              }
              $slideEl.transform(transform$$1);
              if (params.slideShadows) {
                // Set shadows
                let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                if (shadowBefore.length === 0) {
                  shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
                  $slideEl.append(shadowBefore);
                }
                if (shadowAfter.length === 0) {
                  shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
                  $slideEl.append(shadowAfter);
                }
                if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
                if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
              }
            }
            $wrapperEl.css({
              '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
              '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
              '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
              'transform-origin': `50% 50% -${swiperSize / 2}px`,
            });
            if (params.shadow) {
              if (isHorizontal) {
                // tslint:disable-next-line: max-line-length
                $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
              } else {
                const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
                const multiplier = 1.5 - (
                  (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
                  + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
                );
                const scale1 = params.shadowScale;
                const scale2 = params.shadowScale / multiplier;
                const offset$$1 = params.shadowOffset;
                // tslint:disable-next-line: max-line-length
                $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
              }
            }
            const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
            $wrapperEl
              // tslint:disable-next-line: max-line-length
              .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
          },
          setTransition(duration) {
            const swiper = this;
            const { $el, slides } = swiper;
            slides
              .transition(duration)
              .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
              .transition(duration);
            if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
              $el.find('.swiper-cube-shadow').transition(duration);
            }
          },
        }
      };
  }
}
