import { finalJSON } from './finalJson';
import { HomePage } from './../pages/home-page/home-page';
import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

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
  pages: Array<{ title: string, component: any }>;
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
    /*for (let j = 0; j < this.finalJSONValue.length; j++) {
      console.log(this.finalJSONValue[j]);
    }*/
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Home Page', component: HomePage },
    ];

    /*for (let key in this.finalJSONValue) {
      this.pages.push({ title: key, component: HomePage });
    }*/

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
    this.nav.setRoot(page.component, {'selectedMenu': page.title});
  }
}
