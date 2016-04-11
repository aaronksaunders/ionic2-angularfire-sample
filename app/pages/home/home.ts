import {Page} from 'ionic-angular';
import {Component} from 'angular2/core';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

@Page({
    template: `
        <ion-navbar *navbar>
            <ion-title>
                Home
            </ion-title>
        </ion-navbar>

        <ion-content class="home">
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
    constructor(af: AngularFire) {
        this.bookItems = af.list('/bookItems');
    }
}
