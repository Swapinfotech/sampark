import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { ApiService } from '../../providers/restapi.service';
import { SearchlistPage } from '../searchlist/searchlist';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  public searchKey;
  public responseData;
  public loading : any;
  constructor(public navCtrl: NavController,public apiservice:ApiService,public loadingCtrl:LoadingController) {

  }//constructor close......
allSearch(){

  let data = { "key": this.searchKey};
  console.log(data);
  this.loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  this.loading.present();
  this.apiservice.allSearch(data).then((result) => {
    this.responseData = result;
    if(this.responseData.status){
     console.log(this.responseData.data);
      let data1 = this.responseData.data;
      this.navCtrl.push(SearchlistPage,{ data:data1});
      this.loading.dismiss();       
    }else{
      this.loading.dismiss();

    }
  });
}

}
