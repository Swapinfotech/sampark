import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import { DetailsPage } from '../details/details';
@Component({
  selector: 'page-searchlist',
  templateUrl: 'searchlist.html'
})
export class SearchlistPage {
 public list;
  constructor(public navCtrl: NavController,public navparams: NavParams) {
    // this.list = navparams.get('data');
    // console.log(this.list);
  }//constructor close.....

  ionViewDidLoad() {
    this.list = this.navparams.get('data');
    console.log(this.list);
  }
  searchProfile(searchProfile){
    this.navCtrl.push(DetailsPage,{ 'searchprofile':searchProfile});
  }
}
