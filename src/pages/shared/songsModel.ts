
import { Injectable } from '@angular/core';
@Injectable()
export class SongsModel {

  private _songsArr: Array<any>;

  resetModel() {
    this._songsArr.length = 0;
  }

  set songsList(val: Array<any>) {
    this._songsArr = val;
  }

  get songsList(): Array<any> {
    return this._songsArr;
  }

  get songsListLength(): number {
    return this._songsArr.length;
  }

  getSong(index: any): Object {
    return this._songsArr[index] ? this._songsArr[index] : this._songsArr[0];
  }

}
