
import { Component } from '@angular/core';
import { NavController,ToastController,LoadingController,AlertController,Events,MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { ForgotPasswordPage } from '../forgotpassword/forgotpassword';
import { RegisterPage } from '../register/register';
import { ApiService } from '../../providers/restapi.service';
import { SmsauthPage } from '../smsauth/smsauth';
import { ResetpassPage } from '../resetpass/resetpass';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading:any;
  
  public user_name = '';
  public user_pass = '';
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  public responseData;
  private authForm:FormGroup;
  public device_token1 = '';
  public device_token2 = '';
  public device_token3 = '';
  


  constructor(public alertCtrl: AlertController,public navCtrl: NavController,private formBuilder: FormBuilder,public events: Events,
    public nativeStorage: Storage,public toastCtrl:ToastController, public loadingCtrl:LoadingController, public menuCtrl:MenuController,public apiservice:ApiService ) {
     
    this.navCtrl = navCtrl;
    this.authForm = formBuilder.group({
        user_name: ['', Validators.compose([Validators.required,/* Validators.pattern('^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,4}$'),*/ ])],
        user_pass: ['', Validators.compose([Validators.required, Validators.minLength(4)/*,Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}")*/])]
    });
    

   
  } // constructor close......

  // hideShowPassword() {
  //   this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  //   this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  // }
  validateLogin(){
    let data ={"user_name":this.user_name,"user_pass":this.user_pass,"device_token1":this.device_token1,"device_token2":this.device_token2,"device_token3":this.device_token3 };
    console.log(data);
    this.apiservice.loginUser(data).then((result) => {
      this.responseData = result
      console.log(result);
      console.log(this.responseData.status);
      if(this.responseData.status){
        console.log(this.responseData.data);
        this.nativeStorage.set('userData', this.responseData.data);
        this.navCtrl.setRoot(HomePage);
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
  forgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }
  registerPage(){
    this.navCtrl.push(RegisterPage);
  }
  smsAuth(){
    this.navCtrl.push(SmsauthPage);
  }
}
