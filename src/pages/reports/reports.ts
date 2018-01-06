import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';

import { Chart } from 'chart.js';

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
  chart: Chart;
}
@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('barCanvas1') barCanvas1;
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
        {name:'A', value:100},
        {name:'B', value:100},
        {name:'C', value:100},
        {name:'D', value:100}
      ];
      console.log(this.transaction.stores);
      this.transaction.instruments = [];
      this.amount.stores = [
        {name:'A', value:100},
        {name:'B', value:100},
        {name:'C', value:100},
        {name:'D', value:100}
      ];
      this.amount.instruments = [];
      this.chartOptions = {
        events: false,
        tooltips: {
            enabled: false
        },
        hover: {
            animationDuration: 0
        },
        scales: {
          xAxes : [{
            gridLines: {
              lineWidth: 0,
              display: false,
            }  
          }],
          yAxes: [{
           // stacked:true,
            //display:false,
            gridLines: {
              lineWidth: 0,
              display: false,
            },
            ticks: {
              beginAtZero: true
            }
          }]
        },
        animation: {
            duration: 1,
            onComplete: function () {
                var chartInstance = this.chart,
                ctx = chartInstance.ctx;
                Chart.defaults.global.defaultFontColor = '#673ab7';
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        var data = dataset.data[index];                            
                        ctx.fillText(data, bar._model.x, bar._model.y);
                    });
                });
            }
        }
      };
    }
  
  ionViewDidLoad() { 
    this.fetchLoader();
  }
  onSegmentChange(){
    switch(this.segmentSelection){
      case 'Transactions':
        setTimeout(() => {
          this.chartData('Transactions', this.transaction, this.barCanvas1);
        }, 500);
        break;
      case 'Amount':
      setTimeout(() => {
        this.chartData('Amount', this.amount, this.barCanvas);
      }, 500);
        break;
    }
  }
  chartData(segmentName, data: Segment, barCanvas){
    var dynamicColors = function(i) {
      // var r = Math.floor(Math.random() * 255);
      // var g = Math.floor(Math.random() * 255);
      // var b = Math.floor(Math.random() * 255);
      //return "rgb(" + r + "," + g + "," + b + ")";
      return '#673ab7';
    };
    if(data.chart){
      this.amount.chart.destroy();
    }
    var color = [];
    for (var i in data.data) {
      color.push(dynamicColors(i));
    }
      data.chart = new Chart(barCanvas.nativeElement, {
        type: 'bar',
        options: this.chartOptions,
        data: {
          labels: data.labels,
          datasets: [
            {
              label: segmentName,
              data: data.data,
              backgroundColor: color
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
    this.onSegmentChange();
  }

  fetchNewData(data: any){
    this.transaction.labels = ['A', 'B', 'C', 'D', 'E'];
    this.transaction.data = [1, 2, 3, 4, 1]; 
    this.amount.labels =  ['A', 'B', 'C', 'D', 'E'];
    this.amount.data = [10, 20, 30, 40, 10]; 
    this.transaction.stores = [];
    this.transaction.instruments = [];
    this.amount.stores = [];
    this.amount.instruments = [];
    this.fetchLoader();
  }  
  
  // logout(){
  //   this.navCtrl.setRoot(LoginPage);
  // }
}