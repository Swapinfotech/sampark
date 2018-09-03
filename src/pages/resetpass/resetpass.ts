import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController,ToastController } from 'ionic-angular';
import { ApiService } from '../../providers/restapi.service';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-resetpass',
  templateUrl: 'resetpass.html'
})
export class ResetpassPage {
  public email = '';
  public pwd = '';
  responseData ;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private toastCtrl: ToastController, public api :ApiService) {
  } // constructor close..
 
  resetPass(){
    let data ={"email":this.email,"pwd":this.pwd };
    console.log(data);
    this.api.resetPass(data).then((result) => {
     this.responseData = result
     console.log(this.responseData.status);
      if(this.responseData.status){
        console.log(this.responseData.data);
      }else{
        let toast = this.toastCtrl.create({
          message: this.responseData.message,
          duration: 5000,
          position: 'top'
        });
        toast.present();
      }
    });
   this.navCtrl.setRoot(HomePage);
 }
}
