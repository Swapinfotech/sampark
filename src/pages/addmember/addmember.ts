import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController,ToastController,ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-addmember',
  templateUrl: 'addmember.html'
})
export class AddmemberPage {
  public first_name;
  public last_name;
  public user_relation;
  public gender;
  public merital_status;
  public father_name;
  public mother_name;
  public date_of_birth;
  public date_of_anniversary;
  public user_email;
  public permanent_address;
  public personal_landline_no;
  public personal_contact_no;
  public permanent_city;
  public permanent_state;
  public permanent_country;
  public permanent_pincode;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private toastCtrl: ToastController,public viewCtrl: ViewController,public navParams: NavParams) {
    let member = navParams.get("member");
    console.log(member);
    if(member != undefined){
    this.first_name = member.first_name;
    this.last_name = member.last_name;
    this.user_relation = member.user_relation;
    this.gender = member.gender;
    this.merital_status = member.merital_status;
    this.father_name = member.father_name;
    this.mother_name = member.mother_name;
    this.date_of_birth = member.date_of_birth;
    this.date_of_anniversary = member.date_of_anniversary;
    this.user_email = member.user_email;
    this.permanent_address = member.permanent_address;
    // this.personal_landline_no = member.personal_landline_no;
    // this.personal_contact_no = member.personal_contact_no;
    this.permanent_city = member.permanent_city;
    this.permanent_state = member.permanent_state;
    this.permanent_country = member.permanent_country;
    this.permanent_pincode = member.permanent_pincode;
    }else{
      
    }
     } // constructor close..
    submit(){
        let data = { "first_name":this.first_name,"last_name":this.last_name,"user_relation":this.user_relation,"gender":this.gender,"merital_status":this.merital_status,"father_name":this.father_name,"mother_name":this.mother_name,"date_of_birth":this.date_of_birth,"date_of_anniversary":this.date_of_anniversary,"user_email":this.user_email,"permanent_address":this.permanent_address,"permanent_city":this.permanent_city,"permanent_state":this.permanent_state,"permanent_country":this.permanent_country,"permanent_pincode":this.permanent_pincode};
       console.log(data); 
      this.viewCtrl.dismiss(data);
    }
    cancel(){
        this.viewCtrl.dismiss();
    }
}
