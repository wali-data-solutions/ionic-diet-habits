import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DbstorageService} from '../../services/dbstorage.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Platform  } from '@ionic/angular';
import { AppRoutingPreloaderService } from '../../app-routing-preloader-service';

declare var apprange;
@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.page.html',
  styleUrls: ['./screen3.page.scss'],
})
export class Screen3Page implements OnInit {
  textWait : string;
  textGoAnyway : string;
  desire : any;
  range :any;
  screen : string = 'screen3';
  
  constructor(private plt: Platform,private storage: Storage, private dbService: DbstorageService, private activeRoute: ActivatedRoute, private navCtrl: NavController,
    private routingService: AppRoutingPreloaderService) {
    this.dbService.getDatabaseState().subscribe(rdy => {
      if (rdy) {
          this.getSettings();
          
      }
    })
    
  }
  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.storage.get('desireLimit').then((result) => {
      if(result == null){
        this.desire = 70;

      }else{
        this.desire = result;
      }
      this.range = this.activeRoute.snapshot.paramMap.get('range');

      var sliderHeight = document.getElementById('range_slider_3b_static');
      var sliderleftHeight = document.getElementById('range_slider_3b');
      
      var height = this.plt.height() - 430;
      sliderHeight.setAttribute('style', 'height:'+height+'px;');
      sliderleftHeight.setAttribute('style', 'height:'+height+'px;');   
      apprange.initAndSetupTheSliders(this.range, true, this.desire, this.screen);
         
        
    });
    /* Preload routes of our choice */
    await this.routingService.preloadRoute('screen4');
  }

  getSettings() {
    return this.dbService.getSettings().then(data => {
      if(data){
        this.textGoAnyway = data[0].goanyway_text;
        this.textWait = data[0].wait_text;
      }else{
        console.log('No settings found in DB');
      }
      return data;
    })
  }

}
