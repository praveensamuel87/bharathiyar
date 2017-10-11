import { SongsModel } from './../shared/songsModel';
import { Component } from '@angular/core';
import { NavController, NavParams, FabContainer, App} from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedSong: any;
  selectedPallavi: any;
  selectedSaranam: any;
  imageSrc: any;
  favArray: Array<any>;
  isFavourite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlStorage: SqlStorageProvider, public socialSharing: SocialSharing, public screenshot: Screenshot, public toast: Toast, public songsModel: SongsModel,  public appCtrl: App) {
    this.selectedSong = this.songsModel.getSong(navParams.get('item'));
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
      this.presentToast('பிடித்த பட்டியலில் இருந்து நீக்கப்பட்டுள்ளது');
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
    this.toast.show(message, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  shareSS() {
    this.screenshot.URI(100).then((response) => {
      this.shareUsingShareSheet(response.URI);
    }, () => {
      this.presentToast('இந்த நேரத்தில் பகிர்ந்து கொள்ள முடியவில்லை');
    });
  }



  shareViaWhatsapp(url: any) {
    this.socialSharing.shareViaWhatsApp("", "", "").then(() => {
      this.presentToast('Shared SuccessFully');
    }).catch(() => {
      this.presentToast('இந்த நேரத்தில் பகிர்ந்து கொள்ள முடியவில்லை');
    });

  }

  shareViaTwitter(url: any) {
    //shareViaTwitter(message, image, url)
    this.socialSharing.shareViaTwitter("", "", "").then(() => {
      this.presentToast('Shared SuccessFully');
    }).catch(() => {
      this.presentToast('இந்த நேரத்தில் பகிர்ந்து கொள்ள முடியவில்லை');
    });
  }
  shareViaFB(url: any) {
    //shareViaFacebook(message, image, url)
    this.socialSharing.shareViaFacebook("", "", "").then(() => {
      this.presentToast('Shared SuccessFully');
    }).catch(() => {
      this.presentToast('இந்த நேரத்தில் பகிர்ந்து கொள்ள முடியவில்லை');
    });
  }

  shareUsingShareSheet(url: any) {
    // Check if sharing via email is supported
    //share(message, subject, file, url)
    this.socialSharing.share("வணக்கம். பாரதியாரின் இந்த கவிதை/பாடல் சுவாரசியமாக இருக்கிறது.", null, url, null);
    /*this.socialSharing.share("", "", "", "url").then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    })*/
  }

  swipeEvent(event: any) {
    if (event.direction === 2) {
      this.navCtrl.push(ListPage, {
        item: this.selectedSong.id + 1
      }, { animate: true, direction: 'forward', animation: 'transition', easing: 'ease-in-out' });
    } else if (event.direction === 4) {
      //this.navCtrl.pop();
      let nextItem = this.selectedSong.id - 1;
      if(nextItem === -1) {
        this.presentToast('You have reached the begining of album');
        return;
      }
      //this.navCtrl.pop();
      this.navCtrl.push(ListPage, {
        item: nextItem
      }, { animate: true, direction: 'back', animation: 'transition', easing: 'ease-in-out' });
    }
  }
}
