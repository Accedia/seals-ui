import { Component, Input } from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() dataArray: [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Number';
  showYAxisLabel = false;
  yAxisLabel = 'Color Value';
  timeline = false;
  legendPosition = 'bellow';
  curve = shape.curveBasis;
  colorScheme = {
    domain: ['rgb(108, 26, 185)', 'rgb(175, 17, 25)', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  // @
}
