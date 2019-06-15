import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BeachDetailsPage } from './beach-details.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [BeachDetailsPage]
})
export class BeachDetailsPageModule {}
