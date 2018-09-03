import { Component } from '@angular/core';
import { NavController,ToastController,ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';
// import { OTPPage } from '../otp/otp';
import { ApiService } from '../../providers/restapi.service';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { SmsauthPage } from '../smsauth/smsauth';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    responseData :any ='';
    first_name : string='';
    last_name : string = '';
    father_name:string = '';
    mother_name:string = '';
    user_email:any = '';
    password:any = '';
    contact_no:any ='';
    social_id:any = '';
    profile_image ='';
    members ='';
    photos : Array<string>;
    loading:any;
    foundRepos:any;
    public imgResponse;
    public imageSource;
    public message;
    

  constructor(public navCtrl: NavController,public api: ApiService,public toastCtrl:ToastController,private transfer: FileTransfer,private camera: Camera,public imagePicker: ImagePicker, public actionSheetCtrl: ActionSheetController, private file: File) {

    if(this.imageSource == ''|| this.imageSource == undefined){
      this.imageSource = "assets/imgs/No1.png";
     
    }

  }//constructor close
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.upload();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.openImagePicker();
          }
        }
      ]
    });
    actionSheet.present();
  }
 
  upload(){
    
    let options = {
    quality: 100
    };

    this.camera.getPicture(options).then((imageData) => {
     
      const fileTransfer: FileTransferObject = this.transfer.create();
      
      let options1: FileUploadOptions = {
        //    fileKey: 'file',
        //    fileName: 'name.jpg',
        chunkedMode: false,
        httpMethod:'POST',
        headers: {
          "Api-Key": "39b1cdc8a1099ce2bb9f0000e860ad8c"
        }
      }
     
      console.log(imageData);
     
      fileTransfer.upload(imageData, 'http://sampark.darshantraavels.com/wp-json/api/v1/upload_media', options1)
        .then((data) => {
        // success
          console.log(data);
          this.imgResponse = data.response;
          console.log(this.imgResponse);

          let img = JSON.parse(this.imgResponse);
          this.imageSource = img.data[0];
          this.profile_image = img.data[0];
          console.log(this.profile_image);

        }, (err) => {
          // error
          alert("error"+JSON.stringify(err));
        });
    });
  }

  openImagePicker(){
    let options = {
      maximumImagesCount: 1,
    }
   
    this.imagePicker.getPictures(options)
    .then((results) => {
     this.photos = results;
     let photo = this.photos[0];
      console.log(this.photos);
      const fileTransfer: FileTransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
        //    fileKey: 'file',
        //    fileName: 'name.jpg',
        chunkedMode: false,
        httpMethod:'POST',
        headers: {
          "Api-Key": "39b1cdc8a1099ce2bb9f0000e860ad8c"
        }
      }
     
      console.log(photo);
      fileTransfer.upload(photo,'http://sampark.darshantraavels.com/wp-json/api/v1/upload_media', options1)
        .then((data) => {
        // success
          console.log(data);
          this.imgResponse = data.response;
          console.log(this.imgResponse);

          let img = JSON.parse(this.imgResponse);
          this.imageSource = img.data[0];
          this.profile_image = img.data[0];

         
        }, (err) => {
          // error
          alert("error"+JSON.stringify(err));
        });
    }, (err) => { console.log(err) });
  }

  submitRegister(){ 
    console.log('hello');
    if(this.validateForm()){
      
      let userData = {"first_name" : this.first_name,"last_name" : this.last_name,"father_name":this.father_name,"mother_name":this.mother_name,"user_email" : this.user_email,"password": this.password,"contact_no" : this.contact_no, "profile_image":this.profile_image,"members":this.members};
        console.log(userData);
        this.api.registerUser(userData).then((result) => {
        this.responseData = result
        console.log(this.responseData);
        if(this.responseData.status){
        let toast = this.toastCtrl.create({
        message: 'User registered successfully ! please verify mobile no. with OTP ',
        duration: 3000,
        position: 'top'
        });
        toast.present();
        this.navCtrl.setRoot(SmsauthPage);
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
   
  }
 cancelRegister(){
  this.navCtrl.setRoot(this.navCtrl.getActive().component);
 }

  backToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  validateForm(){
    let response=true
      
    if(this.first_name ==''){
      this.message='Please enter first name.'
      this.showAlert();
      response=false
    }else if(this.last_name == ''){
      this.message='Please enter last name.'
      this.showAlert();
      response=false
    }else if(this.user_email == ''){
      this.message='Please enter user email.'
      this.showAlert();
      response=false
    }else if(this.password == ''){
      this.message='Please enter Password.'
      this.showAlert();
      response=false
    }
    else if(this.contact_no == ''){
      this.message='Please enter mobile no.'
      this.showAlert();
      response=false
    }
    else if(this.profile_image == ''){
      this.message='Please add profile image.'
      this.showAlert();
      response=false
    }
    return response;
  }
  
  showAlert(){
    let toast = this.toastCtrl.create({
      message:this.message,
      duration: 5000,
      position: 'top'
    });
    toast.present();
  }
}
