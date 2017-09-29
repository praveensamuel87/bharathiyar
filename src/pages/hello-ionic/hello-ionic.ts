import { Component } from '@angular/core';
import {SqlStorageProvider} from '../../providers/sql-storage/sql-storage';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  key: any;
  value: any;
  constructor(public sqlStorage: SqlStorageProvider) {
    this.init();
  }

  init() {
    
  }

  addValue() {
    //this.sqlStorage.set(this.key,this.value);
    alert(this.value);
  }

  removeValue() {
    //this.sqlStorage.get(this.key).then(data => {
      //alert(data);
       //});    
  }
}
