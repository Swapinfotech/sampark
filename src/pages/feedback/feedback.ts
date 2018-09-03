import { Component } from '@angular/core';
import { NavController,ToastController,LoadingController } from 'ionic-angular';
import { ApiService } from '../../providers/restapi.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  public subject: any;
  public remarks:any ;
  public responseData:any;
  public user_id: number;
  public loading : any;
  constructor(public navCtrl: NavController,public apiservice:ApiService,public nativeStorage: Storage,public toastCtrl:ToastController, public loadingCtrl:LoadingController) {

  //   this.nativeStorage.get('userData').then((val)=>{
  //     this.user_id = val;
  //     console.log(this.user_id);
  // });

  }// constructor close......
  ionViewDidLoad() {
    this.nativeStorage.get('userData').then((val)=>{
      this.user_id = val.id;
      console.log(this.user_id);
  });
  }

  feedbackSubmit(){
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    this.loading.present();
    let data = { "subject":this.subject,"remarks":this.remarks, "user_id":this.user_id,"send_file":""}
    console.log(data);
    this.apiservice.feedback(data).then((result) => {
      this.responseData = result;
      if(this.responseData.status){
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Feedback Submitted Successfully',
          duration: 5000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }else{
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error! Please send feedback again.',
          duration: 5000,
          position: 'top'
        });
        toast.present();
       
      }
    });

  }
  cancelSubmit(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
