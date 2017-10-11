import { SongsModel } from './../shared/songsModel';
import { ListPage } from './../list/list';
import { CustomfilterBy } from './../shared/filterBy';
import { Component, ViewChild} from '@angular/core';

import { NavController, Content, Searchbar } from 'ionic-angular';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html',
  providers: [CustomfilterBy]
})
export class SearchPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Searchbar) searchbar: Searchbar;
  myInput: any;

  songDB: Array<any> = [];
  serachResult: Array<any> = [];
  constructor(public navCtrl: NavController,
    private _filterBy: CustomfilterBy, public songsModel: SongsModel) {
    this.songDB = this.songsModel.songsList;
    //this.searchbar.setFocus();
  }



  onInput(value) {
    if (this.myInput) {
      this.serachResult = this._filterBy.transform(this.songDB, [this.myInput]);
    }
  }
  onCancel(event) {
    //on search cancel button click
  }

  itemTapped(event, page) {

    this.navCtrl.push(ListPage, {
      item: page.id
    },{animate: true, direction: 'forward',animation:'transition',easing:'ease-in-out'});
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

}