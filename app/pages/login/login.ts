import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import {Component, OnInit, Inject} from '@angular/core';
import { NavController, Page, ViewController, NavParams} from 'ionic-angular';

import { Validators } from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: 'build/pages/login/login.html',
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class LoginPage {

    error: any
    af: any
    loginForm: FormGroup;

    constructor(public viewCtrl: ViewController,
        builder: FormBuilder,
        public _params: NavParams) {

        // HAD TO HACK IN THE AngularFire object... :-(
        this.af = _params.get("af");

        this.loginForm = builder.group({
            'email': [
                '', // default value
                [Validators.required, Validators.minLength(5)]
            ],
            'password': [
                '',
                [Validators.required, Validators.minLength(5)]
            ]
        })
    }
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


        this.af.auth.createUser(_credentials)
            .then((user) => {
                console.log(`Create User Success:`, user);
                _credentials.created = true;

                return this.login(_credentials, _event);
            })
            .catch(e => console.error(`Create User Failure:`, e));
    }

    registerUserWithGitHub(_credentials, _event) {
        _event.preventDefault();

        this.af.auth.login({
            provider: AuthProviders.Github,
            method: AuthMethods.Popup
        }).then((value) => {
            this.dismiss()
        }).catch((error) => {
            this.error = error
            console.log(error)
        });
    }


    registerUserWithTwitter(_credentials, _event) {
        _event.preventDefault();

        this.af.auth.login({
            provider: AuthProviders.Twitter,
            method: AuthMethods.Redirect
        }).then((authData) => {
            console.log(authData)

            // already has user... need better info??
            if (!authData) {
                this.dismiss()
            }

            const itemObservable = this.af.database.object('/users/' + authData.uid);
            itemObservable.set({
                "provider": authData.auth.providerData[0].providerId,
                "avatar": authData.auth.photoURL || "MISSING",
                "displayName": authData.auth.providerData[0].displayName || authData.auth.email,
            })

        }).then((value) => {
            this.dismiss()
        }).catch((error) => {
            this.error = error
            console.log(error)
        });
    }
    /**
     * this logs in the user using the form credentials.
     * 
     * if the user is a new user, then we need to create the user AFTER
     * we have successfully logged in
     * 
     * @param _credentials {Object} the email and password from the form
     * @param _event {Object} the event information from the form submit
     */
    login(credentials, _event) {
        _event.preventDefault();

        // if this was called from the register user,  the check if we 
        // need to create the user object or not
        let addUser = credentials.created
        credentials.created = null;

        // login usig the email/password auth provider
        this.af.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((authData) => {
            console.log(authData)

            if (addUser) {
                const itemObservable = this.af.database.object('/users/' + authData.uid);
                itemObservable.set({
                    "provider": authData.auth.providerData[0].providerId,
                    "avatar": authData.auth.photoURL || "MISSING",
                    "displayName": authData.auth.providerData[0].displayName || authData.auth.email,
                })
            } else {
                this.dismiss()
            }
        }).then((value) => {
            this.dismiss()
        }).catch((error) => {
            this.error = error
            console.log(error)
        });
    }
}