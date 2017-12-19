import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas1') lineCanvas1;
  lineChart: any;
  lineChart1: any;
  labels: any;
  data: any;
  labels1: any;
  data1: any;
  loadingPage: boolean = true;
  endDate: any;
  dayCount: any = 10;
  startDate: any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.startDate = this.getDateFormat(this.dayCount);
    this.endDate = this.getDateFormat(0);
  }
  ionViewDidLoad() {
    this.loadingPage = true;
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="cssload-container">
        <div class="cssload-whirlpool"></div>
      </div>`,
      duration: 5000,
    });
  
    loading.onDidDismiss(() => {
      this.labels = ["January", "February", "March", "April", "May", "June", "July"];
      this.data = [65, 59, 80, 81, 56, 55, 40];
      this.labels1 = ["January", "February", "March", "April", "May", "June", "July"];
      this.data1 = [65, 59, 80, 81, 56, 55, 40];
      this.chartData();
      this.loadingPage = false;
      console.log('Dismissed loading');
    });
    loading.present();
    console.log('ionViewDidLoad ReportPage');
  }
  
  chartData(){
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.data,
            spanGaps: false,
          }
        ]
      }
    });
    this.lineChart1 = new Chart(this.lineCanvas1.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels1,
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.data1,
            spanGaps: false,
          }
        ]
      }
    });
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
        },
        {
          name: 'End Date',
          placeholder: 'date',
          type:"date",
          value: this.endDate,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Filter',
          handler: data => {
            if (data) {
              console.log(data);
              this.fetchNewData();
            }
          }
        }
      ]
    });
    alert.present();
  }
  
  fetchNewData(){
    this.loadingPage = true;
    console.log(this.loadingPage);
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="cssload-container">
          <div class="cssload-whirlpool"></div>
        </div>
      `,
      duration: 5000,
    });
  
    loading.onDidDismiss(() => {
      this.labels = ['A', 'B', 'C', 'D', 'E'];
      this.data = [10, 20, 30, 40, 10];
      this.lineChart.destroy();
      this.lineChart1.destroy();  
    
      this.chartData();
      this.loadingPage = false;
      console.log('Dismissed loading');
    });
  
    loading.present();
  }

  getDateFormat(count){
    var date = new Date();
    var dd = date.getDate()-count;
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    var dd1 = dd.toString();
    var mm1 = mm.toString();
    if(dd<10) 
    { 
      dd1 = '0' + dd.toString();
    } 

    if(mm<10) 
    {
      mm1 = '0' + mm.toString();;
    } 
    var newDate = yyyy + '-' + mm1 + '-' + dd1;
    return newDate;
  }
}