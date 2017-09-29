import { SqlStorageProvider } from './../../providers/sql-storage/sql-storage';
import { SongsModel } from './../shared/songsModel';
import { ListPage } from './../list/list';
import { Component, ViewChild } from '@angular/core';

import { NavController, Content } from 'ionic-angular';

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
    //this.favArray = [{'key':'1','value':'கவிதைகள்'},{'key':'2','value':'கவிதைகள்1'}]
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

  scrollToTop() {
    this.content.scrollToTop();
  }

}