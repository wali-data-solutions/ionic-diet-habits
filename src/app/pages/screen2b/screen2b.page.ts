import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Platform  } from '@ionic/angular';
import { AppRoutingPreloaderService } from '../../app-routing-preloader-service';

declare var apprange;

@Component({
  selector: 'app-screen2b',
  templateUrl: './screen2b.page.html',
  styleUrls: ['./screen2b.page.scss'],
})
export class Screen2bPage implements OnInit {
  desire : any;
  range : any;
  screen : string = 'screen2b';

  constructor(private plt: Platform,private activeRoute: ActivatedRoute,public datepipe: DatePipe, private storage: Storage, private navCtrl: NavController, private routingService: AppRoutingPreloaderService) { }

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
        var sliderHeight = document.getElementById('range_slider_static');
        var height = this.plt.height() - 250;
        sliderHeight.setAttribute('style', 'height:'+height+'px;');
        apprange.initAndSetupTheSliders(this.range, true,this.desire, this.screen);
        document.getElementById('emoticons').setAttribute('style', 'height:'+height+'px;');
      });
      /* Preload routes of our choice */
      await this.routingService.preloadRoute('screen3');
   }

   screen3(){
    this.navCtrl.navigateForward('/screen3/'+this.range);
   }

}
