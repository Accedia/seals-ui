import { Component } from '@angular/core';
import BeachModel from '../models/beach.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  items: BeachModel[] = [
    new BeachModel(1, 'Приморско'),
    new BeachModel(2, 'Бургас'),
    new BeachModel(3, 'Варна'),
    new BeachModel(4, 'Албена'),
    new BeachModel(5, 'Балчик')
  ];

  constructor(private navCtrl: NavController) {}

  goToDevice(beach: BeachModel) {
    this.navCtrl.navigateForward(`/beach/${beach.id}`);
  }
}
