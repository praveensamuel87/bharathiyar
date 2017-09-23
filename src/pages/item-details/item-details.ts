import { ListPage } from './../list/list';
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedSection: any;
  selectedSongs: any;
  selectedChapters: any;
  selectedTitle: any;
  keys: Array<string> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedSection = navParams.get('item');
    this.selectedChapters = this.selectedSection.chapters;
    this.selectedSongs = this.selectedSection.songs;
    this.selectedTitle = this.selectedSection.name;
  }

  itemTapped(event, page) {
    
    this.navCtrl.push(ListPage, {
      item: page
    });
  }

  favClick(event) {
    console.log('fav has been clicked');

  }
}
