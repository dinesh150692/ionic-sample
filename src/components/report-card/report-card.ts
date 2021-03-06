import { Component, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { ToastController } from 'ionic-angular';

import { Chart } from 'chart.js';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

/**
 * Generated class for the ReportCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'report-card',
  templateUrl: 'report-card.html',
})
export class ReportCardComponent {
  
  @Input('data') data: any;
  @Input('stores') stores: any;
  @Input('labels') labels: any;
  @Input('instruments') instruments: any;
  @Input('segmentName') segmentName;
  @ViewChild('barCanvas') barCanvas;
  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  chartOptions: any;
  chart: boolean = true;
  barChart: any;
  storeLists :any = [];
  instrumentLists: any = [];
  moreDataStores: boolean = false;
  offset: number = 4;
  activeIndex: any = 0;
  activeLabel: any = '';
  constructor(private base64ToGallery: Base64ToGallery, private toastCtrl: ToastController) {
    Chart.plugins.register({
      beforeDraw: function(chartInstance) {
        var ctx = chartInstance.chart.ctx;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
      }
    });
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
      legend: {
        display: true,
        labels :{
          boxWidth: 0,
        }
      },
      animation: {
          duration: 1,
          onComplete: function () {
              var chartInstance = this.chart,
              ctx = chartInstance.ctx;
              Chart.defaults.global.defaultFontColor = '#000000';
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
  
  ngOnChanges(changes) {
    this.activeLabel = '';
    setTimeout(() => {
      this.setLabel();
      this.fetchNewData();
      this.plotChart();
    }, 1);
  }
  
 
  plotChart(){
    var dynamicColors = function(i) {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
      //return '#673ab7';
    };
    var color = [];
    for (var i in this.data) {
      color.push(dynamicColors(i));
    }
    if(this.data.length > 0)
    {
      this.chart = true;
      if(this.barChart){
        this.barChart.destroy();
      }
      setTimeout(() => {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: 'bar',
          options: this.chartOptions,
          data: {
            labels: this.labels,
            datasets: [
              {
                label: '',
                data: this.data,
                backgroundColor: color
             }
            ]
          }
        });
      }, 1);
      setTimeout(() => {
        this.change.emit(true);
      }, 100);
    }else{
      this.chart = false;
      setTimeout(() => {
        this.change.emit(true);
      }, 100);
    }
  }

  fetchNewData(){
    var counter = this.offset;
    if(this.instruments[this.activeIndex]){
      this.instrumentLists = this.instruments[this.activeIndex];
    }else {
      this.instrumentLists = [];
    }
    if(this.stores[this.activeIndex]){
      if(counter < this.stores[this.activeIndex].length){
        this.storeLists = this.stores[this.activeIndex].slice(0, this.offset);
        this.offset += 4;
        this.moreDataStores = true;
      } else {
        this.moreDataStores = false;
        this.storeLists = this.stores[this.activeIndex].slice(0, this.stores.length);
        this.offset = 4;
      }
    }else{
      this.storeLists = [];
    }
  }

  downloadImage(){
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var today  = new Date();
    this.base64ToGallery.base64ToGallery(this.barChart.toBase64Image(), { prefix: this.segmentName + '_' + today.toLocaleDateString("en-US",options) + '_' }).then(
      res => this.showToast('Saved image to gallery ', 3000, 'toast-success'),
      err => this.showToast('Error saving image to gallery ', 3000, 'toast-failure')
    );
  }

  showToast(text, duration, cssClass) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: duration,
      cssClass: cssClass
    });
    toast.present();
  }

  hideData(){
    this.storeLists = this.stores[this.activeIndex].slice(0, this.offset);
    this.moreDataStores = true;
    this.offset += 4;
  }

  chartClicked(event){
    var myChart = this.barChart;
    var activePoint = myChart.getElementAtEvent(event)[0];
    if(activePoint){
      var data = activePoint._chart.data;
      // var datasetIndex = activePoint._datasetIndex;
      // var label = data.datasets[datasetIndex].label;
      // var value = data.datasets[datasetIndex].data[activePoint._index];
      this.activeLabel = '( ' + data.labels[activePoint._index] + ' )';
      this.activeIndex = activePoint._index + 1;
      this.offset = 4;
      this.fetchNewData();
    }
  }

  refreshData(){
    this.activeIndex = 0;
    this.setLabel();
    this.offset = 4;
    this.fetchNewData();
  }

  setLabel(){
    if(this.labels.length > 1){
      this.activeLabel = ' ( ' + this.labels[0] + ' - ' + this.labels[this.labels.length - 1] + ' )';
    }else if(this.labels.length == 1) {
      this.activeLabel = ' ( ' + this.labels[this.labels.length - 1] + ' )';
    }
  }
}
