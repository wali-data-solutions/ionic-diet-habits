import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DbstorageService} from '../../services/dbstorage.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-range-slider-static2',
  templateUrl: './range-slider-static2.component.html',
  styleUrls: ['./range-slider-static2.component.scss'],
})
export class RangeSliderStatic2Component implements OnInit {
  desireLimit: any;
  min: 0;
  max:100;
  constructor(private storage: Storage, private dbService: DbstorageService, private activeRoute: ActivatedRoute, private navCtrl: NavController) {
    this.storage.get('desireLimit').then((result) => {
      if(result == null){
        result = 70;
      }
      this.desireLimit = result;
    });
   }

  ngOnInit() {}

  checkoutScreen(){
    this.addDecisionStatistic(0, 0, 1);
    this.navCtrl.navigateForward('/checkout-screen');
  }

   /*insert data into decision statics table */
   addDecisionStatistic(go_flag = 0, go_anyway_flag = 0, wait_flag = 0) {
    this.dbService.addDecisionStatistic(go_flag, go_anyway_flag, wait_flag)
    .then(data => {
      
    });
  }

  screen4(){
    //get tracking status
    this.dbService.getTrackStatus().then(data => {
      if(data){
        this.navCtrl.navigateForward('/screen4/goAnyway');
      }else{
          this.addDecisionStatistic(0, 1, 0);
          this.navCtrl.navigateForward('/checkout-screen');
      }
    })
  }

}
