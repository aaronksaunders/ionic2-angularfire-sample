# Integrating Firebase with AngularFire2 into AngularJS & Ionic2

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

###NPM Configuration
```
npm install angularfire2 --save-dev

npm install firebase --save-dev

typings install angularfire2 --save --ambient ( nothing was available at the time of creating this post )

typings install firebase --save --ambient
```
###Non AngularFire Example
Here is a link to a similar application using the Firebase REST APIs
[https://github.com/aaronksaunders/ionic2-firebase-sample](https://github.com/aaronksaunders/ionic2-firebase-sample)

##MORE IONIC2 SAMPLES HERE
- [https://github.com/aaronksaunders/ionic2-firebase-sample](https://github.com/aaronksaunders/ionic2-firebase-sample)
- [https://github.com/aaronksaunders/ionic2-angularfire-sample](https://github.com/aaronksaunders/ionic2-angularfire-sample)
- [https://github.com/aaronksaunders/kinvey-starter-ionic2](https://github.com/aaronksaunders/kinvey-starter-ionic2)
- [https://github.com/aaronksaunders/Ionic2-NutritionSample](https://github.com/aaronksaunders/Ionic2-NutritionSample)
