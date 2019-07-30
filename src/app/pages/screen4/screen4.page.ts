import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DbstorageService} from '../../services/dbstorage.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppRoutingPreloaderService } from '../../app-routing-preloader-service';

@Component({
  selector: 'app-screen4',
  templateUrl: './screen4.page.html',
  styleUrls: ['./screen4.page.scss'],
})
export class Screen4Page implements OnInit {
  goState : any;
  goAnywayState : any;
  stateType:any
  constructor(private storage: Storage, private dbService: DbstorageService, private activeRoute: ActivatedRoute, private navCtrl: NavController,
    private routingService: AppRoutingPreloaderService) { 
      //set state type
      this.goState = 0;
      this.goAnywayState = 0;
      this.stateType = this.activeRoute.snapshot.paramMap.get('state-type');
      if(this.stateType == 'go'){
        this.goState = 1;
      }else if(this.stateType == 'goAnyway'){
          this.goAnywayState = 1;
      }

  }
  
  /* Preload routes of our choice */
  async ionViewDidEnter() {
    await this.routingService.preloadRoute('screen3');
  }

  ngOnInit() {
  }
  
  getTrackingWaitScreen(){
    this.navCtrl.navigateForward('/screen5/'+ this.stateType);
  }
 
  checkoutScreen(){
    console.log(this.goState);
    console.log(this.goAnywayState);
    this.addDecisionStatistic();
    this.navCtrl.navigateForward('/checkout-screen');
  }

   /*insert data into decision statics table */
   addDecisionStatistic() {
    this.dbService.addDecisionStatistic(this.goState, this.goAnywayState, 0)
    .then(data => {
      
    });
  }


}
