import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
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
  lineChart: any;
  labels: any;
  data: any;
  loadingPage: boolean = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public datepicker: DatePicker, 
    public loadingCtrl: LoadingController) {
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
      enableBackdropDismiss: true
    });
  
    loading.onDidDismiss(() => {
      this.labels = ["January", "February", "March", "April", "May", "June", "July"];
      this.data = [65, 59, 80, 81, 56, 55, 40];
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
  }
  presentPrompt() {
    console.log('adadasd');
    // this.datepicker.show({
    //   date: new Date(),
    //   mode: 'date',
    //   androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_DARK
    // }).then(
    //   date => console.log('Got date: ', date),
    //   err => console.log('Error occurred while getting date: ', err)
    // );
    this.loadingPage = true;
    console.log(this.loadingPage);
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="cssload-container">
          <div class="cssload-whirlpool"></div>
      </div>`,
      duration: 500000,
      enableBackdropDismiss: true
    });
  
    loading.onDidDismiss(() => {
      this.labels = ['A', 'B', 'C', 'D', 'E'];
      this.data = [10, 20, 30, 40, 10];
      this.chartData();
      this.loadingPage = false;
      console.log('Dismissed loading');
    });
  
    loading.present();
  }

}
