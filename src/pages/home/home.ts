import { Component } from '@angular/core';
import { NavController,Events ,LoadingController} from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ModalController, ViewController,NavParams,ToastController } from 'ionic-angular';
import { NewsdetailsPage } from '../newsdetails/newsdetails';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../providers/restapi.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public responseData;
  public banners = [];
  public notifications = [];
  public news = [] ;
  public loading;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public nativeStorage: Storage,public apiservice:ApiService, public toastCtrl:ToastController,public events: Events,public loadingCtrl:LoadingController ) {
   this.Dashboard();
   this.loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });

  }// constructor close.....
  ionViewDidLoad(){
    
    this.nativeStorage.get('userData').then((val)=>{
      let test = val;
      console.log(test);
      // let profile_image = test.profile_image;
      // console.log(profile_image);
      this.events.publish('user:created', test, Date.now());
  });
  }
  Dashboard(){
    // this.loading.present();
    this.apiservice.dashboard().then((result) => {
      this.responseData = result;
      if(this.responseData.status){
        
        this.banners = this.responseData.data.banner;
        this.notifications = this.responseData.data.notification;
        this.news = this.responseData.data.news;
        console.log(this.responseData.data.banner);
        console.log(this.notifications[0].notification_title); 
         this.loading.dismiss();      
      }else{
        this.loading.dismiss();   
      }
    });
  }

  presentNewsModal(ne) {
    let contactModal = this.modalCtrl.create(NewsdetailsPage,{ "news":ne });
    contactModal.present();
  }
 
 
  searchPage(){
     
  //   this.nativeStorage.get('userData').then((val)=>{
  //     let test = val;
  //     console.log(test);
  //     let profile_image = test.profile_image;
  //     console.log(profile_image);
  //     this.events.publish('user:created', profile_image, Date.now());
  // });

    this.navCtrl.push(SearchPage);
  }

}
