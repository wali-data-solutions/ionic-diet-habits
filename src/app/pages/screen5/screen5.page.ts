import { Component, OnInit,NgZone  } from '@angular/core';
import { Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform  } from '@ionic/angular';
import { AppRoutingPreloaderService } from '../../app-routing-preloader-service';

@Component({
  selector: 'app-screen5',
  templateUrl: './screen5.page.html',
  styleUrls: ['./screen5.page.scss'],
})
export class Screen5Page implements OnInit {
  
  runTimer :boolean; // Flag
  hasStarted:boolean; // Flag
  hasFinished:boolean; // Flag
  
  remainingTime:any; // Remaining seconds used in timer
  displayTime:any; // Used to display in html
  stateType:any;
  operatingSystem : string;
  triggerDate:any = null;
  
  constructor(private zone: NgZone, private storage: Storage, private navCtrl: NavController, private activeRoute: ActivatedRoute,
    private localNotifications: LocalNotifications, private plt: Platform, private routingService: AppRoutingPreloaderService) {
      this.plt.ready().then(()=>{
        this.plt.resume.subscribe((e)=>{
          
          this.getLastTimeStamp().then((lastTimeStamp) => {
            if(lastTimeStamp != null){
                var currentTime1 = new Date().getTime();// getTime returns miliseconds.
                var notificationTime1 = new Date(lastTimeStamp).getTime();

                if(currentTime1 >= notificationTime1){
                  this.navCtrl.navigateForward('/my-eat-experience/'+this.stateType);
                }else{
                  location.reload();
                }
              }         
          });
        });
  
        this.plt.pause.subscribe((e)=>{
          this.stopTimer();
        });
      });
       
  }

  ionViewDidEnter() {
    this.operatingSystem = this.plt.is('ios') ? 'ios' : 'other';
    this.stateType = this.activeRoute.snapshot.paramMap.get('state-type');

    this.isLastExperienceGive().then((result) => {
      if(result != null && result== true){
        
        this.getStateType().then((resultSTateType) => {
          if(resultSTateType != null){
            this.getLastTimeStamp().then((lastTimeStamp) => {
              if(lastTimeStamp != null){
                var currentTime2 : any = new Date();
                
                var notificationTime2 : any = new Date(lastTimeStamp);
                var remainingSeconds = Math.floor(Math.abs(notificationTime2 - currentTime2));
                this.initTimer(remainingSeconds/1000);
                this.triggerDate = new Date(new Date().getTime() + remainingSeconds);
                this.scheduleNotification();
                this.startTimer();
              }
            });
          }
        });
      }else{
          this.storage.get('delayMins').then((result) => {
          var remainingSeconds = 15 * 60;
          if(result == null){
          }else{
            remainingSeconds = result  * 60;
          }
          this.displayTime = remainingSeconds / 60;
          this.initTimer(remainingSeconds);
          this.triggerDate = new Date(new Date().getTime() + (remainingSeconds*1000));
          this.scheduleNotification();
          this.startTimer();
        });
      }
    });
    /* Preload routes of our choice */
    //await this.routingService.preloadRoute('my-eat-experience');
  }
  
  ngOnInit() {
  }

  stopTimer(){
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
  }
  
  
  initTimer(remainderTime) {
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = remainderTime;
  }
  
  startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }
  
  timerTick() {
    setTimeout(() => {
      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.zone.run(() => {
        this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
        if (!this.runTimer) { return; }
      })

      if (this.remainingTime > 0) {
        this.timerTick();
        if (!this.runTimer) { return; }
      }
      else {
        this.hasFinished = true;
        this.navCtrl.navigateForward('/my-eat-experience/'+this.stateType);
      }
    }, 1000);
  }
  
  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString()); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var minutesString = '';
    var secondsString = '';
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }
  //set local notification for xy minute 
  scheduleNotification() {
    //alert('Notification created time = '+ this.triggerDate);
    this.localNotifications.schedule({
      id: 1,
      title: 'mylimit',
      text: 'Please provide eat enjoyment and guilt experience'+ '',
      smallIcon: 'resources/icon.png',
      trigger: {at: this.triggerDate},
    });
    this.storage.set('isExperienceGiven', true);
    this.storage.set('experienceState', this.stateType);
    this.storage.set('experienceCreatedTime', this.triggerDate);
  }
  //closed app 
  appClosed(){
    navigator['app'].exitApp();
  }

  eatEatEnjoyment(){
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = true;
    this.navCtrl.navigateForward('/my-eat-experience/'+this.stateType);
  }

  isLastExperienceGive(){
    return this.storage.get('isExperienceGiven');
  }

  getStateType(){
    return this.storage.get('experienceState');
  }
  getLastTimeStamp(){
    return this.storage.get('experienceCreatedTime');
  }
}
