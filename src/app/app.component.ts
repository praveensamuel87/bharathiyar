import { ShareSvc } from './../pages/shared/shareSvc';
import { AboutPage } from './../pages/about/about';
import { SettingsPage } from './../pages/settings/settings';
import { FavouritesPage } from './../pages/favourites/favourites';
import { finalJSON } from './finalJson';
import { HomePage } from './../pages/home-page/home-page';
import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular'

import { StatusBar } from '@ionic-native/status-bar';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { AppRate } from '@ionic-native/app-rate';

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
    public sqlStorage: SqlStorageProvider,
    private _sharedSvc: ShareSvc,
    private translate: TranslateService,
    private _appRate: AppRate
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'HOMEPAGE', icon: 'ios-home-outline', component: HomePage },
      { title: 'FAV', icon: 'star-outline', component: FavouritesPage },
      { title: 'SETTINGS', icon: 'ios-settings-outline', component: SettingsPage },
      { title: 'ABOUT', icon: 'ios-information-circle-outline', component: AboutPage },
      { title: 'Share_App', icon: 'md-share', component: SettingsPage },
      { title: 'Rate_App', icon: 'md-star-half', component: SettingsPage }
    ];
    this.initTranslate();
    this._appRate.preferences = {
      storeAppURL: {
        android: 'market://details?id=com.bharathiyar.padalgal'
      },
      usesUntilPrompt: 3
    }

  }

  initTranslate() {
    this.sqlStorage.getSettings('lang').then(data => {
      this.translate.setDefaultLang(data);
    });
    // Set the default language for translation strings, and the current language.


    if (this.translate.getBrowserLang() !== undefined) {
      //this.translate.use(this.translate.getBrowserLang());
    } else {
      // this.translate.use('en'); // Set your language here
    }
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
    if (page.title === "HOMEPAGE") {
      //this.nav.setRoot(page.component, { 'selectedMenu': page.title });
      this.nav.popToRoot({});
    } else if (page.title === "Share_App") {
      this._sharedSvc.openShareSheet('I found this Bharathiyar Padalgal app interesting. பதிவிறக்க இங்கே கிளிக் செய்யவும் https://play.google.com/store/apps/details?id=com.bharathiyar.padalgal', null);
    } else if (page.title === "Rate_App"){
      this._appRate.navigateToAppStore()
    } else {
      this.nav.push(page.component, {});
    }
  }
}