import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Screen5Page } from './screen5.page';

import { SpeedometerStaticComponent } from '../../components/speedometer-static/speedometer-static.component';

const routes: Routes = [
  {
    path: '',
    component: Screen5Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    //FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Screen5Page,SpeedometerStaticComponent]
})
export class Screen5PageModule {}
