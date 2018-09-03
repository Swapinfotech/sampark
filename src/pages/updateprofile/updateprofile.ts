import { Component } from '@angular/core';
import { NavController,ToastController,LoadingController,ActionSheetController  } from 'ionic-angular';
import { ModalController, ViewController,NavParams } from 'ionic-angular';
import { AddphonePage } from '../addphone/addphone';
import { AddmemberPage } from '../addmember/addmember';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../providers/restapi.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-updateprofile',
  templateUrl: 'updateprofile.html'
})
export class UpdateprofilePage {
  details: string = "personal";
  public phone_list = [];
  public member_list = [];
  public state_list = [];
  public country_list = [];
  public userInfo = [];
  public imgResponse;
  public imageSource;
  public profile_image;
  public photos;
  public first_name :string;
  public last_name :string;
  public gender ;
  public marital_status;
  public father_name;
  public mother_name;
  public date_of_birth;
  public date_of_anniversary;
  public user_email;
  public permanent_address;
  public permanent_city;
  public permanent_state;
  public permanent_country;
  public permanent_pincode;
  public profile_Cast;
  public profile_blood_group;
  public education;
  public hobbies;
  public firm_name;
  public firm_type;
  public firm_contact1;
  public firm_contact2;
  public firm_contact3;
  public firm_country;
  public firm_state;
  public firm_city;
  public firm_address;
  public firm_pincode;
  public firm_email_id;
  public firm_website;
  public firm_logo;
  public qr_code_image;
  public responseData;
  public id;
 
  
   constructor(public navCtrl: NavController,public modalCtrl: ModalController,public apiservice:ApiService,public nativeStorage: Storage,public toastCtrl:ToastController, public loadingCtrl:LoadingController,private transfer: FileTransfer,private camera: Camera,public imagePicker: ImagePicker, public actionSheetCtrl: ActionSheetController, private file: File) {
    this.statelist();
    this.countrylist();
  }// constructor close....
  ionViewDidLoad() {
    this.nativeStorage.get('userData').then((val)=>{
      this.userInfo = val;
      this.profile_image = val.profile_image;
      console.log(this.userInfo);
      
  this.first_name = val.first_name;
  this.last_name = val.last_name;
  this.gender = val.gender;
  this.marital_status = val.marital_status;
  this.father_name = val.father_name;
  this.mother_name = val.mother_name;
  this.date_of_birth = val.date_of_birth;
 
  this.date_of_anniversary = val.date_of_anniversary;
  this.user_email = val.user_email;
  this.permanent_address = val.permanent_address;
  this.permanent_city = val.permanent_city;
  this.permanent_state = val.permanent_state;
  this.permanent_country = val.permanent_country;
  this.permanent_pincode = val.permanent_pincode;
  this.profile_Cast = val.profile_Cast;
  this.profile_blood_group = val.profile_blood_group;
  this.education = val.education;
  this.hobbies = val.hobbies;
  this.firm_name = val.firm_name;
  this.firm_type = val.firm_type;
  this.firm_contact1 = val.firm_contact1;
  this.firm_contact2 = val.firm_contact2;
  this.firm_contact3 = val.firm_contact3;
  this.firm_country = val.firm_country;
  this.firm_state = val.firm_state; 
  this.firm_city = val.firm_city;
  this.firm_address = val.firm_address;
  this.firm_pincode = val.firm_pincode;
   this.firm_email_id = val.firm_email_id;
   this.firm_website = val.firm_website;
   this.firm_logo = val.firm_logo;
   this.qr_code_image = val.qr_code_image;
  this.id = val.id;
  this.phone_list = val.contact_no;
      // alert(this.phone_list);
  this.member_list = val.members;
 // alert(this.member_list);    
  });
  console.log(this.firm_logo);
  console.log(this.qr_code_image);
  if(this.firm_logo == ''|| this.firm_logo == undefined){
    console.log("hello");
    this.firm_logo = "assets/imgs/No1.png";
  }
  if(this.qr_code_image == ''|| this.qr_code_image == undefined){
    this.qr_code_image = "assets/imgs/No1.png";
}
  }// load view close...

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
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
     // alert(imageData);
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
          // this.imageSource = img.data[0];
          this.profile_image = img.data[0];
          console.log(this.profile_image);

        }, (err) => {
          // error
          // alert("error"+JSON.stringify(err));
          console.log(err);
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
          // this.imageSource = img.data[0];
          this.profile_image = img.data[0];

         
        }, (err) => {
          // error
          // alert("error"+JSON.stringify(err));
        });
    }, (err) => { console.log(err) });
  }


  presentPhoneModal() {
    let contactModal = this.modalCtrl.create(AddphonePage);

    contactModal.onDidDismiss(data => {
      if(data != undefined){
       this.phone_list.push(data);
       console.log("memberData"+data);
      }
    });
    contactModal.present();
  }
  editPhone(phone){

    let contactModal = this.modalCtrl.create(AddphonePage,{"phone":phone});
      
    contactModal.onDidDismiss(data => {
      if(data != undefined ){
        let index = this.phone_list.indexOf(phone);
        if(index > -1){
          this.phone_list.splice(index, 1);
        }

        this.phone_list.push(data);
        console.log(data);
      }
    });
    contactModal.present();
  }
  removePhone(phone){
    let index = this.phone_list.indexOf(phone);
    if(index > -1){
      this.phone_list.splice(index, 1);
    }

  }

  presentMemberModal() {
    let contactModal = this.modalCtrl.create(AddmemberPage);

    contactModal.onDidDismiss(data => {
      if(data != undefined){
        this.member_list.push(data);
        console.log(data);
      }
    });
    contactModal.present();
  }
 
  editMember(member){

    let contactModal = this.modalCtrl.create(AddmemberPage,{"member":member});
      
    contactModal.onDidDismiss(data => {
      if(data != undefined){
        let index = this.member_list.indexOf(member);
        if(index > -1){
          this.member_list.splice(index, 1);
        }

        this.member_list.push(data);
        console.log(data);
      }
    });
    contactModal.present();
  }
  removeMember(member){
    console.log("remove"+ member );
    let index = this.member_list.indexOf(member);
    if(index > -1){
      this.member_list.splice(index, 1);
    }

  }

  validateLogin(){
    let data ={	"id" : this.id,
    "first_name" : this.first_name,
    "last_name" : this.last_name,
    "gender" : this.gender,
    "marital_status" : this.marital_status,
    "father_name" : this.father_name,
    "mother_name" : this.mother_name,
    "date_of_birth" : this.date_of_birth,
    "date_of_anniversary" : this.date_of_anniversary,
    "permanent_address" : this.permanent_address,
    "permanent_country" : this.permanent_country,
    "permanent_state" : this.permanent_state,
    "permanent_city" : this.permanent_city,
    "permanent_pincode" : this.permanent_pincode,
    "temporary_address" : "",
    "temporary_country" : "",
    "temporary_state" : "",
    "temporary_city" : "",
    "temporary_pincode" : "",
    "achievement" : "",
    "other_organisation_membership" :"",
    "profile_image" : this.profile_image,
    "profile_Cast" : this.profile_Cast,
    "profile_blood_group" : this.profile_blood_group,
    "status_message" : "",
    "profile_website" : "",
    "qr_code_image" : this.qr_code_image,
    "education" : this.education,
    "hobbies" : this.hobbies,
    "firm_type" : this.firm_type,
    "firm_name" : this.firm_name,
    "firm_contact1" : this.firm_contact1,
    "firm_contact2" : this.firm_contact2,
    "firm_contact3" : this.firm_contact3,
    "firm_logo" : this.firm_logo,
    "firm_country" : this.firm_country,
    "firm_state" : this.firm_state,
    "firm_city" : this.firm_city,
    "firm_address" : this.firm_address,
    "firm_pincode" : this.firm_pincode,
    "firm_email_id" : this.firm_email_id,
    "firm_website" : this.firm_website,
    "activation_code" : "",
    "user_relation" :"",
    "parent_id" : "",
    "member_list" : this.member_list,
    "contact_no_list" : this.phone_list};
    console.log(data);
    
    this.apiservice.update_user(data).then((result) => {
      this.responseData = result
      console.log(this.responseData.status);
      if(this.responseData.status){
        console.log(this.responseData.data);
        this.nativeStorage.remove('userdata');
        this.nativeStorage.set('userData', this.responseData.data);
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
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

  statelist(){
    let data = {"key":""}
    this.apiservice.state(data).then((result) => {
      this.responseData = result
      console.log(this.responseData.status);
      if(this.responseData.status){
        console.log(this.responseData.data);
        this.state_list = this.responseData.data
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

  countrylist(){
    let data = {"key":""}
    this.apiservice.country(data).then((result) => {
      this.responseData = result
      console.log(this.responseData.status);
      if(this.responseData.status){
        console.log(this.responseData.data);
        this.country_list = this.responseData.data
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


  presentActionSheet1() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.upload1();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.openImagePicker1();
          }
        }
      ]
    });
    actionSheet.present();
  }
 
  upload1(){
    
    let options = {
    quality: 100
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
     // alert(imageData);
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
          // this.imageSource = img.data[0];
          this.firm_logo = img.data[0];
          console.log(this.firm_logo);

        }, (err) => {
          // error
          // alert("error"+JSON.stringify(err));
          console.log(err);
        });
    });
  }

  openImagePicker1(){
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
          // this.imageSource = img.data[0];
          this.firm_logo = img.data[0];

         
        }, (err) => {
          // error
          // alert("error"+JSON.stringify(err));
        });
    }, (err) => { console.log(err) });
  }

  presentActionSheet2() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.upload2();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.openImagePicker2();
          }
        }
      ]
    });
    actionSheet.present();
  }
 
  upload2(){
    
    let options = {
    quality: 100
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
     // alert(imageData);
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
          // this.imageSource = img.data[0];
          this.qr_code_image = img.data[0];
          console.log(this.qr_code_image);

        }, (err) => {
          // error
          // alert("error"+JSON.stringify(err));
          console.log(err);
        });
    });
  }

  openImagePicker2(){
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
          // console.log(data);
          this.imgResponse = data.response;
          console.log(this.imgResponse);

          let img = JSON.parse(this.imgResponse);
          // this.imageSource = img.data[0];
          this.qr_code_image = img.data[0];

         
        }, (err) => {
          // error
          // alert("error"+JSON.stringify(err));
        });
    }, (err) => { console.log(err) });
  }
cancel(){

this.firm_logo = "assets/imgs/No1.png";

}
cancel1(){
  this.qr_code_image = "assets/imgs/No1.png";
}

}
// if(this.image == ''|| this.image == undefined){
//   this.image = "assets/imgs/No1.png";
 
// }