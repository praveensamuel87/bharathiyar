import { SettingsPage } from './../pages/settings/settings';
import { FavouritesPage } from './../pages/favourites/favourites';
import { finalJSON } from './finalJson';
import { HomePage } from './../pages/home-page/home-page';
import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular'

import { StatusBar } from '@ionic-native/status-bar';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HomePage the root (or first) page
  rootPage = HomePage;
  pages: Array<{ title: string, icon: string, component: any }>;
  finalJSONValue: any = finalJSON;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public sqlStorageProvider: SqlStorageProvider
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'முகப்புப் பக்கம்', icon: 'ios-home-outline', component: HomePage },
      { title: 'பிடித்தவை', icon: 'star-outline', component: FavouritesPage },
      { title: 'Settings', icon: 'ios-settings-outline', component: SettingsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, { 'selectedMenu': page.title },{animate: true, direction: 'forward',animation:'transition',easing:'ease-in-out'});
  }
}
