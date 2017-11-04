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
  constructor(public navCtrl: NavController, public navParams: NavParams, public socialSharing: SocialSharing, public loadingCtrl: LoadingController) {
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
    },{animate: true, direction: 'forward',animation:'transition',easing:'ease-in-out'});
  }

  openSearch() {
    this.navCtrl.push(SearchPage, {},{animate: true, direction: 'forward',animation:'transition',easing:'ease-in-out'});
  }

  scrollToTop() {
    this.content.scrollToTop();
    this.backToTopVisible = false;
  }

  onScrollEvent($event) {
    if (this.content.getContentDimensions().scrollTop > 100) {
      this.backToTopVisible = true;
    }
    else {
      this.backToTopVisible = false;
    }
  }
}
