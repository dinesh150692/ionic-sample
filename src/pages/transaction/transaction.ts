import { Component, } from '@angular/core';
import { IonicPage, NavController , NavParams, LoadingController} from 'ionic-angular';
/**
 * Generated class for the TransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  
  transactionsList: any = [];
  loadingPage: boolean = true;
  loader: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.fetchLoader();
    this.transactionsList = [
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 10, 'date': '2017-12-10T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 23400, 'date': '2017-11-13T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 500, 'date': '2017-10-13T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 600, 'date': '2014-09-13T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 122, 'date': '2016-09-13T23:30:52.123Z'}
    ];
    this.fetchTransactionsList();
  }

  fetchLoader(){
    this.loadingPage = true;
    console.log(this.loadingPage);
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="cssload-container">
          <div class="cssload-whirlpool"></div>
        </div>
      `,
    });
    this.loader.present();
  }

  
  fetchTransactionsList() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.transactionsList = [
        { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z'},
        { 'mobileNumber':'9999999999','amount': 10, 'date': '2017-12-10T23:30:52.123Z'},
        { 'mobileNumber':'9999999999','amount': 23400, 'date': '2017-11-13T23:30:52.123Z'},
        { 'mobileNumber':'9999999999','amount': 500, 'date': '2017-10-13T23:30:52.123Z'},
        { 'mobileNumber':'9999999999','amount': 600, 'date': '2014-09-13T23:30:52.123Z'},
        { 'mobileNumber':'9999999999','amount': 122, 'date': '2016-09-13T23:30:52.123Z'},
        { 'mobileNumber':'9999999999','amount': 222, 'date': '2016-09-13T23:30:52.123Z'},
        { 'mobileNumber':'9999999999','amount': 342, 'date': '2016-09-13T23:30:52.123Z'},
        { 'mobileNumber':'9999999999','amount': 542, 'date': '2016-09-13T23:30:52.123Z'},
        
      ];
      this.fetchTransactionsList();
      refresher.complete();
    }, 2000);
  }
}
