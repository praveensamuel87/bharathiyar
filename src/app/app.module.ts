import { LoaderSvc } from './../pages/shared/loaderSvc';
import { SettingsPage } from './../pages/settings/settings';
import { CustomfilterBy } from './../pages/shared/filterBy';
import { FavouritesPage } from './../pages/favourites/favourites';
import { SongsModel } from './../pages/shared/songsModel';
import { SearchPage } from './../pages/search/search';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Toast } from '@ionic-native/toast';
import { Screenshot } from '@ionic-native/screenshot';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { HomePage } from '../pages/home-page/home-page';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomePage,
    SearchPage,
    FavouritesPage,
    CustomfilterBy,
    SettingsPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{iconMode: 'md'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomePage,
    SearchPage,
    FavouritesPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqlStorageProvider,
    SQLite,
    SocialSharing,
    Screenshot,
    Toast,
    SongsModel,
    CustomfilterBy,
    NativePageTransitions,
    LoaderSvc
  ]
})
export class AppModule {}