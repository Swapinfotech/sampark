import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController,ToastController,ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-addphone',
  templateUrl: 'addphone.html'
})
export class AddphonePage {
  details: string = "personal";
  public contact_number;
  public contact_type;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private toastCtrl: ToastController,public viewCtrl: ViewController,public navParams: NavParams) {
    let phone = navParams.get("phone");
    console.log(phone+"hello");
    if(phone != undefined){
    this.contact_number = phone.contact_number;
    this.contact_type = phone.contact_type;
    }else{

    }
     } // constructor close..
    submit(){
        let data = { "contact_number":this.contact_number,"contact_type":this.contact_type};
       console.log(data); 
      this.viewCtrl.dismiss(data);
    }
    cancel(){
        this.viewCtrl.dismiss();
    }
}
