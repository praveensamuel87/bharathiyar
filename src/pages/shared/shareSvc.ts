
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';

import { Toast } from '@ionic-native/toast';

@Injectable()
export class ShareSvc {
    constructor(public loadingCtrl: LoadingController, public socialSharing: SocialSharing, public screenshot: Screenshot, public toast: Toast) {

    }
    presentToast(message: any) {
        this.toast.show(message, '2500', 'bottom').subscribe(
            toast => {
                //console.log(toast);
            }
        );
    }

    takeScreenShot() {
        return this.screenshot.URI(100);
    }

    openShareSheet(text, url) {
        this.socialSharing.share(text, null, url, null);
    }

    shareViaWhatsapp(url: any) {
        this.socialSharing.shareViaWhatsApp("", "", "").then(() => {
            this.presentToast('Shared SuccessFully');
        }).catch(() => {
            this.presentToast('இந்த நேரத்தில் பகிர்ந்து கொள்ள முடியவில்லை');
        });

    }

    shareViaTwitter(url: any) {
        //shareViaTwitter(message, image, url)
        this.socialSharing.shareViaTwitter("", "", "").then(() => {
            this.presentToast('Shared SuccessFully');
        }).catch(() => {
            this.presentToast('இந்த நேரத்தில் பகிர்ந்து கொள்ள முடியவில்லை');
        });
    }
    shareViaFB(url: any) {
        //shareViaFacebook(message, image, url)
        this.socialSharing.shareViaFacebook("", "", "").then(() => {
            this.presentToast('Shared SuccessFully');
        }).catch(() => {
            this.presentToast('இந்த நேரத்தில் பகிர்ந்து கொள்ள முடியவில்லை');
        });
    }

}