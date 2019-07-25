import { Component, Input } from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'info-component',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input()
  beachName: string;

  constructor() {
  }
}
