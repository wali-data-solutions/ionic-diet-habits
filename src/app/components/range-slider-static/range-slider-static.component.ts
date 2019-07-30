import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-range-slider-static',
  templateUrl: './range-slider-static.component.html',
  styleUrls: ['./range-slider-static.component.scss'],
})
export class RangeSliderStaticComponent implements OnInit {
  desireLimit: any;
  min: 0;
  max:100;
  constructor(private storage: Storage) { 
    this.storage.get('desireLimit').then((result) => {
      if(result == null){
        result = 70;
      }
      this.desireLimit = result;
    });
  }

  ngOnInit() {}

}
