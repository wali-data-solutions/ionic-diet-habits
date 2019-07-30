import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnalyticPage } from './analytic.page';
import { SpeedometerGuiltChartComponent } from '../../components/speedometer-guilt-chart/speedometer-guilt-chart.component';
import { SpeedometerChartComponent } from '../../components/speedometer-chart/speedometer-chart.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticPage
  }
];

@NgModule({
  declarations: [AnalyticPage,SpeedometerChartComponent,SpeedometerGuiltChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class AnalyticPageModule {}
