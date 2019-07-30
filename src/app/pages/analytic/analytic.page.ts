import { Component, OnInit,ViewChild } from '@angular/core';
import { DbstorageService} from '../../services/dbstorage.service';
import { Platform, ModalController, IonRouterOutlet} from '@ionic/angular';
import { Chart } from 'chart.js';
declare var google;


@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.page.html',
  styleUrls: ['./analytic.page.scss'],
})
export class AnalyticPage implements OnInit {
    filterDate = 'today';  
    chartHeight: any;
    guilt:any;
    eatStatisfaction:any;
    total:any;
    goState:any;
    goanywayState:any;
    waitState:any;
    barChartFilterDate = 'today';  
    eatAverageFilterDate = 'today';
    stateType:any;  
    trackingListJson:any;
    @ViewChild('barCanvas') barCanvas;
    barChart: any;
    @ViewChild('scatterCanvas') scatterCanvas;
    scatterChart: any;

    constructor(private dbService: DbstorageService,public platform: Platform) { 
        
        this.chartHeight = platform.height() - 250;   
    }
    change($event) {
        //scatter chart
        this.showChart();
        //bar chart
        this.showBarChart();
        //speedometer average chart
        this.showEatAndGuiltAverage();
    }
  
    ngOnInit() {}
	//on view load draw charts
    ionViewDidEnter() {
        this.dbService.getDatabaseState().subscribe(rdy => {
        if (rdy) {
            //scatter chart
            this.showChart();
            //bar chart
            this.showBarChart();
            //speedometer average chart
            this.showEatAndGuiltAverage();
            }
        })
    }

   
    //scatter chart
    showChart(){
        
       this.dbService.getTracking(this.filterDate).then(data => { 
            
            let trackingList = [];
            let counter =1 ;
            let maxLimit = 0;
            for (var i = 0; i < data.length; i++) {
               
                if(data[i].eatSatisfaction != null){
                    if(data[i].stateType == 'go'){
                        this.stateType = 0.1;
                    }else if(data[i].stateType == 'goAnyway'){
                        this.stateType = 0.2;   
                    }
                    trackingList.push({
                        x: data[i].eatSatisfaction + 20,
                        y:counter,
                    },{
                        x: -(data[i].guiltExperience + 20),
                        y: counter,
                    },{
                        x: this.stateType,
                        y: counter,
                    })
                counter ++;
                }
            }
            trackingList.push({
                x: 119.5,
                y:0,
            },{
                x: -119.5,
                y: 0,
            })
            if(counter < 15){
                    maxLimit = 16;
            }else{
                    maxLimit = counter+1; 
            }
            
        var plus = new Image();
        var minus = new Image();
        var go = new Image();
        var goAnyway = new Image();
        var rightArraow = new Image();
        var leftArrow = new Image();
        plus.src = '../../../assets/icon/plus.png';
        minus.src = '../../../assets/icon/minus.png';
        go.src = '../../../assets/icon/go.png';
        goAnyway.src = '../../../assets/icon/go_anyway.png';
        rightArraow.src = '../../../assets/icon/right_arraow.png';
        leftArrow.src = '../../../assets/icon/left_arraow.png';
        
        if (!this.scatterChart) {
            if(counter > 15){
                var calculateHeight =  counter / 10;
                calculateHeight = calculateHeight / 1.5;
                this.scatterCanvas.nativeElement.height = this.chartHeight * calculateHeight;
                var chartAreaContainer = document.getElementById('chart-area-container');
                chartAreaContainer.style.height = this.chartHeight * calculateHeight+'px';
                console.log( chartAreaContainer.style.height = this.chartHeight * calculateHeight+'px');
                console.log(calculateHeight);
                console.log(this.chartHeight * calculateHeight);
            }else{
                this.scatterCanvas.nativeElement.height = this.chartHeight;
                var chartAreaContainer = document.getElementById('chart-area-container');
                var chartWarpper = document.getElementById('chart-area-wrapper');
    
                chartWarpper.style.height = this.chartHeight +'px !important';
                chartAreaContainer.style.height = this.chartHeight +'px !important';
                console.log(chartWarpper);
                console.log(  chartWarpper.style.height = this.chartHeight +'px');
                console.log( chartAreaContainer.style.height = this.chartHeight +'px');
                console.log(this.chartHeight);
            }
        this.scatterChart = new Chart(this.scatterCanvas.nativeElement, {
            type: 'scatter',
            data: {datasets: [{data: trackingList}]},
            options: {
                animation: false,
                legend: {display: false},
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    enabled: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min:0,
                            max:maxLimit,
                            padding: 15,
                            stepSize: 1,
                        },
                        gridLines: {
                            tickMarkLength: 0,
                          },
                    }],
                    xAxes: [{
                        position: 'bottom',  
                        ticks: {
                            min: -120,
                            max: 120,
                            stepSize: 20,
                            padding: 15,
                            userCallback: function(label, index, labels) {
                                    if(label == -120){
                                        label = 100;
                                    }else if(label == -100){
                                        label = 80;
                                    }else if(label == -80){
                                        label = 60;
                                    }else if(label == -60){
                                        label = 40;
                                    }else if(label == -40){
                                        label = 20;
                                    }else if(label == -20){
                                        label = 0;
                                    }else if(label == 0){
                                        label = '';
                                    }else if(label == 20){
                                        label = 0;
                                    }else if(label == 40){
                                        label = 20;
                                    }else if(label == 60){
                                        label = 40;
                                    }else if(label == 80){
                                        label = 60;
                                    }else if(label == 100){
                                        label = 80;
                                    }else if(label == 120){
                                        label = 100;
                                    }else if(label == -80){
                                        label = 60;
                                    }else{ 
                                        label = label;
                                    }
                                    return label;
                            }
                        },
                        scaleLabel: {
                          display: false,
                        },
                        gridLines: {
                            tickMarkLength: 0,
                          }
                    }]
                }
            },
            plugins: [{
                beforeDraw: function(chart, easing) {
                    var chartArea = chart.chartArea;
                    var ctx = chart.chart.ctx;
                     console.log(chart);
                    // Replace these IDs if you have given your axes IDs in the config
                    var xScale = chart.scales['x-axis-1'];
                    var yScale = chart.scales['y-axis-1'];
                
                    var midX = xScale.getPixelForValue(0);
                    var midY = yScale.getPixelForValue(0);
                
                    // Top left quadrant
                    ctx.fillStyle = '#DDD2C7';
                    ctx.fillRect(chartArea.left, chartArea.top, midX - chartArea.left, midY - chartArea.top);
                
                    // Top right quadrant
                    ctx.fillStyle = 'pink';
                    ctx.fillRect(midX, chartArea.top, chartArea.right - midX, midY - chartArea.top);
                
                },
                afterUpdate: function(chart) {
                    var chartData = chart.config.data.datasets[0].data;
                    for (var i = -0; i < chartData.length; i++) {
                        if(chart.config.data.datasets[0].data[i]['x'] >= 20 && chart.config.data.datasets[0].data[i]['y'] != 0){
                            chart.config.data.datasets[0]._meta[0].data[i]._model.pointStyle = plus;   
                        }else if(chart.config.data.datasets[0].data[i]['x'] <= -20 && chart.config.data.datasets[0].data[i]['y'] != 0){
                            chart.config.data.datasets[0]._meta[0].data[i]._model.pointStyle = minus;  
                        }else if(chart.config.data.datasets[0].data[i]['x'] == 0.1){
                            chart.config.data.datasets[0]._meta[0].data[i]._model.pointStyle = go;  
                        }else if(chart.config.data.datasets[0].data[i]['x'] == 0.2){
                            chart.config.data.datasets[0]._meta[0].data[i]._model.pointStyle = goAnyway;  
                        }else if(chart.config.data.datasets[0].data[i]['x'] == 119.5 && chart.config.data.datasets[0].data[i]['y'] == 0){
                            chart.config.data.datasets[0]._meta[0].data[i]._model.pointStyle = leftArrow;  
                        }else if(chart.config.data.datasets[0].data[i]['x'] == -119.5 && chart.config.data.datasets[0].data[i]['y'] == 0){
                            chart.config.data.datasets[0]._meta[0].data[i]._model.pointStyle = rightArraow;  
                        }      
                    }
                }
            }]
            
            });
        }else{
            this.scatterChart.data.datasets[0].data = trackingList;
            this.scatterChart.options.scales = {
                yAxes: [{
                    ticks: {
                        min:0,
                        max:maxLimit,
                        padding: 15,
                        stepSize: 1,
                    },
                    gridLines: {
                        tickMarkLength: 0,
                      },
                }],
                xAxes: [{
                    position: 'bottom',  
                    ticks: {
                        min: -120,
                        max: 120,
                        stepSize: 20,
                        padding: 15,
                        userCallback: function(label, index, labels) {
                                if(label == -120){
                                    label = 100;
                                }else if(label == -100){
                                    label = 80;
                                }else if(label == -80){
                                    label = 60;
                                }else if(label == -60){
                                    label = 40;
                                }else if(label == -40){
                                    label = 20;
                                }else if(label == -20){
                                    label = 0;
                                }else if(label == 0){
                                    label = '';
                                }else if(label == 20){
                                    label = 0;
                                }else if(label == 40){
                                    label = 20;
                                }else if(label == 60){
                                    label = 40;
                                }else if(label == 80){
                                    label = 60;
                                }else if(label == 100){
                                    label = 80;
                                }else if(label == 120){
                                    label = 100;
                                }else if(label == -80){
                                    label = 60;
                                }else{ 
                                    label = label;
                                }
                                return label;
                        }
                    },
                    scaleLabel: {
                      display: false,
                    },
                    gridLines: {
                        tickMarkLength: 0,
                      }
                }]
            };
        }
            setTimeout(() => {
                this.scatterChart.data.datasets[0].data = trackingList;
                this.scatterChart.update();
            }, 1500);
       })
    }

    

    /**
    * show average eat enjoyment and guilt experience
    */  
  showEatAndGuiltAverage(){
    this.dbService.getTrackingAverage(this.filterDate).then(data => {
     this.eatStatisfaction= (data[0].eatSatisfaction == null) ? 0 : data[0].eatSatisfaction.toFixed(2);
     this.guilt = (data[0].guiltExperience == null) ? 0 : data[0].guiltExperience.toFixed(2);
     this.total = (data[0].guiltExperience == null) ? 0 : data[0].total;
     var needleEat = document.getElementById('needle-eat');
     var eatStatisfactionNeedle = -90 + 1.8 * (this.eatStatisfaction);
     needleEat.style.transform = 'rotate('+eatStatisfactionNeedle+'deg)';
     var needleGuilt = document.getElementById('needle-guilt');
     var guiltNeedle = -90 + 1.8 * (this.guilt);
     needleGuilt.style.transform = 'rotate('+guiltNeedle+'deg)';
   })
}
    /**
    * show bar chart
    */
    showBarChart(){
        
        this.dbService.getBarChartData(this.filterDate).then(data => {   
            // Define the chart to be drawn.
            this.goState = (data[0].go == null) ? 0 : data[0].go;
            this.goanywayState = (data[0].goanyway == null) ? 0 : data[0].goanyway;
            this.waitState = (data[0].wait == null) ? 0 : data[0].wait;
            //this.barCanvas.nativeElement.height = '300';
            if (!this.barChart) {
            this.barChart = new Chart(this.barCanvas.nativeElement, {
                type: 'bar',
                data: {
                    labels: ["Go", "Go Anyway", "Wait"],
                    datasets: [{
                        label: '',
                        legend: {display: false},
                        data: [this.goState, this.goanywayState, this.waitState],
                        backgroundColor: [
                            '#953634',
                            '#E56C0A',
                            '#FFC100'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: false,
                    legend: {display: false},
                    tooltips: {
                        enabled: false
                    },
                    layout: {
                        padding: {
                            right: 15,
                        }
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                tickMarkLength: 0,
                              },
                              ticks: {
                                beginAtZero: true,
                                min:0,
                                padding: 15,
                                callback: function(value) {if (value % 1 === 0) {return value;}}
                              }
                        }],
                        xAxes: [{ 
                            gridLines: {
                                tickMarkLength: 0,
                              },
                              ticks: {
                                padding: 5,
                            },
                        }],
                    }
                }
            });
        }else{
            this.barChart.options.scales = {
                yAxes: [{
                    gridLines: {
                        tickMarkLength: 0,
                      },
                      ticks: {
                        beginAtZero: true,
                        min:0,
                        padding: 15,
                        callback: function(value) {if (value % 1 === 0) {return value;}}
                      }
                }],
                xAxes: [{ 
                    gridLines: {
                        tickMarkLength: 0,
                      },
                      ticks: {
                        padding: 5,
                    },
                }]
            };

            this.barChart.data.datasets[0].data = [this.goState, this.goanywayState, this.waitState];
            this.barChart.update();
        }

        })
    }
}
