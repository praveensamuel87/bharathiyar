import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  imageLocation: any= "assets/img/";
  selectedSong: any;
  selectedPallavi: any;
  selectedSaranam: any;
  imageSrc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedSong = navParams.get('item');
    this.selectedPallavi = this.selectedSong.pallavi ? this.decode(this.selectedSong.pallavi) : "";
    this.selectedSaranam = this.selectedSong.saranam ? this.decode(this.selectedSong.saranam) : "";
    this.imageSrc = this.selectedSong.imgSrc ? this.imageLocation + this.selectedSong.imgSrc: "";
  }

  encode(value) {
    return encodeURIComponent(value).replace(/'/g, "%27").replace(/"/g, "%22");
  }
  decode(value) {
    return decodeURIComponent(value.replace(/\+/g, " "));
  }

  itemTapped(event, item) {

  }
}
