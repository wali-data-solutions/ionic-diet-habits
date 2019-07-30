import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyEatExperiencePage } from './my-eat-experience.page';

import { SpeedometerEatComponent } from '../../components/speedometer-eat/speedometer-eat.component';
import { SpeedometerGuiltComponent} from '../../components/speedometer-guilt/speedometer-guilt.component';

const routes: Routes = [
  {
    path: '',
    component: MyEatExperiencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyEatExperiencePage, SpeedometerEatComponent, SpeedometerGuiltComponent]
})
export class MyEatExperiencePageModule {}
