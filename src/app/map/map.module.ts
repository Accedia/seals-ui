import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapPage } from './map.page';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDC2sX1bUiF7a9NBs03Q8CN4HhYj2_9nN8',
      libraries: ['places']
    }),
    RouterModule.forChild([{ path: '', component: MapPage }])
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
