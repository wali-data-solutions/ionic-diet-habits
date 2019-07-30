import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DbstorageService} from '../../services/dbstorage.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Platform  } from '@ionic/angular';
import { AppRoutingPreloaderService } from '../../app-routing-preloader-service';

declare var apprange;

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.page.html',
  styleUrls: ['./screen2.page.scss'],
})
export class Screen2Page implements OnInit {
  text : string;
  desire : any;
  myLimitValue:any
  screen : string = 'screen2';

  constructor(private plt: Platform,private storage: Storage, private dbService: DbstorageService, private activeRoute: ActivatedRoute, private navCtrl: NavController,
     private routingService: AppRoutingPreloaderService) {
    this.dbService.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getSettings();
      }
    })
  }

  async ionViewDidEnter() {
      this.storage.get('desireLimit').then((result) => {
        if(result == null){
          this.desire = 70;

        }else{
          this.desire = result;
        }
        
        let rangeValue = Number(this.activeRoute.snapshot.paramMap.get('range'));
        var sliderHeight = document.getElementById('range_slider_static');
        var height = this.plt.height() - 280;
        sliderHeight.setAttribute('style', 'height:'+height+'px;');
        apprange.initAndSetupTheSliders(rangeValue, true,this.desire, this.screen);
        
        var emoticons = document.getElementById('emoticons');
        emoticons.setAttribute('style', 'height:'+height+'px;');
        
      });
      /* Preload routes of our choice */  
      await this.routingService.preloadRoute('screen3');
    }
    
    getSettings() {
      return this.dbService.getSettings().then(data => {
        if(data){
          this.text = data[0].go_text;
        }else{
          console.log('No settings found in DB');
        }
        return data;
      })
    }

    ngOnInit() {
    }
    //go to screen 4 with go state status
    geteatExperienceStatus(){
      //get tracking status
      this.dbService.getTrackStatus().then(data => {
        if(data){
          this.navCtrl.navigateForward('/screen4/go');
        }else{
            this.addDecisionStatistic();
            this.navCtrl.navigateForward('/checkout-screen');
        }
      })
    }

     /*insert data into decision statics table */
   addDecisionStatistic() {
    this.dbService.addDecisionStatistic(1, 0, 0)
    .then(data => {
      
    });
  }
    
}
