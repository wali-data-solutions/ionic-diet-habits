import { Component, OnInit  } from '@angular/core';
import { Storage} from '@ionic/storage';
import { NavController  } from '@ionic/angular';
import { Platform  } from '@ionic/angular';
import { AppRoutingPreloaderService } from '../../app-routing-preloader-service';


declare var apprange;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  desireLimit : number;
  range : number = 0;
  sliderElement: any;
  sliderKnobElement: any;
  fingerPrintElement: any;
  screen : string = 'home';
  
  constructor(private plt: Platform,private storage: Storage, private navCtrl: NavController, 
    private routingService: AppRoutingPreloaderService){
  }
  
  //initial range bar value when page fully load and active
  async ionViewDidEnter() {


    this.desireLimit = 70;
    apprange.initAndSetupTheSliders(this.range, false, this.desireLimit, this.screen);
    
    this.sliderElement = document.getElementById('desire');
    this.sliderElement.setAttribute('disabled', 'true');
    var sliderHeight = document.getElementById('range_slider');
    var height = this.plt.height() - 230;
    sliderHeight.setAttribute('style', 'height:'+height+'px;');

    this.sliderKnobElement = document.getElementsByClassName('range-slider__thumb')[0];
    this.fingerPrintElement = document.getElementsByClassName('finger-print-button')[0];
    //this.sliderKnobElement.classList.add("animated", "infinite", "heartBeat");
    
    this.storage.get('desireLimit').then((result) => {
      if(result == null){
      }else{
        this.desireLimit = result;
      }
    });
    
    /* Preload routes of our choice */
    await this.routingService.preloadRoute('analytics');
    await this.routingService.preloadRoute('settings');
    await this.routingService.preloadRoute('screen2');
    await this.routingService.preloadRoute('screen2b');
  }

  ngOnInit() {}

  screen2(){
    this.sliderElement.removeAttribute("disabled");
    let a : number = Number(this.range);
    let b : number = Number(this.desireLimit);
    if(a >= b){
      this.navCtrl.navigateForward('/screen2/'+this.range);
    }else{
      this.navCtrl.navigateForward('/screen2b/'+this.range);
    }
  }

  touchStart(){
    this.sliderElement.removeAttribute("disabled");
    this.showThumb2();
    this.sliderKnobElement.classList.add("animated", "infinite", "heartBeat");
    this.fingerPrintElement.classList.remove("animated", "infinite", "pulse");
  }

  touchEnd(){
    this.sliderElement.setAttribute('disabled', 'true');
    this.hideThumb2();
    this.sliderKnobElement.classList.remove("animated", "infinite", "heartBeat");
    this.fingerPrintElement.classList.add("animated", "infinite", "pulse");
  }

  hideThumb2(){
    var thumb = document.getElementById('me');
    thumb.style.display = 'none';
  }

  showThumb2(){
    var thumb = document.getElementById('me');
    thumb.style.display = 'block';
  }
  
}
