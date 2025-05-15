import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TitleComponent, LegendComponent, ToolboxComponent, TooltipComponent, DataZoomComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { CurrentTimeService } from '../../WebSocket/current-time.service';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { DatapointState } from '../../datapoint/datapoint.state';
import { GetDatapointAction, SetWebsocketConnection } from '../../datapoint/datapoint.actions';

echarts.use([BarChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, CanvasRenderer, LineChart, PieChart, DataZoomComponent]);

interface CustomEChartsOption extends EChartsOption {
  title: {
    text: string;
    right: string;
  };
}

export interface demoChartData {
  date: string;
  value: number;
}

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.css',
  providers: [provideEchartsCore({ echarts })],
})
export class LinechartComponent implements OnInit, OnDestroy {
  getLineChartData: demoChartData[] = [];
  lineChartoptions!: CustomEChartsOption;
  recieveMessage: any[] = [];
  subscription: Subscription | undefined;

  @Select(DatapointState.getState) dataPoint$!: Observable<demoChartData[]>;
  @ViewChild('echarts') echartsInstance: any;

  constructor(private serviceTime: CurrentTimeService, private dataPointStore: Store) {}

  ngOnInit(): void {
    console.log('onint');
    
    this.connectWebsocket();

    this.serviceTime.checkConnetcion('wss://localhost:7259/ws');
    this.subscription = this.serviceTime.getMessage().subscribe((message) => {
      this.recieveMessage.push(message);
    });
  }

  populateCharts(): void {
    if (this.getLineChartData.length > 0) {
      this.lineChartoptions = {
        title: {
          text: 'Line Chart',
          right: 'center',
        },
        legend: {
          data: ['Email'],
          bottom: 'bottom',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.getLineChartData.map((item) => item.date),
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: true,
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            data: this.getLineChartData.map((item) => item.value),
            smooth: false,
            stack: 'Total',
          },
        ],
      };
      this.updateChartData();
    }
  }
  
  connectWebsocket(): void {
    this.dataPointStore.dispatch(new SetWebsocketConnection('wss://localhost:7259/dataPoint/ws'));
    this.subscription = this.dataPoint$.subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.getLineChartData = res;
          if(this.getLineChartData.length > 0)
          {
          this.populateCharts();
        }
        }
      },
    });
  }

  updateChartData(): void {
      if (this.echartsInstance.chart) {
        const chart = this.echartsInstance.chart;
        chart.setOption({
          series: [
            {
              data: this.getLineChartData.map((item) => item.value),
            },
          ],
          xAxis: {
            data: this.getLineChartData.map((item) => item.date),
          },
        });
        chart.setOption({});
        chart.setOption(this.lineChartoptions);
      } 
      else 
      {
        console.log('echartsInstance.chart is undefined');
      }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.dataPointStore.dispatch('wss://localhost:7259/dataPoint/ws');
    this.serviceTime.disconnect();
  }
}

//get datapoint from the server using service
    // this.serviceDataPoint.checkConnetcion("wss://localhost:7259/dataPoint/ws");
    // this.subscription = this.serviceDataPoint.getMessage().subscribe((message) => {
    //   this.getLineChartData = message;
    //   console.log("Datapoint",this.getLineChartData);
    //   this.populateCharts(); 
    //   this.serviceDataPoint.disconnect();

    // })


//Get the datapoint using json file
    // this.httpClient.get<demoChartData[]>('/assets/Demojson/chart.json').subscribe({
    //   next: (item) => {
    //     this.getLineChartData = item;
    //     console.log('Chart Data', this.getLineChartData);
    //     this.populateCharts(); 
    //   },
    // });

//selector to retrive data from state
// this.subscription = this.dataPoint$.subscribe({
    //   next:(res) => {
    //     if(!res.length)
    //     {
    //       this.dataPointStore.dispatch(new GetDatapointAction());
    //     }
    //     console.log("Datapoint",res);
    //     this.getLineChartData = res;
    //     console.log("Datapoint",this.getLineChartData);
        
    //   }
    // })

  //     //this.getLineChartData = [];
      //     if(this.getLineChartData.length > 0)
      //     {
      //     res.forEach(item => {  
      //       console.log(res,item,'chekkkkkkk')
      //      const exists = this.getLineChartData.some(existingItem => existingItem.date.toString().toLocaleLowerCase() !== item.date.toString().toLocaleLowerCase())
      //      console.log(exists,'aaa')
      //     if(exists){
      //       checkduplicate.push(item);
      //     }
      //   }
      // );
      //   }  
      //   else{
      //     checkduplicate.push(...res);
      //   }       
    //   if (this.getLineChartData.length >= 20) {      
    //     this.getLineChartData.shift();
    // }