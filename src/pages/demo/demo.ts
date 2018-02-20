import { SqlStorageProvider } from './../../providers/sql-storage/sql-storage';
import { Component, EventEmitter, Output, Input } from '@angular/core';
@Component({
  selector: 'demo-page',
  templateUrl: 'demo.html'
})
export class DemoPage {
  @Input() isDemoDone: boolean;
  @Output() onDemoClick = new EventEmitter<any>();
  constructor(public sqlStorage: SqlStorageProvider) {

  }
  
  closeThis() {
    this.sqlStorage.setSettings('swipeDemo', 'true');
    this.onDemoClick.emit(true);
  }

}
