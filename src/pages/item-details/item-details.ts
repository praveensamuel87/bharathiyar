import { SongsModel } from './../shared/songsModel';
import { SearchPage } from './../search/search';
import { ListPage } from './../list/list';
import { Component, ViewChild } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ItemSliding, Content } from 'ionic-angular';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  //content fullscreen - 	If true, the content will scroll behind the headers and footers. This effect can easily be seen by setting the toolbar to transparent.
  @ViewChild(Content) content: Content;
  selectedSection: any;
  selectedSongs: any;
  selectedChapters: any;
  selectedTitle: any;
  keys: Array<string> = [];
  backToTopVisible: boolean = false;
  showOtherSongList: boolean = false;
  loader = this.loadingCtrl.create({
    content: "Loading..."
  });
  constructor(public navCtrl: NavController, public navParams: NavParams, public socialSharing: SocialSharing, public loadingCtrl: LoadingController, public songsModel: SongsModel) {
    this.loader.present();
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedSection = navParams.get('item').value;
    this.selectedChapters = this.selectedSection.chapters;
    this.selectedSongs = this.selectedSection.songs;
    this.selectedTitle = navParams.get('item').title;
    this.loader.dismiss();
  }

  itemTapped(event, index) {

    this.navCtrl.push(ListPage, {
      item: index
    });
  }

  favClick(slidingItem: ItemSliding, song: any) {
    console.log('fav has been clicked');
    slidingItem.close();

  }
  openSearch() {
    this.navCtrl.push(SearchPage);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  onScrollEvent($event) {
    if (this.content.getContentDimensions().scrollTop > 100) {
      this.backToTopVisible = true;
    }
    else {
      this.backToTopVisible = false;
    }
  }


  shreUsingShareSheet(slidingItem: ItemSliding, key: any) {
    // Check if sharing via email is supported
    //share(message, subject, file, url)
    slidingItem.close();
    console.log('fav has been clicked');
    this.socialSharing.share("", "", "", "url").then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    })
  }
}
