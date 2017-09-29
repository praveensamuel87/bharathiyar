import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

/*
  Generated class for the SqlStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqlStorageProvider {
  storage: any;
  DB_NAME: string = '__ionicstorage';

  constructor(public platform: Platform, public sqlite: SQLite) {
    console.log('Hello SqlStorageProvider Provider');
    this.platform.ready().then(() => {
      //comment this to running in browser
      /*this.sqlite.create({ name: this.DB_NAME, location: 'default' })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.tryInit();
        });*/
    });
  }

  tryInit() {
    this.query('CREATE TABLE IF NOT EXISTS favourites (key INTEGER PRIMARY KEY AUTOINCREMENT, value text)')
      .catch(err => {
        console.error('Unable to create initial storage tables', err.tx, err.err);
      });
  }
  /**
       * Perform an arbitrary SQL operation on the database. Use this method
       * to have full control over the underlying database through SQL operations
       * like SELECT, INSERT, and UPDATE.
       *
       * @param {string} query the query to run
       * @param {array} params the additional params to use for query placeholders
       * @return {Promise} that resolves or rejects with an object of the form 
       * { tx: Transaction, res: Result (or err)}
       */
  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.transaction((tx: any) => {
          tx.executeSql(query, params,
            (tx: any, res: any) => resolve({ tx: tx, res: res }),
            (tx: any, err: any) => reject({ tx: tx, err: err }));
        },
          (err: any) => reject({ err: err }));
      } catch (err) {
        reject({ err: err });
      }
    });
  }

  /** GET the value in the database identified by the given key. */
  getAllFav(): Promise<any> {
    return this.query('select key, value from favourites')
      .then(data => {
        let returnArr = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            returnArr.push(data.res.rows.item(i));
          }
        }
        return returnArr;
      });
  }

  /** GET the value in the database identified by the given key. */
  getFav(key: string): Promise<any> {
    return this.query('select key, value from favourites where key = ? limit 1', [key])
      .then(data => {
        if (data.res.rows.length > 0) {
          return data.res.rows.item(0).value;
        }
        return "";
      });
  }

  /** SET the value in the database for the given key. */
  setFav(key: string, value: string): Promise<any> {
    return this.query('insert into favourites(key, value) values (?, ?)', [key, value]);
  }

  /** REMOVE the value in the database for the given key. */
  removeFav(key: string): Promise<any> {
    return this.query('delete from favourites where key = ?', [key]);
  }

}
