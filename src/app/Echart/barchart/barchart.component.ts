import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';
import { connectWebsocket, disConnectWebsocket } from '../../CustomChart_NgXs/Custom.actions';
import { customData, CustomdataStore } from '../../CustomChart_NgXs/Custom.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css',
})
export class BarchartComponent implements OnInit,OnDestroy {
  barchartOption!: any;
  barChart_Datapoints: customData[] = [];
  subscription! : Subscription;

  @Select(CustomdataStore.getCustomDataPoint) getDatapoints$! : Observable<customData[]>;
  

  constructor(private httpclient: HttpClient, private store : Store) {}

  ngOnInit(): void {
    
    this.connectwebSocket();
    
  }

  connectwebSocket() : void
  {
    this.store.dispatch(new connectWebsocket('wss://localhost:7259/custom_datapoint/ws'));
    this.subscription = this.getDatapoints$.subscribe({
      next : (res) => {
        if(res && res.length >0)
        this.barChart_Datapoints = res;
        if(this.barChart_Datapoints.length > 0)
        {
          this.populateChart();
        }
      }
    })
  }

  
    populateChart() {
      if(this.barChart_Datapoints.length > 0)
      {
        const chartData = this.barChart_Datapoints.map((value, index) => [value.Value, index, value.Value < 0 ? 'Negative Value' : 'Positive Value']);
  
        this.barchartOption = {
          title:{
            text : "Horizontal Bar Chart"
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            formatter: (params: any) => {
              const value = params[0].value[0];
              const color = params[0].value[2];
              return `<ul style="color:'black'">
                        <li>${color}: ${value}</li>
                      </ul>`;
            },
          },
          xAxis: {
            type: 'value',
            axisLine: { show: true },
            axisLabel: { show: true },
            axisTick: { show: true },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'black',
              },
            },
          },
          yAxis: {
            type: 'value',
            inverse: true,
            axisLine: { show: true },
            axisLabel: { show: true, color: 'blue' },
            axisTick: { show: true },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'black',
              },
            },
          },
          legend: {
            data: ['Positive Value', 'Negative Value'],
            right : 'left'
          },
          series: [
            {
              name: 'Positive Value', 
              type: 'custom',
              renderItem: this.renderItem,
              data: chartData.filter(item => item[2] === 'Positive Value'),
              itemStyle: {
                color: 'lightgreen'
              }
            },
            {
              name: 'Negative Value', 
              type: 'custom',
              renderItem: this.renderItem,
              data: chartData.filter(item => item[2] === 'Negative Value'),
              itemStyle: {
                color: '#8F1500'
              }
            }
          ],
        };
      }
    }
  
    renderItem(params: any, api: any) {
      const xValue = api.value(0);
      const yValue = api.value(1);
      const start = api.coord([0, yValue]);
  
      const end = api.coord([xValue, yValue]);
      const height = api.size([0, 1])[1] * 0.5;
  
      const rectShape = {
        x: start[0],
        y: start[1] +5,
        width: end[0] - start[0],
        height: height,
      };
  
      return {
        type: 'group', 
        children: [
          {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: {
              fill: params.seriesName === 'Negative Value' ? '#8F1500' : 'lightgreen',
            },
          },
          {
            type: 'text',
            style: {
              text: xValue, 
              x: (start[0] + end[0]) / 2, 
              y: start[1] + height /1.2, 
              textAlign: 'center',
              textVerticalAlign: 'middle',
              fill: params.seriesName === 'Negative Value' ? '#000' : '#000', 
            },
          },
        ],
      };
    }
    
    ngOnDestroy(): void 
    {
      this.subscription.unsubscribe();
      this.store.dispatch(new disConnectWebsocket());
    }
    
  }