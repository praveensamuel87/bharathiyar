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
  public pages: Array<{ title: any, value: any }> = [];
  value: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlStorage: SqlStorageProvider) {
    for (let key in finalJSON) {
      this.pages.push({ title: key, value: finalJSON[key] });
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
      heading: page.title 
    });
  }
}
