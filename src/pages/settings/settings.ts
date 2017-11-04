import { SqlStorageProvider } from './../../providers/sql-storage/sql-storage';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  selectedLanguage: string;
  savedLanguage: string;
  notification: boolean = false;
  notificationTime: any;
  notificationDay: any;
  chosenHours: any;
  chosenMinutes: any;
  notifications: Array<any> = [];
  constructor(private translate: TranslateService, public sqlStorage: SqlStorageProvider) {
    this.sqlStorage.getSettings('lang').then(data => {
      this.selectedLanguage = data ? data : 'ta';
      this.savedLanguage = data ? data : 'ta';
    });

    //this.notificationTime = this.notificationTime ? this.notificationTime : "19:00";
    //this.notificationDay = this.notificationDay ? this.notificationDay : [1, 2, 3, 4, 5, 6, 0];
    this.sqlStorage.getSettings('notification').then((value) => {
      let obj = value ? JSON.parse(value) : { 'notification': 'false', 'time': '19:00', 'day': [0, 1, 2, 3, 4, 5, 6] };
      this.notification = obj.notification;
      this.notificationTime = obj.time;
      this.notificationDay = obj.day;
    });
    //this.getAllNotification();
  }

  onLanguageChange(code) {
    if (this.savedLanguage !== code) {
      this.savedLanguage = code;
      this.sqlStorage.setSettings('lang', code);
      this.translate.use(code);
    }
  }
  /*
  timeChange(time: any) {
    this.chosenHours = time.hour;
    this.chosenMinutes = time.minute;
    this.scheduleNotification(true);
  }

  scheduleNotification(update: boolean) {
    if (update) {
      this.addNotifications();
    } else {
      this.cancelNotifications();
    }
  }

  cancelNotifications() {
    this.localNotifications.cancelAll().then((response) => {
      let obj = { 'notification': 'false', 'time': '19:00', 'day': [0, 1, 2, 3, 4, 5, 6] };
      this.sqlStorage.setSettings('notification', JSON.stringify(obj));
      this.getAllNotification();
    });
  }
  addNotifications() {

    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
    for (let dayCode of this.notificationDay) {

      let firstNotificationTime = new Date();
      let dayDifference = dayCode - currentDay;

      if (dayDifference < 0) {
        dayDifference = dayDifference + 7; // for cases where the day is in the following week
      }
      firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
      //firstNotificationTime.setHours(this.chosenHours);
      firstNotificationTime.setMinutes(this.chosenMinutes);

      let notification = {
        id: dayCode,
        title: 'பாரதியார் கவிதைகள்!',
        text: 'It is time to read a song written by பாரதியார் :)',
        at: firstNotificationTime,
        every: 'week',
        sound: 'file://sound.mp3',
        icon: 'file://assets/icon/icon.png',
        smallIcon: 'file://assets/icon/icon.png'
      };

      this.notifications.push(notification);
    }

    console.log("Notifications to be scheduled: ", this.notifications);

    // Cancel any existing notifications
    this.localNotifications.cancelAll().then(() => {
      // Schedule the new notifications
      this.localNotifications.schedule(this.notifications);
      this.getAllNotification();
      this.notifications = [];
      console.log('Notifications set');
      let obj = { 'notification': 'true', 'time': this.notificationTime, 'day': this.notificationDay };
      this.sqlStorage.setSettings('notification', JSON.stringify(obj));
    });



  }

  getAllNotification() {
    this.localNotifications.getAll().then((value) => {
      console.log(value);
    });;
  }*/
}
