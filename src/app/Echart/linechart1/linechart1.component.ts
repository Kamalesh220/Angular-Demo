import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TiimeSeries } from '../../Models/LineChartDataModel';
import { EChartsOption } from 'echarts';
import { Observable, Subscription } from 'rxjs';
import { LineChartDataStore } from '../../linechart1_NgXs/linechart1.state';
import { Select, Store } from '@ngxs/store';
import { ConnectWebsocket, DisconnectWebScket } from '../../linechart1_NgXs/linechart1.actions';
import {provideNativeDateAdapter} from '@angular/material/core';
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';
import { BarchartComponent } from '../barchart/barchart.component';
import { disConnectWebsocket } from '../../CustomChart_NgXs/Custom.actions';


export interface CustomChartsOption extends EChartsOption {
  title: {
    text: string;
    },
}

@Component({
  selector: 'app-linechart1',
  templateUrl: './linechart1.component.html',
  styleUrl: './linechart1.component.css',
  providers: [provideNativeDateAdapter()],
})
export class Linechart1Component implements OnInit, OnDestroy {


    getChartData: TiimeSeries[] = [];
    Chartoptions!: CustomChartsOption;
    subscription: Subscription | undefined;

    StartDateTime: Date = new Date();
    
    EndDateTime: Date = new Date();
    maxDate : Date = new Date();
  
    @Select(LineChartDataStore.getLinechartData) getDatapoints$! : Observable<TiimeSeries[]>;

    @ViewChild('startpicker') startpicker! : NgxMatDatetimepicker<Date>;
    @ViewChild('endpicker') endpicker! : NgxMatDatetimepicker<Date>;

    constructor(private linechartStore : Store) 
    {
      this.StartDateTime.setDate(this.StartDateTime.getDate() - 1); 
      this.StartDateTime.setHours(0, 0, 0, 0);
    }

    ngOnInit(): void {
      this.connecteWebsocketService(this.StartDateTime, this.EndDateTime);
    }

    setStart_EndDate(DateField : string,event: Date) {
      if(DateField == 'start')
      {
        this.StartDateTime = event;
        if(this.startpicker)
        {
          this.startpicker.close();
        }
      }
      else if(DateField == 'end')
      {
        this.EndDateTime = event;
        if(this.endpicker)
          {
            this.endpicker.close();
          }
      }
      if(this.EndDateTime != null && this.StartDateTime != null && this.StartDateTime <= this.EndDateTime)
      {
        this.connecteWebsocketService(this.StartDateTime, this.EndDateTime);
      }
    }

    connecteWebsocketService(inputStartDate : Date, inputEndDate : Date ) {
      this.StartDateTime = new Date(inputStartDate);
      this.EndDateTime = new Date(inputEndDate);
      this.linechartStore.dispatch(new ConnectWebsocket("wss://localhost:7259/db/ws", this.StartDateTime.toString(), this.EndDateTime.toString()));

      this.subscription = this.getDatapoints$.subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            this.getChartData = response;
            if(this.getChartData.length > 0)
            {
            this.populateCharts();
          }
          }
        },
      });
    }

    populateCharts() {
      if (this.getChartData.length > 0) {
        this.Chartoptions = {
          title: {
            text: 'Line Chart'
          },
          legend: {
            data: ['Value'],
            top: 'top',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              },
            },
            hideDelay:1000,
            triggerOn : 'mousemove',
            formatter: (params: any) => {
              const dataPointIndex = params[0].dataIndex;
              const dataPoint = this.getChartData[dataPointIndex];
            
              const dateParts = dataPoint.Timestamp.toString().split('-');
              const year = parseInt(dateParts[0], 10);
              const month = parseInt(dateParts[1], 10) - 1;
              const day = parseInt(dateParts[2], 10);
            
              const date = new Date(year, month, day);
            
              const monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ];
              
              const yearFormatted = date.getFullYear();
              const monthFormatted = monthNames[date.getMonth()];
              const dayFormatted = String(date.getDate()).padStart(2, '0');

              const formattedDate = `${dayFormatted}-${monthFormatted}-${yearFormatted}`;
            
              return `<p style="color:black">Date: ${formattedDate}
                          <ul style="color:blue">
                            <li>Time: ${dataPoint.Category}</li>
                            <li>Value: ${dataPoint.Value}</li>
                          </ul>
                        </p>`;
            }
          },
          xAxis: {
            type: 'category',
            name : "Time",
            data: this.getChartData.map((item) =>{
              const dateParts = item.Timestamp.toString().split('-');
              const year = parseInt(dateParts[0], 10);
              const month = parseInt(dateParts[1], 10) - 1;
              const day = parseInt(dateParts[2], 10);
            
              const date = new Date(year, month, day);
            
              const monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ];
              const yearFormatted = date.getFullYear();
              const monthFormatted = monthNames[date.getMonth()];
              const dayFormatted = String(date.getDate()).padStart(2, '0');
            
              const formattedDate = `${dayFormatted}-${monthFormatted}-${yearFormatted}`;
            return `${formattedDate}
  (${item.Category})`
            }),
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
            name: "Value",
            boundaryGap: [0, '100%'],
            splitLine: {
              show: true,
            },
          },
          toolbox: {
            show : true,
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            },
          },
          series: [
            {
              name: 'Value',
              type: 'line',
              data: this.getChartData.map((item) => item.Value),
              smooth: false,
              stack: 'Total',
              showSymbol: true,
            },
          ],
        };
      }
    }

   
    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.linechartStore.dispatch(new DisconnectWebScket());
    }

    
}
