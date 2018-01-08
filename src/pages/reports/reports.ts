import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';


import { Helper } from '../../helpers/helper';
//import { LoginPage } from '../login/login';
/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
class Segment{
  stores: any = [];
  instruments: any = [];
  labels: any;
  data: any;
  chart: any = null;
}
@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
  loadingPage: boolean = true;
  endDate: any;
  dayCount: any = 10;
  startDate: any;
  loader: any;
  transaction: any;
  amount: any;
  segmentSelection: string = 'Amount';
  chartOptions: any;
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private helper: Helper) {
      this.startDate = this.helper.getDateFormat(this.dayCount);
      this.endDate = this.helper.getDateFormat();
      this.transaction = new Segment();
      this.amount = new Segment();
      this.transaction.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      this.transaction.data = [6, 9, 8, 1, 6, 5, 4];
      this.amount.labels =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      this.amount.data = [65, 59, 80, 81, 56, 55, 40];
      this.transaction.stores = [
        {name:'Koramangala', value:100},
        {name:'JP Nagar', value:100},
        {name:'Jaya Nagar', value:100},
        {name:'Electronic City', value:100},
        {name:'Hebbal', value:100},
        {name:'Old Airport Road', value:100},
        {name:'Bannerghatta Road', value:100},
        {name:'BTM', value:100}
      ];
      this.transaction.instruments = [];
      this.amount.stores = [
        {name:'Koramangala', value:100},
        {name:'JP Nagar', value:100},
        {name:'Jaya Nagar', value:100},
        {name:'Electronic City', value:100},
        {name:'Hebbal', value:100},
        {name:'Old Airport Road', value:100},
        {name:'Bannerghatta Road', value:100},
        {name:'BTM', value:100}
      ];
      this.amount.instruments = [
        {name:'CC', value:100},
        {name:'DC', value:100},
        {name:'POS', value:100},
        {name:'Cash', value:100}
      ]; 
    }
  
  ionViewDidLoad() { 
    this.fetchLoader();
  }

  finishLoading(event){
    if(event){
      this.loader.dismiss();
      this.loader.onDidDismiss(() => {
        setTimeout(()=> {
          this.loadingPage = false;
        },100); 
      });
    }
  }
  
  fetchFilter() {
    
    let alert = this.alertCtrl.create({
      title: 'Report Filter',
      message: "Select the start and end date for filtering",
      inputs: [
        {
          name: 'Start Date',
          placeholder: 'date',
          type:"date",
          value: this.startDate,
          max: this.helper.getDateFormat(1),
        },
        {
          name: 'End Date',
          placeholder: 'date',
          type:"date",
          value: this.endDate,
          max: this.endDate
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Filter',
          handler: data => {
            if (data) {
            this.fetchNewData(data);
            }
          }
        }
      ]
    });
    alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }
  
  fetchLoader(){
    this.loadingPage = true;
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

  fetchNewData(data: any){
    this.fetchLoader();
    this.transaction.labels = ['A', 'B', 'C', 'D', 'E'];
    this.transaction.data = [1, 2, 3, 4, 1]; 
    this.transaction.stores = [];
    this.transaction.instruments = [];
    this.amount.stores = [];
    this.amount.instruments = [];
    this.amount.labels =  [];
    this.amount.data = [];
    setTimeout(() => {
      this.finishLoading(true);
    },  1000);
  }  
  
  // logout(){
  //   this.navCtrl.setRoot(LoginPage);
  // }
}