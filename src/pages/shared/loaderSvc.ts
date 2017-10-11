
import { Injectable } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
@Injectable()
export class LoaderSvc {
    loader = this.loadingCtrl.create({
        content: "Loading..."
    });


    constructor(public loadingCtrl: LoadingController) {

    }

    showLoader() {
        this.loader.present();
    }

    hideLoader() {
        this.loader.dismiss();
    }

}