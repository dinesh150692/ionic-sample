import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ReportsPage } from '../pages/reports/reports';
import { TabPage } from '../pages/tab/tab';
import { TransactionPage } from '../pages/transaction/transaction';

import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TransactionPage,
    ReportsPage,
    TabPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), 
    PipesModule,   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TransactionPage,
    ReportsPage,
    TabPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
