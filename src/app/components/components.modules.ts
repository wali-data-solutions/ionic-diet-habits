import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
//import { RangeSliderComponent } from './range-slider/range-slider.component';
import { RangeSliderStaticComponent } from './range-slider-static/range-slider-static.component';
// import { RangeSliderStatic2Component } from './range-slider-static2/range-slider-static2.component';
// import { SpeedometerStaticComponent } from './speedometer-static/speedometer-static.component';
// import { SpeedometerGuiltComponent } from './speedometer-guilt/speedometer-guilt.component';
// import { SpeedometerEatComponent } from './speedometer-eat/speedometer-eat.component';

// import { SpeedometerGuiltChartComponent } from './speedometer-guilt-chart/speedometer-guilt-chart.component';
// import { SpeedometerChartComponent } from './speedometer-chart/speedometer-chart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [/*RangeSliderComponent,*/ RangeSliderStaticComponent/*,SpeedometerStaticComponent,RangeSliderStatic2Component,SpeedometerGuiltComponent,SpeedometerEatComponent,SpeedometerChartComponent,SpeedometerGuiltChartComponent*/],
    exports: [/*RangeSliderComponent, */RangeSliderStaticComponent /*,SpeedometerStaticComponent,RangeSliderStatic2Component,SpeedometerGuiltComponent,SpeedometerEatComponent,SpeedometerChartComponent,SpeedometerGuiltChartComponent*/],
    imports : [
        IonicModule,
        FormsModule
    ]
})
export class ComponentsModule{}