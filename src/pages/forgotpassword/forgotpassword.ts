import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController,ToastController } from 'ionic-angular';
import { ApiService } from '../../providers/restapi.service';
import { ResetpassPage } from '../resetpass/resetpass';


@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotPasswordPage {
  public email = '';
  responseData ;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private toastCtrl: ToastController, public api :ApiService) {
  } // constructor close..
 
  forgotPass(){
    let data ={"email":this.email };
    console.log(data);
    this.api.forgotPass(data).then((result) => {
     this.responseData = result
     console.log(this.responseData.status);
      if(this.responseData.status){
        console.log(this.responseData.data);
        this.navCtrl.push(ResetpassPage);
      }else{
        let toast = this.toastCtrl.create({
          message: this.responseData.message,
          duration: 5000,
          position: 'top'
        });
        toast.present();
      }
    });
   // this.navCtrl.setRoot(HomePage);
  }
}
