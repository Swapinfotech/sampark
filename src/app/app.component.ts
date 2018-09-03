import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SearchPage } from '../pages/search/search';
import { UpdateprofilePage } from '../pages/updateprofile/updateprofile';
import { FeedbackPage } from '../pages/feedback/feedback';
import { LogoutPage } from '../pages/logout/logout';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  public image;
  pages: Array<{title: string, component: any, icon:string}>;
  public first_name;
  public user_email;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public events:Events,private push: Push) {
    this.initializeApp();
    this.events.subscribe('user:created', (user, time) => {
      this.image = user.profile_image;
      this.first_name = user.first_name;
      this.user_email = user.user_email;
      console.log('event'+user);
     });
     if(this.image == ''|| this.image == undefined){
       this.image = "assets/imgs/No1.png";
      }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage,icon:"ios-home-outline" },
      { title: 'Search Profile', component: SearchPage,icon:"ios-search-outline" },
      { title: 'Update Profile', component: UpdateprofilePage,icon:"ios-sync-outline" },
      { title: 'B&A Reminders', component: ListPage,icon:"ios-calendar-outline" },
      { title: 'Feedback', component: FeedbackPage,icon:"ios-list-box-outline" },
      { title: 'Logout', component: LogoutPage,icon:"ios-log-out-outline" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(()=>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushSetup();
    },10000);
    });
  }
  pushSetup(){
    const options: PushOptions = {
      android: {
        senderID:'954217527630'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
