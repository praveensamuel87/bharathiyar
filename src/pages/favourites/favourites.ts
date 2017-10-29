import { SearchPage } from './../search/search';
import { SqlStorageProvider } from './../../providers/sql-storage/sql-storage';
import { SongsModel } from './../shared/songsModel';
import { ListPage } from './../list/list';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content, ItemSliding } from 'ionic-angular';

@Component({
  selector: 'favourites-page',
  templateUrl: 'favourites.html'
})
export class FavouritesPage {

  @ViewChild(Content) content: Content;
  myInput: any;
  songDB: Array<any> = [];
  favArray: Array<any> = [];
  constructor(public navCtrl: NavController, public songsModel: SongsModel, public sqlStorage: SqlStorageProvider) {
    this.songDB = this.songsModel.songsList;
    this.getAllFav();
  }
  getAllFav() {
    this.sqlStorage.getAllFav().then(data => {
      this.favArray = data;
    });
  }
  itemTapped(event, index) {

    this.navCtrl.push(ListPage, {
      item: index
    });
  }

  removeFromFav(song: any, index: number, slidingItem: ItemSliding) {
    slidingItem.close();
    song.isRemoved = true;
    this.sqlStorage.removeFav(song.key);
    setTimeout(() => {
      this.favArray.splice(index, 1);
    }, 700);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  openSearch() {
    this.navCtrl.push(SearchPage);
  }

}