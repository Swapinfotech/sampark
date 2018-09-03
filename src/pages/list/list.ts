import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { ApiService } from '../../providers/restapi.service';
// import { KeyvaluePipe } from '../../pipes/keyvalue/keyvalue';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  public responseData;
  public loading : any;
  public list = [];
  public dates = [];
  public dataList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiservice:ApiService,public loadingCtrl:LoadingController) {
   console.log("hello");

  }// contructor close.....
 
  ionViewDidLoad(){
    console.log("hi");
    this.bitrhday();
  }

  bitrhday(){

    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    this.loading.present();
    this.apiservice.eventList().then((result) => {
      this.responseData = result;
      if(this.responseData.status){
       console.log(this.responseData.data);
        this.list = this.responseData.data;
        // console.log(JSON.stringify(this.list));
        // this.dataList =  Object.values(this.list);

        this.dates = Object.keys(this.list)
        console.log(this.dates);

        // this.navCtrl.push(DetailsPage,);
        this.loading.dismiss();       
      }else{
        this.loading.dismiss();
  
      }
    });
  }
 
  details(data){
    this.navCtrl.push(DetailsPage,{ 'searchprofile':data});
  }
}
