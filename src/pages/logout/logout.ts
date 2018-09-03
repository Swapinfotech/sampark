import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {
  
  constructor(public navCtrl: NavController, public nativeStorage: Storage) {
    this.nativeStorage.remove('userData');
    this.navCtrl.setRoot(LoginPage);
  }

}
