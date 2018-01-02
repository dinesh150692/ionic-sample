import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { Network } from '@ionic-native/network';

import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';

import { Helper } from '../helpers/helper';
import { CustomValidator } from '../helpers/validator';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { RegisterPage } from '../pages/register/register';
import { BusinessDetailsPage } from '../pages/business-details/business-details';
import { SuccessPage } from '../pages/success/success';
import { DocumentsPage} from '../pages/documents/documents';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MenuPage,
    RegisterPage,
    BusinessDetailsPage,
    SuccessPage,
    DocumentsPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: true
    }), 
    PipesModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    RegisterPage,
    BusinessDetailsPage,
    SuccessPage,
    DocumentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    Camera,
    FilePath,
    Network,
    Helper,
    CustomValidator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
