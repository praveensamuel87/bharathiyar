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
  isOnHoldPress: boolean = false;
  showDelete: boolean = false;
  constructor(public navCtrl: NavController, public songsModel: SongsModel, public sqlStorage: SqlStorageProvider) {
    this.songDB = this.songsModel.songsList;
    this.getAllFav();
  }
  getAllFav() {
    this.sqlStorage.getAllFav().then(data => {
      this.favArray = data;
    });
  }
  itemTapped(song) {
    if (this.isOnHoldPress) {
      song.isSelected = !song.isSelected;
      this.showDelete = true;
      let removableArr = [];
      removableArr = this.favArray.filter(song => song.isSelected === true);
      if (removableArr.length === 0) {
        //this.isOnHoldPress = false;
        this.showDelete = false;
      }
    } else {
      this.navCtrl.push(ListPage, {
        item: song.key
      });
    }
  }

  removeFromFav(song: any, index: number) {
    song.isRemoved = true;
    this.sqlStorage.removeFav(song.key);
    setTimeout(() => {
      this.favArray.splice(index, 1);
    }, 700);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  onHold(song: any) {
    if (this.isOnHoldPress === false) {
      this.isOnHoldPress = true;
      this.showDelete = false;
      //console.log(song);
      if (song) {
        this.showDelete = true;
        song.isSelected = true;
      }
    }
  }

  removeMultiple() {
    this.isOnHoldPress = false;
    for (var i = this.favArray.length - 1; i >= 0; i--) {
      let song = this.favArray[i];
      if (song.isSelected) {
        song.isRemoved = true;
        this.sqlStorage.removeFav(song.key);
        this.favArray.splice(i, 1);

      }
    }
  }

  clearAll() {
    this.isOnHoldPress = false;
    for (var i = this.favArray.length - 1; i >= 0; i--) {
      this.favArray[i].isSelected = false
    }
  }
}