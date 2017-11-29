import { TranslateService } from '@ngx-translate/core';
import { ShareSvc } from './../shared/shareSvc';
import { SongsModel } from './../shared/songsModel';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, FabContainer, Content } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import { AppRate } from '@ionic-native/app-rate';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild(Content) content: Content;
  @ViewChild('fab') fab: FabContainer;
  selectedSong: any;
  selectedPallavi: any;
  selectedSaranam: any;
  imageSrc: any;
  favArray: Array<any>;
  isFavourite: boolean = false;
  isShake: boolean = false;
  showBackToTop: boolean = false;
  searchKeyWord: string = '';
  hideNow: boolean = false;
  showDemo: boolean = false;
  demoSettingsObj: any;
  showLeft: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlStorage: SqlStorageProvider, public songsModel: SongsModel, private _sharedSvc: ShareSvc, private appRate: AppRate, private translate: TranslateService) {
    this.init(navParams.get('item'));
    this.searchKeyWord = navParams.get('searchKeyWord');
    this.appRate.preferences = {
      storeAppURL: {
        android: 'market://details?id=com.bharathiyar.padalgal'
      },
      customLocale: {
        title: "Rate our App",
        message: "If you like our App, please take a moment to rate it.",
        cancelButtonLabel: 'Never',
        rateButtonLabel: 'Rate it!',
        laterButtonLabel: 'Ask Later'
      },
      usesUntilPrompt: 10,
      callbacks: {
        onButtonClicked: (buttonIndex) => {
          if (buttonIndex === 2) {
            this.appRate.preferences.usesUntilPrompt = this.appRate.preferences.usesUntilPrompt + 15;
          }
        },
        onRateDialogShow: (callback) => {
          return;
        }
      }
    }
  }

  init(id) {
    this.sqlStorage.getSettings('swipeDemo').then((data) => {
      this.demoSettingsObj = data ? JSON.parse(data) : { 'left': false, 'right': false };
      this.showDemo = this.demoSettingsObj.left && this.demoSettingsObj.right ? false : true;
      this.showLeft = this.demoSettingsObj.left ? false : true;
    });
    this.selectedSong = this.songsModel.getSong(id);
    this.getFav(this.selectedSong.id);
  }

  encode(value) {
    return encodeURIComponent(value).replace(/'/g, "%27").replace(/"/g, "%22");
  }
  decode(value) {
    return decodeURIComponent(value.replace(/\+/g, " "));
  }

  favClick(song) {
    if (this.isFavourite) {
      this.sqlStorage.removeFav(song.id);
      this.isFavourite = false;
      this.translate.get('fav_removed').subscribe(
        value => {
          this.presentToast(value);
        }
      );
    }
    else {
      this.isFavourite = true;
      this.sqlStorage.setFav(song.id, song.songName);
      this.translate.get('fav_added').subscribe(
        value => {
          this.presentToast(value);
        }
      );

    }
  }

  closeFab(fab: FabContainer, e: Event) {
    if (e && e.srcElement && e.srcElement.nodeName !== "ION-ICON") {
      fab.close();
    }
  }

  getFav(index) {
    this.sqlStorage.getFav(index).then(data => {
      if (data) {
        this.isFavourite = true;
      } else {
        this.isFavourite = false;
      }
    });
  }
  getAllFav() {
    this.sqlStorage.getAllFav().then(data => {
      this.favArray = data;
      return this.favArray.some((el) => {
        return el.key === this.selectedSong.id;
      });
    });
  }

  presentToast(message: any) {
    this._sharedSvc.presentToast(message);
  }

  shareSS() {
    this.scrollToTop();
    this.hideNow = true;
    this._sharedSvc.takeScreenShot().then((response) => {
      this.hideNow = false;
      this._sharedSvc.openShareSheet("வணக்கம். பாரதியாரின் இந்த கவிதை/பாடல் சுவாரசியமாக உள்ளது. இந்த பாடல் மற்றும் பாரதியாரின் மற்ற பாடல்களை படிக்க இந்த ஆப்ஐ பதிவிரக்கம் பண்ணவும். https://play.google.com/store/apps/details?id=com.bharathiyar.padalgal ", response.URI);
    }, () => {
      this.translate.get('share_error').subscribe(
        value => {
          this.presentToast(value);
        }
      );
    });
  }

  swipeEvent(event: any) {
    let nextItem = 0;
    if (event.direction === 2) {
      nextItem = this.selectedSong.id + 1;
      if (this.songsModel.songsListLength === nextItem) {
        this.presentToast('You have reached the end of album');
        return;
      } else {
        this.goToSong(nextItem);
        this.searchKeyWord = '';
      }
    } else if (event.direction === 4) {
      //this.navCtrl.pop();
      let nextItem = this.selectedSong.id - 1;
      if (nextItem === -1) {
        this.presentToast('You have reached the begining of album');
        return;
      }
      this.goToSong(nextItem);
      this.searchKeyWord = '';
    }
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  goToSong(index) {
    this.isShake = true;
    setTimeout(() => {
      this.init(index);
    }, 350);
    setTimeout(() => {
      this.isShake = false;
      this.content.scrollToTop();
      this.fab.close();
    }, 700);
  }

  onScroll(e) {
    if (this.content.getContentDimensions().scrollTop > 200) {
      this.showBackToTop = true;
    } else {
      this.showBackToTop = false;
    }
  }
  ionViewDidEnter() {
    this.appRate.promptForRating(false);
  }
}
