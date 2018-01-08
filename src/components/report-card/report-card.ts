import { Component, Input, ViewChild, Output, EventEmitter} from '@angular/core';
//import { Content } from 'ionic-angular';
import { Chart } from 'chart.js';
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
  lists:any = [];
  moreDataStores: boolean = false;
  offset: number = 4;
  constructor() {
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
  
  ngOnChanges(changes) {
    this.fetchNewData();
    this.plotChart();
  }
  
 
  plotChart(){
    var dynamicColors = function(i) {
      // var r = Math.floor(Math.random() * 255);
      // var g = Math.floor(Math.random() * 255);
      // var b = Math.floor(Math.random() * 255);
      //return "rgb(" + r + "," + g + "," + b + ")";
      return '#673ab7';
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
                label: this.segmentName,
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
    console.log(this.stores.length);
    var counter = this.offset;
    if(counter < this.stores.length){
      this.lists = this.stores.slice(0, this.offset);
      this.offset += 4;
      this.moreDataStores = true;
      console.log('more data');
      console.log(this.moreDataStores);
    }else {
      this.moreDataStores = false;
      this.lists = this.stores.slice(0, this.stores.length);
      this.offset = 4;
      console.log('no more data');
      console.log(this.moreDataStores);
    }
  }
}
