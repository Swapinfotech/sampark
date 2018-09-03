import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { AlertController,ToastController,ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-newsdetails',
  templateUrl: 'newsdetails.html'
})
export class NewsdetailsPage {
  public user_name = '';
  responseData ;
  public news;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private toastCtrl: ToastController,public viewCtrl: ViewController,public navParams: NavParams ) {

    this.news  = this.navParams.get('news');
  } // constructor close..
 cancel(){
   this.viewCtrl.dismiss();
 }
 
}
