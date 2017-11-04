
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
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