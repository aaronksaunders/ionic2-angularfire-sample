import {Modal, NavController, Page, ViewController} from 'ionic-angular';
import {FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Page({
    templateUrl: 'build/pages/login/login.html'
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