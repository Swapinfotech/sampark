import { Injectable } from "@angular/core";
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ApiService {
  loading: any;
   constructor(public http: Http,public loadingCtrl:LoadingController) {
        console.log('hello provider'); 
        this.loading = this.loadingCtrl.create({
          content: 'Please Wait...'
        });
       
   }
   apiUrl = 'http://sampark.darshantraavels.com/wp-json/api/v1';
   
    registerUser(data) {
        return new Promise((resolve, reject) => {
            this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
           let  data1 =  JSON.stringify(data)
           
          this.http.post(this.apiUrl+'/add_user',data1 ,{headers:headers})
           .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }

      loginUser(data) {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
             let data1 = JSON.stringify(data);
          this.http.post(this.apiUrl+'/authenticate',data1 ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }
      
      dashboard() {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
            this.http.get(this.apiUrl+'/dashboard' ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }
     
      allSearch(data) {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
             let data1 = JSON.stringify(data);
          this.http.post(this.apiUrl+'/search',data1 ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }

      feedback(data) {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
             let data1 = JSON.stringify(data);
            this.http.post(this.apiUrl+'/user_feedback',data1 ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }

      update_user(data) {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
             let data1 = JSON.stringify(data);
            this.http.post(this.apiUrl+'/update_user',data1 ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }

      state(data) {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
             let data1 = JSON.stringify(data);
            this.http.post(this.apiUrl+'/stateslist',data1 ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }
      country(data) {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
             let data1 = JSON.stringify(data);
            this.http.post(this.apiUrl+'/countrieslist',data1 ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }

      smsAuth(data) {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
             let data1 = JSON.stringify(data);
            this.http.post(this.apiUrl+'/sms_authenticate',data1 ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }

      forgotPass(data) {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
             let data1 = JSON.stringify(data);
            this.http.post(this.apiUrl+'/forgot_password',data1 ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }

      resetPass(data) {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
             let data1 = JSON.stringify(data);
            this.http.post(this.apiUrl+'/forgot_password',data1 ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }

      eventList() {
        return new Promise((resolve, reject) => {
          this.loading.present();
            let headers = new Headers;
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Api-Key', '39b1cdc8a1099ce2bb9f0000e860ad8c');
            //  let data1 = JSON.stringify(data);
            this.http.get(this.apiUrl+'/event_list' ,{headers:headers})
            .map(res => res.json())
            .subscribe(res => {
              this.loading.dismiss();
              resolve(res);
            }, (err) => {
              this.loading.dismiss();
              reject(err);
            });
        });
      }
    }

  

   
 
