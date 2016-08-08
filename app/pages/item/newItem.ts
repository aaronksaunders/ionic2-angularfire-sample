import {Modal, NavController, Page, ViewController, NavParams} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import { AngularFire } from 'angularfire2';

@Page({
    templateUrl: 'build/pages/item/newItem.html'
})


export class NewItemModal {

    error: any

    /**
     * even though this is a Modal, we can access the navParam data passed into the object
     * when the object is created. This is how we access the user auth data
     */
    constructor(
        public af: AngularFire,
        public viewCtrl: ViewController,
        private _navParams: NavParams) {
        console.log("initialize NewItemModal")
    }

    /** 
     * this will dismiss the modal page
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     * exits the modal with no new item added
     */
    cancelItem(_event) {
        _event.preventDefault();
        this.dismiss()
    }

    /**
     * adds the item to the path /textItems
     */
    addTheItem(_data) {
        var textItems = this.af.database.list('/textItems');
        textItems.push({
            "title": _data.title,
            "description": _data.description,
            // auth data from the navParam object...
            "user": this._navParams.get("user").email,
            "timestamp": (new Date()).getTime()
        }).then((_data) => {
            console.log(_data)
            this.dismiss()
        }).catch((_error) => {
            console.log(_error)
        })
    }

}