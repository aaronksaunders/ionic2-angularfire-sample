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
            <form  #loginCreds="ngForm" >
            <ion-item>
                <ion-label>Username</ion-label>
                <ion-input type="text" ngControl="email"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label>Password</ion-label>
                <ion-input type="password" ngControl="password"></ion-input>
            </ion-item>

            <div padding>
                <button block (click)="login(loginCreds.value, $event)">Login</button>        
            </div>
            <div padding>
                <button block (click)="registerUser(loginCreds.value, $event)">Create Account</button>        
            </div>
            <div padding>
                <p *ngIf="error" class="error">Error:&nbsp;{{ error.code }}</p>  
            </div>
            </form>
        </ion-content>
    `
})
export class LoginPage {

    error: any

    constructor(public auth: FirebaseAuth, public viewCtrl: ViewController) { }
    /** 
     * this will dismiss the modal page
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     * this create in the user using the form credentials. 
     *
     * we are preventing the default behavor of submitting 
     * the form
     * 
     * @param _credentials {Object} the email and password from the form
     * @param _event {Object} the event information from the form submit
     */
    registerUser(_credentials, _event) {
        _event.preventDefault();

        this.auth.createUser(_credentials).then((value) => {
            console.log(value)
            this.dismiss()
        }).catch((error) => {
            this.error = error
            console.log(error)
        });
    }
    /**
     *  this logs in the user using the form credentials
     * 
     * @param _credentials {Object} the email and password from the form
     * @param _event {Object} the event information from the form submit
     */
    login(credentials, _event) {
        _event.preventDefault();

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