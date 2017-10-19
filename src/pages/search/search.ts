import { SongsModel } from './../shared/songsModel';
import { ListPage } from './../list/list';
import { CustomfilterBy } from './../shared/filterBy';
import { Component, ViewChild } from '@angular/core';

import { NavController, Content, Searchbar, LoadingController } from 'ionic-angular';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html',
  providers: [CustomfilterBy]
})
export class SearchPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Searchbar) searchbar: Searchbar;
  myInput: any;
  isSearching: boolean = false;
  searchKeyWord: string;
  songDB: Array<any> = [];
  serachResult: Array<any> = [];

  constructor(public navCtrl: NavController,
    private _filterBy: CustomfilterBy, public songsModel: SongsModel, public loadingCtrl: LoadingController) {
    this.songDB = this.songsModel.songsList;
    //this.searchbar.setFocus();
  }

  loader = this.loadingCtrl.create({
    spinner: 'hide',
    content: "Searching...",
    showBackdrop: false
  });


  onInput(value) {
    if (this.myInput && this.myInput.length >= 3) {
      this.searchKeyWord = this.myInput;
      this.isSearching = true;
      //this.loader.present();
      
      this.serachResult = this._filterBy.transform(this.songDB, [this.myInput]);
      /*setTimeout(() => {
        this.isSearching = false;
      }, 500);*/
      this.isSearching = false;
      //this.loader.dismiss();
    }
    else{
      this.searchKeyWord = '';
    }
  }
  onCancel(event) {
    //on search cancel button click
  }

  itemTapped(event, page) {

    this.navCtrl.push(ListPage, {
      item: page.id,
      searchKeyWord: this.searchKeyWord
    }, { animate: true, direction: 'forward', animation: 'transition', easing: 'ease-in-out' });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

}