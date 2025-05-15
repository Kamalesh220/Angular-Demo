import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-multichart',
  templateUrl: './multichart.component.html',
  styleUrl: './multichart.component.css'
})
export class MultichartComponent implements OnInit{

multiChart!: EChartsOption ;
barChart_Datapoints: any;

ngOnInit(): void {
  this.populatechart();
}

populatechart()
{
 this.multiChart = {
    xAxis: {
      type: 'time',
      name: 'Time',
      position : 'bottom',
      axisLine  : {
        show : false,
        
      },
      axisTick : {
        show : false
      }

    },
    yAxis: {
      type: 'value',
      name: 'Depth',
      inverse: true, // So 0 is at the top
      startValue : 0,
      max :1000
    },
    visualMap: [
      {
        type: 'piecewise',
        show: false,
        dimension: 1, // depth is on y-axis
        pieces: [
          { gt: 0, lte: 100, color: '#e0f7fa' },   // Zone 1
          { gt: 100, lte: 200, color: '#b2ebf2' }, // Zone 2
          { gt: 200, lte: 300, color: '#80deea' }, // Zone 3
          // add more zones...
        ]
      }
    ],
    series: [
      {
        name: 'Water Content',
        type: 'line',
        data: [[new Date('2025-04-28 00:00:00').getTime(), 50],
        [new Date('2025-04-28 01:00:00').getTime(), 50],
        [new Date('2025-04-28 02:00:00').getTime(), 100]],
        lineStyle: {
          color: 'blue'
        },
        symbol: 'circle',
        markPoint: {
          data: [
            { name: 'Point 1', coord: ['2025-04-28 00:00:00', 10] },
            { name: 'Point 2', coord: ['2025-04-28 01:00:00', 100] },
            { name: 'Point 3', coord: ['2025-04-28 02:00:00', 250] }
          ],
          symbolSize: 50,
          label: {
            show: true,
            formatter: '{b}',
            fontSize: 12
          }
        }
      },
      {
        name: 'Oil Content',
        type: 'line',
        data:  [
          [new Date('2025-04-28 00:00:00').getTime(), 100],
          [new Date('2025-04-28 01:00:00').getTime(), 100],
          [new Date('2025-04-28 02:00:00').getTime(), 50]
        ],
        lineStyle: {
          color: 'brown'
        },
        symbol: 'rect',
        markPoint: {
          data: [
            { name: 'Oil Start', coord: ['00:30', 20] },
            { name: 'Oil Peak', coord: ['01:30', 150] },
            { name: 'Oil Deep', coord: ['03:00', 300] }
          ],
          symbolSize: 50,
          label: {
            show: true,
            formatter: '{b}',
            fontSize: 12
          }
        }
      }
    ]
  };
}



}
