import { SqlStorageProvider } from './../../providers/sql-storage/sql-storage';
import { Component, EventEmitter, Output, Input } from '@angular/core';
@Component({
  selector: 'demo-page',
  templateUrl: 'demo.html'
})
export class DemoPage{
  @Input() showLeft: boolean;
  @Input() demoSettingsObj: any;
  @Output() swipeEvent = new EventEmitter<any>();
  //demoSettingsObj: any;
  constructor(public sqlStorage: SqlStorageProvider) {
    console.log('showLeft = ' + this.showLeft);
  }

  onSwipe(event: any) {
    
    if (this.showLeft && event.direction === 2) {
      this.demoSettingsObj.left = true;
      this.sqlStorage.setSettings('swipeDemo', JSON.stringify(this.demoSettingsObj));
      this.swipeEvent.emit(event);
    } else if (!this.showLeft && event.direction === 4) {
      this.demoSettingsObj.right = true;
      this.sqlStorage.setSettings('swipeDemo', JSON.stringify(this.demoSettingsObj));
      this.swipeEvent.emit(event);
    }
  }
}
