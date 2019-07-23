import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapPage } from './map.page';
import { MapboxComponent } from './components/mapbox/mapbox.component';
import { SearchboxPage } from './components/searchbox/searchbox.page';
import { MapService } from '../services/map.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BeachDetailsPageModule } from '../beach-details/beach-details.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BeachDetailsPageModule,
    RouterModule.forChild([{ path: '', component: MapPage }])
  ],
  declarations: [MapPage, MapboxComponent, SearchboxPage],
  providers: [TitleCasePipe, DatePipe, MapService, Geolocation]
})
export class MapPageModule {}
