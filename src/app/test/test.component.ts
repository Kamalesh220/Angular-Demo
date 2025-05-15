import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  chartOptions: any;
  data: number[] = [];

  constructor(private httpclient : HttpClient) {}

  ngOnInit(): void {
    this.httpclient.get<number[]>('assets/Demojson/BarChartData.json').subscribe(item => {
      this.data=item;

      this.populatChart();
    })

  }
  populatChart() {
    if(this.data.length > 0)
    {
      const chartData = this.data.map((value, index) => [value, index, value < 0 ? 'Negative Value' : 'Positive Value']);

      this.chartOptions = {
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
    console.log("xvalue" , start)

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
            y: start[1] + height /1.3, 
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fill: params.seriesName === 'Negative Value' ? '#fff' : '#000', 
          },
        },
      ],
    };
  }
}