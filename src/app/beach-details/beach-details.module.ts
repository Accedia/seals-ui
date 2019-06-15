import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BeachDetailsPage } from './beach-details.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';
const routes: Routes = [
  {
    path: '',
    component: BeachDetailsPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BeachDetailsPage]
})
export class BeachDetailsPageModule {}
