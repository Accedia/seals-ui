import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-beach-details',
  templateUrl: './beach-details.page.html',
  styleUrls: ['./beach-details.page.scss']
})
export class BeachDetailsPage implements OnInit {
  @ViewChild('wrapper') myDiv: ElementRef;
  view: any[] = [342, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Number';
  showYAxisLabel = false;
  yAxisLabel = 'Color Value';
  timeline = false;
  legendPosition = "bellow"

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  multi: any[] = [
    {
      name: 'Cyan',
      series: [
        {
          name: 5,
          value: 2650
        },
        {
          name: 10,
          value: 2800
        },
        {
          name: 15,
          value: 2000
        }
      ]
    },
    {
      name: 'Yellow',
      series: [
        {
          name: 5,
          value: 2500
        },
        {
          name: 10,
          value: 3100
        },
        {
          name: 15,
          value: 2350
        }
      ]
    }
  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
  }
}
