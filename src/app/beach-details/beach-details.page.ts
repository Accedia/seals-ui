import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beach-details',
  templateUrl: './beach-details.page.html',
  styleUrls: ['./beach-details.page.scss']
})
export class BeachDetailsPage implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
  }


}
