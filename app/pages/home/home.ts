import {Page} from 'ionic-angular';
import {Component} from 'angular2/core';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

import {FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Page({
    template: `
        <ion-navbar *navbar>
            <ion-title>
                Home
            </ion-title>
            <ion-buttons end>
                <button (click)="loginClicked()">
                <ion-icon name="contact"></ion-icon>
                </button>
            </ion-buttons>            
        </ion-navbar>

        <ion-content class="home">
            <ion-item>
                <div *ngIf="auth | async">You are logged in as {{authInfo.email}}</div>
                <div *ngIf="!(auth | async)">Please log in</div>
            </ion-item>
            <ion-card  *ngFor="#item of bookItems | async">
                <ion-card-header>
                    {{item.volumeInfo.title}}
                </ion-card-header>
                <ion-card-content>
                    {{item.volumeInfo.description}}
                </ion-card-content>
            </ion-card>
        </ion-content>`
})
export class HomePage {
    bookItems: Observable<any[]>;
    authInfo: any

    constructor(public af: AngularFire, public auth: FirebaseAuth) {
        this.bookItems = af.list('/bookItems');

        auth.subscribe((data) => {
            console.log("in auth subscribe", data)
            if (data) {
                this.authInfo = data.password
            } else {
                this.authInfo = null
            }
        })
    }

    loginClicked() {

        if (this.authInfo && this.authInfo.email) {
            this.auth.logout();
            return;
        }

        // This will perform popup auth with google oauth and the scope will be email
        // Because those options were provided through bootstrap to DI, and we're overriding the provider.
        let credentials = {
            email: 'b@mail.com',
            password: 'password'
        }

        this.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((value) => {
            console.log(value)
        }).catch((error) => {
            console.log(error)
        });
    }
}
