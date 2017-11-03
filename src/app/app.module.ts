import { HighlightifyPipe } from './../pages/shared/highlightifyPipe';
import { ShareSvc } from './../pages/shared/shareSvc';
import { AboutPage } from './../pages/about/about';
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
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { AppRate } from '@ionic-native/app-rate';
import { Http, HttpModule } from '@angular/http';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { HomePage } from '../pages/home-page/home-page';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,    
    ItemDetailsPage,
    ListPage,
    HomePage,
    SearchPage,
    FavouritesPage,
    CustomfilterBy,
    SettingsPage,
    AboutPage,
    HighlightifyPipe
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{iconMode: 'md',pageTransition: 'md-transition'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    HomePage,
    SearchPage,
    FavouritesPage,
    SettingsPage,
    AboutPage
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
    LoaderSvc,
    ShareSvc,
    HighlightifyPipe,
    AppRate
  ]
})
export class AppModule {}