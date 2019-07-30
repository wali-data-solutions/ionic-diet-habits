import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Screen2Page } from './screen2.page';
import { ComponentsModule } from '../../components/components.modules';

const routes: Routes = [
  {
    path: '',
    component: Screen2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    //FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Screen2Page]
})
export class Screen2PageModule {}