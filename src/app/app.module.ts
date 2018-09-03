import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ApiService } from '../providers/restapi.service';
import { ForgotPasswordPage } from '../pages/forgotpassword/forgotpassword';
import { HttpModule,Headers } from '@angular/http';
import { FeedbackPage } from '../pages/feedback/feedback';
import { SearchPage } from '../pages/search/search';
import { UpdateprofilePage } from '../pages/updateprofile/updateprofile';
import { LogoutPage } from '../pages/logout/logout';
import { NewsdetailsPage } from '../pages/newsdetails/newsdetails';
import { DetailsPage } from '../pages/details/details';
import { AddphonePage } from '../pages/addphone/addphone';
import { AddmemberPage } from '../pages/addmember/addmember';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { SearchlistPage } from '../pages/searchlist/searchlist';
import { SmsauthPage } from '../pages/smsauth/smsauth';
import { ResetpassPage } from '../pages/resetpass/resetpass';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,SmsauthPage,
    HomePage,NewsdetailsPage,DetailsPage,AddphonePage,AddmemberPage,SearchlistPage,ResetpassPage,
    ListPage,LoginPage,RegisterPage,ForgotPasswordPage,FeedbackPage,SearchPage,UpdateprofilePage,LogoutPage
  ],
  imports: [
    BrowserModule,HttpModule,IonicStorageModule.forRoot(), IonicImageViewerModule,
    IonicModule.forRoot(MyApp,{mode:'ios'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,NewsdetailsPage,DetailsPage,AddphonePage,AddmemberPage,SearchlistPage,SmsauthPage,ResetpassPage,
    HomePage,LoginPage,RegisterPage,ForgotPasswordPage,FeedbackPage,SearchPage,UpdateprofilePage,
    ListPage,LogoutPage
  ],
  providers: [
    StatusBar,ApiService,Camera,FileTransfer,FileTransferObject,File,
    SplashScreen,ImagePicker,Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
