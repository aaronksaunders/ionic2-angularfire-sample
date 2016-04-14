import {Modal, NavController, Page, ViewController} from 'ionic-angular';
import {FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Page({
    template: `
        <ion-navbar *navbar>
            <ion-title>
                Angular Fire Test App
            </ion-title>
        </ion-navbar>
        <ion-content padding>
            <h1>User Login</h1>
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
            <div padding>
                <p *ngIf="error" class="error">Error:&nbsp;{{ error.code }}</p>  
            </div>
            </form>
        </ion-content>
    `
})
export class ModalPage {
    
    error: any
    
    constructor(public auth: FirebaseAuth, public viewCtrl: ViewController) { }
    /** 
     * this will dismiss the modal page
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     *  this logs in the user using the form credentials
     */
    login(credentials) {

        // login usig the email/password auth provider
        this.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((value) => {
            console.log(value)
            this.dismiss()
        }).catch((error) => {
            this.error = error
            console.log(error)
        });


    }

}