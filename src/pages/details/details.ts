import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  details: string = "personal";
  public searchProfile = [];
  constructor(public navCtrl: NavController,public navparams: NavParams) {
    this.searchProfile = navparams.get('searchprofile');
    console.log(this.searchProfile);
  }// constructor close.....

}
