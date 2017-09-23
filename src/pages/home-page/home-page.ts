import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import { NavController, NavParams } from 'ionic-angular';
import { finalJSON } from '../../app/finalJson';
import { ItemDetailsPage } from '../item-details/item-details';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'home-page.html'
})
export class HomePage {
  public selectedItem: any;
  public pages: Array<{ title: any, value: any, totalListing: any }> = [];
  value: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlStorage: SqlStorageProvider) {
    for (let key of finalJSON.sections) {
      let totalSongs = key.songs ? key.songs.length : 0;
      if(key.chapters) {
      for(let child of key.chapters){
        totalSongs += child.songs.length;
      }
    }
      this.pages.push({ title: key.name, value: key, totalListing: totalSongs });
    }
    this.selectedItem = navParams.get('selectedMenu');
    this.init();
  }

  init() {
    console.log(finalJSON[this.selectedItem]);
  }

  itemTapped(event, page) {
    this.navCtrl.push(ItemDetailsPage, {
      item: page.value,
    });
  }

  openSearch(){
    this.navCtrl.push(SearchPage);
  }
}
