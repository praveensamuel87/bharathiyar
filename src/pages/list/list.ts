import { ShareSvc } from './../shared/shareSvc';
import { SongsModel } from './../shared/songsModel';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, FabContainer, Content } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild(Content) content: Content;
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlStorage: SqlStorageProvider, public songsModel: SongsModel, private _sharedSvc: ShareSvc) {
    this.init(navParams.get('item'));
    this.searchKeyWord = navParams.get('searchKeyWord');
  }

  init(id) {
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
      this.presentToast('பிடித்த பட்டியலில் இருந்து நீக்கப்பட்டுள்ளது.');
    }
    else {
      this.isFavourite = true;
      this.sqlStorage.setFav(song.id, song.songName);
      this.presentToast('பிடித்த பட்டியலில் சேர்க்கப்பட்டுள்ளது');
    }
  }

  closeFab(fab: FabContainer, e: Event) {
    if (e.srcElement.nodeName !== "ION-ICON") {
      fab.close();
    }
  }

  getFav(index) {
    this.sqlStorage.getFav(index).then(data => {
      if (data) {
        this.isFavourite = true;
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
    this.hideNow = true;
    this._sharedSvc.takeScreenShot().then((response) => {
      this.hideNow = false;
      this._sharedSvc.openShareSheet("வணக்கம். பாரதியாரின் இந்த கவிதை/பாடல் சுவாரசியமாக உள்ளது. இந்த பாடல் மற்றும் பல பாடல்களை படிக்க இந்த ஆப்ஐ பதிவிரக்கம் பண்ணவும் https://play.google.com/store/apps/details?id=com.bharathiyar.padalgal ", response.URI);
      //this.shareUsingShareSheet(response.URI);
    }, () => {
      this.presentToast('மன்னிக்கவும். இந்த நேரத்தில் பகிர்ந்து கொள்ள முடியவில்லை.');
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
    }, 700);
  }

  onScroll(e) {
    if (this.content.getContentDimensions().scrollTop > 200) {
      this.showBackToTop = true;
    } else {
      this.showBackToTop = false;
    }
  }
}
