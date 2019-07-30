import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Screen4Page } from './screen4.page';

const routes: Routes = [
  {
    path: '',
    component: Screen4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    //FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Screen4Page]
})
export class Screen4PageModule {}
