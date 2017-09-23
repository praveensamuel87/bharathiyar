import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html'
})
export class SearchPage {
  myInput: any;

  constructor(public navCtrl: NavController) {
  }

  onInput(event) {

  }
  onCancel(event) {
    
  }

}
