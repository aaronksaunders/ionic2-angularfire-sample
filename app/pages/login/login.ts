import {Modal, NavController, Page, ViewController} from 'ionic-angular';
import {FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Page({
    template: `
        <ion-navbar *navbar>
            <ion-title>
                Modal
            </ion-title>
        </ion-navbar>
        <ion-content padding>
            <h1>My Modal Page</h1>
            <form  #loginCreds="ngForm" (ngSubmit)="login(loginCreds.value)">
            <ion-item>
                <ion-label>Username</ion-label>
                <ion-input type="text" ngControl="email"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label>Password</ion-label>
                <ion-input type="password" ngControl="password"></ion-input>
            </ion-item>

            <div padding>
                <button block type="submit">Login</button>        
            </div>

            </form>
        </ion-content>
    `
})
export class ModalPage {
    constructor(public auth: FirebaseAuth, public viewCtrl: ViewController) { }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    login(credentials) {

        // This will perform popup auth with google oauth and the scope will be email
        // Because those options were provided through bootstrap to DI, and we're overriding the provider.
        //let credentials = {
        //    email: 'b@mail.com',
        //    password: 'password'
        //}

        this.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((value) => {
            console.log(value)
            this.dismiss()
        }).catch((error) => {
            console.log(error)
        });


    }

}