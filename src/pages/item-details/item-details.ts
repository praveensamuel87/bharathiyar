import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedPage: any;
  selectedTitle: any;
  keys: Array<string> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedPage = navParams.get('item');
    this.keys = Object.keys(this.selectedPage);
    this.selectedTitle = navParams.get('heading');
  }

  itemTapped(event, page) {
    
    this.navCtrl.push(ItemDetailsPage, {
      item: this.selectedPage[page],
      heading: page 
    });
  }

  favClick(event) {
    console.log('fav has been clicked');

  }
}
