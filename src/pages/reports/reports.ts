import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Chain } from '@angular/compiler';
//import { LoginPage } from '../login/login';
/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
class ChartData{
  chart: Chart;
  labels: any;
  data: any;
}
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
  
  loadingPage: boolean = true;
  endDate: any;
  dayCount: any = 10;
  startDate: any;
  loader: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      this.startDate = this.getDateFormat(this.dayCount);
      this.endDate = this.getDateFormat(0);
      this.lineChart = new ChartData();
      this.lineChart1 = new ChartData();
  }
  
  ionViewDidLoad() { 
    this.lineChart.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    this.lineChart.data = [65, 59, 80, 81, 56, 55, 40];
    this.lineChart1.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    this.lineChart1.data = [65, 59, 80, 81, 56, 55, 40];
    this.fetchLoader();
  }
  
  chartData(){
    if(this.lineChart.chart){
      this.lineChart.chart.destroy();
    }
    if(this.lineChart1.chart){
      this.lineChart1.chart.destroy(); 
    }
    this.lineChart.chart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.lineChart.labels,
        datasets: [
          {
            label: "My First dataset",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192, 192,0.4)",
            borderColor: "rgb(75,192,192)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: this.lineChart.data,
            spanGaps: false,
          }
        ]
      }
    });
    this.lineChart1.chart = new Chart(this.lineCanvas1.nativeElement, {
      type: 'line',
      data: {
        labels: this.lineChart1.labels,
        datasets: [
          {
            label: "Stock B",
            fill: true,
            //lineTension: 0.1,
            backgroundColor: "rgba(167,105,0,0.4)",
            borderColor: "rgb(167, 105, 0)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "white",
            pointBackgroundColor: "black",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "brown",
            pointHoverBorderColor: "yellow",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: this.lineChart1.data,
            spanGaps: false,
          }
        ]
      }
    });
    this.loader.dismiss();
    this.loader.onDidDismiss(() => {
      setTimeout(()=> {
        this.loadingPage = false;
      },100); 
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
            this.fetchNewData(data);
            }
          }
        }
      ]
    });
    alert.present();
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
    this.chartData();
  }

  fetchNewData(data: any){
    this.lineChart.labels = ['A', 'B', 'C', 'D', 'E'];
    this.lineChart.data = [10, 20, 30, 40, 10]; 
    this.fetchLoader();
  }

  getDateFormat(count){
    var dateOffset = (24*60*60*1000) * count;
    var date = new Date();
    date.setTime(date.getTime() - dateOffset);
    var dd = date.getDate();
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
  
  
  // logout(){
  //   this.navCtrl.setRoot(LoginPage);
  // }
}