import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';

declare var apprange;

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent implements OnInit {
  desire: any;
  min: 0;
  max:100;
  constructor(private storage: Storage) {
    
  }

  ngOnInit() {}

  
  // setDesire(){
  //   console.log('this.desire in component = ' + this.desire);
  //   this.storage.set('desire', this.desire);
  // }
  //getRangeValue(){
  //    console.log(this.rangeValue);
  // }

   
}
