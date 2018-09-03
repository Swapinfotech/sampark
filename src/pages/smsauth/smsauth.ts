
import { Component } from '@angular/core';
import { NavController,ToastController,LoadingController,AlertController,Events,MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../providers/restapi.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-smsauth',
  templateUrl: 'smsauth.html'
})
export class SmsauthPage {

  loading:any;
  
  public user_name;
  public otp;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  public responseData;
  private authForm:FormGroup;
 
  

  
  constructor(public alertCtrl: AlertController,public navCtrl: NavController,private formBuilder: FormBuilder,public events: Events,
    public nativeStorage: Storage,public toastCtrl:ToastController, public loadingCtrl:LoadingController, public menuCtrl:MenuController,public apiservice:ApiService ) {
     
    this.navCtrl = navCtrl;
    this.authForm = formBuilder.group({
        user_name: ['', Validators.compose([Validators.required,/* Validators.pattern('^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,4}$'),*/ ])],
        otp: ['', Validators.compose([Validators.required, Validators.minLength(4)/*,Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}")*/])]
    });
    

   
  } // constructor close......

  validate_sms(){
    let data = { "user_name":this.user_name,"otp":this.otp};
    console.log(data);
    
    this.apiservice.smsAuth(data).then((result) => {
      this.responseData = result
      console.log(this.responseData.status);
      if(this.responseData.status){
        console.log(this.responseData.data);
       
        this.navCtrl.setRoot(LoginPage);
      }else{
        let toast = this.toastCtrl.create({
          message: this.responseData.message,
          duration: 5000,
          position: 'top'
          });
          toast.present();
      }
    });
  }

  // hideShowPassword() {
  //   this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  //   this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  // }
 
  
  backToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
