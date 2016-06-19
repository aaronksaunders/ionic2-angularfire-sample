//import 'es6-shim';
import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';



import {
    FIREBASE_PROVIDERS, defaultFirebase,
    AngularFire, firebaseAuthConfig, AuthProviders,
    AuthMethods
} from 'angularfire2';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    providers: [
        FIREBASE_PROVIDERS,
        // Initialize Firebase app  
        defaultFirebase({
            apiKey: "AIzaSyDKSySssQO5ne689wcPd6mCzsLAsXG0E3g",
            authDomain: "clearlyinnovative-firebasestarterapp.firebaseapp.com",
            databaseURL: "https://clearlyinnovative-firebasestarterapp.firebaseio.com",
            storageBucket: "clearlyinnovative-firebasestar.appspot.com",
        }),
        firebaseAuthConfig({
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
            remember: 'default',
            scope: ['email']
        })
    ]
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }
}

ionicBootstrap(MyApp);
