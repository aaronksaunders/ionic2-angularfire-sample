import {Modal, NavController, Page} from 'ionic-angular';
import {Component, OnInit, Inject} from 'angular2/core';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {LoginPage} from '../login/login'
import {NewItemModal} from '../item/newItem';
import {MomentDate} from '../../lib/MomentDate'
import 'rxjs';


import {FirebaseAuth, AuthProviders, AuthMethods, FirebaseRef } from 'angularfire2';

@Page({
    templateUrl: 'build/pages/home/home.html',
    pipes: [MomentDate]
})
export class HomePage implements OnInit {
    textItems: Observable<any[]>;
    usersWithMessages: Observable<any[]>;
    authInfo: any

    constructor(
        @Inject(FirebaseRef) public ref: Firebase,
        public af: AngularFire,
        public auth: FirebaseAuth,
        public navCtrl: NavController) {
        // dont do anything heavy here... do it in ngOnInit
    }

    ngOnInit() {

        // subscribe to the auth object to check for the login status
        // of the user, if logged in, save some user information and
        // execute the firebase query...
        // .. otherwise
        // show the login modal page
        this.auth.subscribe((data) => {
            console.log("in auth subscribe", data)
            if (data) {
				if (data.twitter) {
					this.authInfo =  data.twitter
					this.authInfo.displayName = data.twitter.displayName
				} else if (data.github) {
					this.authInfo =  data.github 
					this.authInfo.displayName = data.github.displayName
				} else {
					this.authInfo = data.password 
					this.authInfo.displayName = data.password.email
				}
                this.textItems = this.af.list('/textItems');

                //this.getMoreData()

            } else {
                this.authInfo = null
                this.displayLoginModal()
            }
        })
    }

    getMoreData() {
    this.usersWithMessages = this.af.list('/users').map((_users) => {
        return _users.map((_user) => {
            _user.messages = this.af.object("/userObjects/public-messages/" +_user.$key)
            return _user
        })
    })
    }

    /**
     * displays the login window
     */
    displayLoginModal() {
        let loginPage = Modal.create(LoginPage);
        this.navCtrl.present(loginPage);
    }

    /**
     * adds a new item to firebase /textItems
     * 
     * pass in the auth information to the modal to associate the user with the newly
     * created entry
     */
    addNewItemClicked(_data) {
        let newItemPage = Modal.create(NewItemModal, { "user": this.authInfo });
        this.navCtrl.present(newItemPage);
    }

    /**
     * logs out the current user
     */
    logoutClicked() {

        if (this.authInfo && (this.authInfo.email ||  this.authInfo.accessToken)) {
            this.auth.logout();
            return;
        }
    }
}
