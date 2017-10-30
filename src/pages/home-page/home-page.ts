import { LoaderSvc } from './../shared/loaderSvc';
import { otherSongJSON } from './../../app/otherSongsJson';
import { finalJSON } from './../../app/finalJson';
import { SongsModel } from './../shared/songsModel';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { kaaviyamJSON } from './../../app/KaaviyamJson';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'home-page.html'
})
export class HomePage {
  public selectedItem: any;
  public pages: Array<{ title: any, value: any, totalListing: any }> = [];
  value: any;
  songDB: Array<any> = [];
  listView: boolean = false;
  defaultImg: string = "assets/img/bharathi_song_banner.jpg";
  imageLocation: any = "assets/img/";
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public songsModel: SongsModel, private _loader: LoaderSvc) {
    this._loader.showLoader();
    this.init();
  }

  init() {
    let index = 0;
    finalJSON.sections.push(kaaviyamJSON);
    finalJSON.sections.push(otherSongJSON);
    for (let section of finalJSON.sections) {
      let totalSongs = section.songs ? section.songs.length : 0;
      let sectionObj = { "chapters": [], "songs": [], "name": "" };
      if (section.songs) {
        let songArr = [];
        for (let song of section.songs) {
          let songObj = { "name": "", "index": 0 };
          this.addSongs(section.name, "", song.name, song.pallavi, song.thalam, song.imgSrc, index);
          songObj.name = song.name;
          songObj.index = index;
          songArr.push(songObj);
          index++;
        }
        sectionObj.songs = songArr;
      }
      if (section.chapters) {
        let chapterArr = [];
        for (let chapters of section.chapters) {
          totalSongs += chapters.songs.length;
          let chapterObj = { "name": "", "songs": [] };
          chapterObj.name = chapters.name;
          let songArr = [];
          for (let song of chapters.songs) {
            let songObj = { "name": "", "index": 0 };
            let imgSrc = chapters.imgSrc ? chapters.imgSrc : song.imgSrc;
            this.addSongs(section.name, chapters.name, song.name, song.pallavi, song.thalam, imgSrc, index);
            song.index = index;
            songObj.name = song.name;
            songObj.index = index;
            songArr.push(songObj);
            index++;
          }
          chapterObj.songs = songArr;
          chapterArr.push(chapterObj);
        }
        sectionObj.chapters = chapterArr;
      }
      this.pages.push({ title: section.name, value: sectionObj, totalListing: totalSongs });
    }
    this.songsModel.songsList = this.songDB;
    this._loader.hideLoader();
    /*this.localNotifications.on('click',(success)=>{
      this.navCtrl.push(ListPage, {
        item: Math.floor(Math.random() * this.songsModel.songsList.length) + 1  
      },{animate: true, direction: 'forward',animation:'transition',easing:'ease-in-out'});
    });*/
  }

  itemTapped(event, page) {
    this.navCtrl.push(ItemDetailsPage, {
      item: page,
    }, { animate: true, direction: 'forward', animation: 'transition', easing: 'ease-in-out' });
  }

  openSearch() {
    this.navCtrl.push(SearchPage);
  }

  addSongs(sectionName, chapterName, songName, songText, thalam, imgSrc, index) {
    let sectionObj: { id: any, sectionName: any, chapterName: any, songName: any, songText: any, imgSrc: any, thalam: any } = {
      "id": "", "sectionName": "", "chapterName": "", "songName": "", "songText": "", "imgSrc": "", "thalam": ""
    };
    sectionObj.id = index;
    sectionObj.sectionName = sectionName;
    sectionObj.chapterName = chapterName;
    sectionObj.songName = songName;
    sectionObj.songText = songText ? this.decode(songText) : "";
    sectionObj.thalam = thalam ? thalam : "";
    sectionObj.imgSrc = imgSrc ? this.imageLocation + imgSrc : this.defaultImg;
    this.songDB.push(sectionObj);
  }

  decode(value) {
    return decodeURIComponent(value.replace(/\+/g, " "));
  }

}
