import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Screen2bPage } from './screen2b.page';
import { ComponentsModule } from '../../components/components.modules';

const routes: Routes = [
  {
    path: '',
    component: Screen2bPage
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
  declarations: [Screen2bPage]
})
export class Screen2bPageModule {}
