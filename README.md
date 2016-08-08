# Integrating Firebase with AngularFire2 into AngularJS & Ionic2
######**UPDATE August 8th 2016:**

- Supportig latest release of the angularfire library
- ran into issue with Ionic and not being ableto load AngularFire as a dependency, but hacked around it, https://github.com/driftyco/ionic/issues/7160

---

######**UPDATE JULY 31th 2016:**

- Supportig latest release of the angularfire library
- have not integrated the social login functionality of demo

---

######**UPDATE JUNE 19th 2016:**

- Working on updating this sample to AngularFire2 with Firebase3 Support : https://github.com/aaronksaunders/ionic2-angularfire-sample/tree/firebase3-support
- There is a known issue at this time: https://github.com/angular/angularfire2/issues/243

---
######**UPDATE MAY 20th 2016:** Firebase AngularFire2 has been updated to work with the latest version of Angular2 but is still on version 2.4.2 of Firebase. This sample has been updated to work with AngularFire2 but is currently locked on firebase@2.4.2
---
**UPDATE MAY 14th 2016:** Firebase AngularFire2 has been updated to work with the latest version of Angular2 and Ionic2 has not so this will only work if you load the specific version of AngularFire2 with your application
```
"angular2": "2.0.0-beta.13",
"angularfire2": "^2.0.0-alpha.16",
```
--
####PART TWO
- Restructuring code for a larger project with Ionic2 and AngularFire
- Adding the ability to create users using AngularFire2
- Adding Items to the List in AngularFire2
- Passing parameters to Modals in Ionic2

####PART ONE - see Tag v1.0 - https://github.com/aaronksaunders/ionic2-angularfire-sample/tree/v1.0
- Basic Querying of Objects in AngularFire2
- Logging into existing Account


----

In the classes I teach I get asked every semester to show how to integrate Firebase into an application and in the past I did not do it because there were already so many demos already available. This time I finally gave in and started to play around with Firebase and Ionic2.

The demo shows the following

- Login with Username and Password
- Create Accounts with Username and Password
- Display List of information based on Security Rules in Firebase

###This Application was tested with the following configuration

```
Your system information:

Cordova CLI: 5.4.1
Gulp version:  CLI version 3.9.0
Gulp local:   Local version 3.9.1
Ionic Framework Version: 2.0.0-beta.4
Ionic CLI Version: 2.0.0-beta.24
Ionic App Lib Version: 2.0.0-beta.14
ios-deploy version: 1.8.3
ios-sim version: 5.0.6
OS: Mac OS X Yosemite
Node Version: v5.0.0
Xcode version: Xcode 7.2.1 Build version 7C1002
```

###Update NPM Configuration after checking out the project
```
npm install 
```
###Use your own Firebase Account
You will need to change the following code in `app.ts`
```
defaultFirebase('https://[YOUR-APP-NAME].firebaseio.com/'),
```
###Non AngularFire Example
Here is a link to a similar application using the Firebase REST APIs
[https://github.com/aaronksaunders/ionic2-firebase-sample](https://github.com/aaronksaunders/ionic2-firebase-sample)

##MORE IONIC2 SAMPLES HERE
- [https://github.com/aaronksaunders/ionic2-firebase-sample](https://github.com/aaronksaunders/ionic2-firebase-sample)
- [https://github.com/aaronksaunders/ionic2-angularfire-sample](https://github.com/aaronksaunders/ionic2-angularfire-sample)
- [https://github.com/aaronksaunders/kinvey-starter-ionic2](https://github.com/aaronksaunders/kinvey-starter-ionic2)
- [https://github.com/aaronksaunders/Ionic2-NutritionSample](https://github.com/aaronksaunders/Ionic2-NutritionSample)
