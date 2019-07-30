import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Screen3Page } from './screen3.page';
import { RangeSliderStatic2Component } from '../../components/range-slider-static2/range-slider-static2.component';
const routes: Routes = [
  {
    path: '',
    component: Screen3Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Screen3Page,RangeSliderStatic2Component]
})
export class Screen3PageModule {}
