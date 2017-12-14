import { Component, } from '@angular/core';
import { IonicPage, NavController , NavParams} from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fetchTransactionsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionPage');
  }
  fetchTransactionsList() {
    this.transactionsList = [
      { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 10, 'date': '2017-12-10T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 23400, 'date': '2017-11-13T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 500, 'date': '2017-10-13T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 600, 'date': '2014-09-13T23:30:52.123Z'},
      { 'mobileNumber':'9999999999','amount': 122, 'date': '2016-09-13T23:30:52.123Z'}
    ];
  }
}
