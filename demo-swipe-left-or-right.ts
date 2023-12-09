import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-result',
  templateUrl: './register-result.component.html',
  styleUrls: ['./register-result.component.scss'],
})
export class RegisterResultComponent implements OnInit {
  private startIndex = 0;
  private endIndex = 5;
  dateTimes: any = [];
  chartData: any = [];

  public xData = [
    '201312090000',
    '201312090011',
    '201312090022',
    '201312090033',
    '201312090044',

    '201312100000',
    '201312100011',
    '201312100022',
    '201312100033',
    '201312100044',

    '201312110000',
    '201312110011',
    '201312110022',
    '201312110033',
    '201312110044',

    '201312120055',
    '201312121155',
  ];

  public yData: any[] = [
    ['WBC 1', 'RBG 1', 'HCT 1'],
    ['WBC 2', 'RBG 2', 'HCT 2'],
    ['WBC 3', 'RBG 3', 'HCT 3'],
    ['WBC 4', 'RBG 4', 'HCT 4'],
    ['WBC 5', 'RBG 5', 'HCT 5'],

    ['WBC 6', 'RBG 6', 'HCT 6'],
    ['WBC 7', 'RBG 7', 'HCT 7'],
    ['WBC 8', 'RBG 8', 'HCT 8'],
    ['WBC 9', 'RBG 9', 'HCT 9'],
    ['WBC 10', 'RBG 10', 'HCT 10'],

    ['WBC 11', 'RBG 11', 'HCT 11'],
    ['WBC 12', 'RBG 12', 'HCT 12'],
    ['WBC 13', 'RBG 13', 'HCT 13'],
    ['WBC 14', 'RBG 14', 'HCT 14'],
    ['WBC 15', 'RBG 15', 'HCT 15'],

    ['WBC 16', 'RBG 16', 'HCT 16'],
    ['WBC 17', 'RBG 17', 'HCT 17'],
  ];

  private bloodIndicatorCount = 3;

  ngOnInit(): void {
    this.renderChart();
  }

  public renderChart() {
    // Reset chart data when r`e-render chart
    this.chartData = [];
    // Loop the blood indicators
    for (let bIndex = 0; bIndex < this.bloodIndicatorCount; bIndex++) {
      let seriesData: any[] = [];
      let annotations: any[] = [];
      // Loop the xData by start index and end index
      for (let xIndex = this.startIndex; xIndex < this.endIndex; xIndex++) {
        // Set series data for each blood indictor
        // and for each datetime
        if (this.xData[xIndex]) {
          const xValue = Number(this.xData[xIndex]);
          const yValue = !Number.isNaN(Number(this.yData[xIndex][bIndex]))
            ? this.yData[xIndex][bIndex]
            : null;

          seriesData.push({
            x: xValue,
            y: yValue,
          });

          if (!yValue) {
            annotations.push({
              x: xIndex,
              y: 'yMax', // always yMax
            });
          }
        }
      }

      const chartItem = {
        id: `Chart_${bIndex}`,
        seriesData: seriesData,
        annotations: annotations,
      };

      this.chartData.push(chartItem);
    }
  }

  public onSwipeLeft() {
    if (this.startIndex > 0) {
      this.endIndex = this.startIndex;
      this.startIndex -= 5;
      this.renderChart();
    }
  }

  public onSwipeClick() {
    if (this.endIndex < this.xData.length) {
      this.startIndex = this.endIndex;
      this.endIndex += 5;
      this.renderChart();
    }
  }

  public formatDisplayDateTime(dateTime: string) {
    let year = dateTime.substring(0, 4);
    let month = dateTime.substring(4, 6);
    let day = dateTime.substring(6, 8);
    let hours = dateTime.substring(8, 10);
    let minutes = dateTime.substring(10, 12);

    return [`${year}/${month}/${day}`, `${hours}:${minutes}`];
  }
}
