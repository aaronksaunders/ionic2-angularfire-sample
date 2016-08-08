import {ModalController, NavController, Page} from 'ionic-angular';
import {Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginPage} from '../login/login'
import {NewItemModal} from '../item/newItem';
import {MomentDate} from '../../lib/MomentDate'
import 'rxjs';


import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Page({
    templateUrl: 'build/pages/home/home.html',
    pipes: [MomentDate]
})
export class HomePage implements OnInit {
    textItems: Observable<any[]>;
    usersWithMessages: Observable<any[]>;
    authInfo: any
    displayName: any
    buttonTitle = "LOGIN"

    constructor(
        public af: AngularFire,
        public navCtrl: NavController,
        public modal: ModalController) {
        // dont do anything heavy here... do it in ngOnInit
    }

    ionViewDidEnter() {
        this.af.auth.getAuth() && (this.textItems = this.af.database.list('/textItems'))
    }

    ngOnInit() {

        // subscribe to the auth object to check for the login status
        // of the user, if logged in, save some user information and
        // execute the firebase query...
        // .. otherwise
        // show the login modal page
        this.af.auth.subscribe((data: FirebaseAuthState) => {
            console.log("in auth subscribe", data)


            if (data && !data.anonymous) {

                this.af.auth.unsubscribe()

                this.buttonTitle = "LOGOUT"

                // if no user, then add it
                this.addOrUpdateUser(data)


                if (data.auth.providerData[0].providerId === "twitter.com") {
                    this.authInfo = data.auth.providerData[0]
                    this.displayName = data.auth.providerData[0].displayName
                } else if (data.github) {
                    this.authInfo = data.github
                    //this.authInfo.displayName = data.github.displayName
                } else {
                    this.authInfo = data.auth || {}
                    this.displayName = data.auth.providerData[0].email
                }
                this.textItems = this.af.database.list('/textItems')

                //this.getMoreData()

            } else {
                this.buttonTitle = "LOGIN"
                this.authInfo = null
                this.displayLoginModal()
            }
        })
    }

    addOrUpdateUser(_authData) {
        const itemObservable = this.af.database.object('/users/' + _authData.uid);
        itemObservable.set({
            "provider": _authData.auth.providerData[0].providerId,
            "avatar": _authData.auth.photoURL || "MISSING",
            "displayName": _authData.auth.providerData[0].displayName || _authData.auth.email,
        })
    }
    getMoreData() {
        this.usersWithMessages = this.af.list('/users').map((_users) => {
            return _users.map((_user) => {
                _user.messages = this.af.object("/userObjects/public-messages/" + _user.$key)
                return _user
            })
        })
    }

    /**
     * displays the login window
     */
    displayLoginModal() {
        let loginPage = this.modal.create(LoginPage, { af: this.af });
        loginPage.present();
    }

    /**
     * adds a new item to firebase /textItems
     * 
     * pass in the auth information to the modal to associate the user with the newly
     * created entry
     */
    addNewItemClicked(_data) {
        let newItemPage = this.modal.create(NewItemModal, { "user": this.authInfo });
        newItemPage.present(newItemPage);
    }

    /**
     * logs out the current user
     */
    logoutClicked() {

        if (this.authInfo && (this.authInfo.email || this.authInfo.providerId)) {
            this.af.auth.logout();
            this.authInfo = null
            this.displayLoginModal()
        } else {
            this.displayLoginModal()
        }
    }
}
