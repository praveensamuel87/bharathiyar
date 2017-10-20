import { SqlStorageProvider } from './../../providers/sql-storage/sql-storage';
import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  selectedLanguage: string;
  savedLanguage: string;
  constructor(private translate: TranslateService, public sqlStorage: SqlStorageProvider) {
    this.sqlStorage.getSettings('lang').then(data => {
      this.selectedLanguage = data ? data : 'en';
      this.savedLanguage = data ? data : 'en';
    });
  }

  onLanguageChange(code) {
    if (this.savedLanguage !== code) {
      this.savedLanguage =  code;
      this.sqlStorage.setSettings('lang', code);
      this.translate.use(code);
    }
  }

}