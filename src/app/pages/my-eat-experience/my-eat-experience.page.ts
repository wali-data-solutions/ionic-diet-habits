import { Component, OnInit,NgZone } from '@angular/core';
import { DbstorageService} from '../../services/dbstorage.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Storage} from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AppRoutingPreloaderService } from '../../app-routing-preloader-service';

@Component({
  selector: 'app-my-eat-experience',
  templateUrl: './my-eat-experience.page.html',
  styleUrls: ['./my-eat-experience.page.scss'],
})

export class MyEatExperiencePage implements OnInit {

  buttonStatus : any;
  myGoodExperience : any;
  myBadExperience : any;
  goState : any;
  goAnywayState : any;
  stateType:any;
  constructor(private storage: Storage,private zone: NgZone,private dbService: DbstorageService, private activeRoute: ActivatedRoute, private navCtrl: NavController,
    private localNotifications: LocalNotifications, public platform: Platform, private routingService: AppRoutingPreloaderService) { 
    this.buttonStatus=true;
    this.myGoodExperience =0;
    this.myBadExperience =0;
    this.goState =0;
    this.goAnywayState =0;
    this.stateType = this.activeRoute.snapshot.paramMap.get('state-type');
    // this.scheduleNotificationClearEvent();
    this.storage.set('isExperienceGiven', false);
  }

  ngOnInit() {
  }

  enjoymentExperienceEvent(){

    //var needleEat = document.getElementById('needle-eat');
    var needleEat = document.getElementsByClassName('needle-eat')[0];
    var eatStatisfactionNeedle = -90 + 1.8 * (this.myGoodExperience);
    //needleEat.style.transform = 'rotate('+eatStatisfactionNeedle+'deg)';
    needleEat.setAttribute('style', 'transform:rotate('+eatStatisfactionNeedle+'deg)');
    this.zone.run(() => {
      if(this.myBadExperience>0 || this.myGoodExperience >0 )
        this.buttonStatus=false;
      else
        this.buttonStatus=true;
    })
  }

  badExperienceEvent(){
    //var needleGuilt = document.getElementById('needle-guilt');
    var needleGuilt = document.getElementsByClassName('needle-guilt')[0];
    var guiltNeedle = -90 + 1.8 * (this.myBadExperience);
    //needleGuilt.style.transform = 'rotate('+guiltNeedle+'deg)';
    needleGuilt.setAttribute('style', 'transform:rotate('+guiltNeedle+'deg)');
    this.zone.run(() => {
      if(this.myBadExperience>0 || this.myGoodExperience >0 )
        this.buttonStatus=false;
      else
        this.buttonStatus=true;
    })
  }

  addExperience() {
    
    if(this.stateType == 'go'){
      this.goState = 1;
    }else if(this.stateType == 'goAnyway'){
        this.goAnywayState = 1;
    }
    this.dbService.addExperience(this.myGoodExperience, this.myBadExperience, this.stateType)
    .then(data => {
      this.addDecisionStatistic();
      this.navCtrl.navigateForward('/checkout-screen');

    });
    
  }

  addDecisionStatistic() {
    this.dbService.addDecisionStatistic(this.goState, this.goAnywayState, 0)
    .then(data => {
      
    });
  }
  //clear scheduler notification
  scheduleNotificationClearEvent(){
   this.platform.ready().then(() => {
      this.localNotifications.clear(1);
    });
    this.localNotifications.cancelAll().then(() => {
    });
  }
  //remove notification and go to reminder screen 
  laterReminder(){
      this.scheduleNotificationClearEvent();
      this.storage.set('isExperienceGiven', false);
      this.navCtrl.navigateForward('/screen5/'+this.stateType);
  }

  /* Preload routes of our choice */
  async ionViewDidEnter() {
    this.scheduleNotificationClearEvent();
    await this.routingService.preloadRoute('checkout-screen');
  }
}
