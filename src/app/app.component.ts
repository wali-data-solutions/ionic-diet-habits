import { Component, ViewChildren, QueryList } from '@angular/core';
import { Platform, IonRouterOutlet} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { NavController  } from '@ionic/angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Storage} from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { Crashlytics } from '@ionic-native/fabric/ngx';
import { DbstorageService } from 'src/app/services/dbstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    public platform: Platform,
    private localNotifications: LocalNotifications,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private toast: Toast,
    private navCtrl:NavController,
    private ga: GoogleAnalytics,
    private storage: Storage,
    private dbService: DbstorageService
    // private crashlytics :Crashlytics
  ) {
    this.initializeApp();
    setTimeout(() => {
      this.backButtonEvent();
      this.dbService.connectDB();
    }, 200);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();    
      // if (this.splashScreen) {
      //     setTimeout(() => {
      //         this.splashScreen.hide();
      //     }, 2000);
      // }


      this.ga.startTrackerWithId('UA-136718161-1').then(() => {
        this.ga.trackView('Start Tracking');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));

      /* Notification click only works in Android. It doesn't work in IOS for some reasom. */
      // this.localNotifications.on('click').subscribe(notification => {
      //   this.splashScreen.hide();
      //   this.getStateType().then((resultSTateType) => {
      //     this.navCtrl.navigateForward('/my-eat-experience/'+resultSTateType);
      //   });
      // });

      //check notification
      this.isLastExperienceGive().then((result) => {
        if(result != null && result== true){
          this.getStateType().then((resultSTateType) => {
           
            if(resultSTateType != null  && result== true){
               this.getLastTimeStape().then((lastTimeStape) => {
              if(lastTimeStape != null){
                  var currentTime = new Date().getTime();// getTime returns miliseconds.
                  var notificationTime = new Date(lastTimeStape).getTime();
                  if(currentTime >= notificationTime){
                    var notificationTime = new Date(lastTimeStape).getTime() + (10*60*1000);
                    
                    if(currentTime > notificationTime){
                      this.storage.set('isExperienceGiven', false);
                      this.scheduleNotificationClearEvent();
                      this.navCtrl.navigateForward('/tabs/home');
                    }else{
                      this.navCtrl.navigateForward('/my-eat-experience/'+resultSTateType);
                    }
                  }else{
                    this.navCtrl.navigateForward('/screen5/'+resultSTateType);
                  }
                  this.hideSplashScreen();
                } else{
                  this.splashScreen.hide();
                }
              });
            } else{
              this.splashScreen.hide();
            }
          });
        }else{
          this.splashScreen.hide();
        }
      });
    });
  }

  hideSplashScreen(){
    if (this.splashScreen) {
      setTimeout(() => {
          this.splashScreen.hide();
      }, 750);
    }
  }

    // active hardware back button
    backButtonEvent() {
      this.platform.backButton.subscribe(async () => {

          this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
            console.log("url equal to :",this.router.url);
             if(this.router.url.includes("screen5")){

              console.log("Screen 5 back press handled");
              navigator['app'].exitApp(); // work in ionic 4
              }else if(this.router.url.includes("my-eat-experience")){

                console.log("Screen 5 back press handled");
                navigator['app'].exitApp(); // work in ionic 4
              }else if(this.router.url.includes("screen2") || this.router.url.includes("screen2b")){
                console.log("change rout path to home screen from 2a|2b");
              
                //this.navCtrl.navigateForward('/tabs/home');
                var sliderElement = document.getElementById('desire');
                sliderElement.setAttribute('disabled', 'true');
              }
              if (outlet && outlet.canGoBack()) {
              outlet.pop();
              
              } else if (this.router.url === '/tabs/home' || this.router.url === "/tabs" ) {
                  if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                      // this.platform.exitApp(); // Exit from app
                      navigator['app'].exitApp(); // work in ionic 4

                  } else {
                      this.toast.show(
                          `Press back again to exit App.`,
                          '2000',
                          'center')
                          .subscribe(toast => {
                              // console.log(JSON.stringify(toast));
                          });
                      this.lastTimeBackPress = new Date().getTime();
                  }
              }else if(this.router.url === '/tabs/settings' || this.router.url === '/tabs/analytics'){
                console.log("change rout path to home screen");
              
                this.navCtrl.navigateForward('/tabs/home');
              }
          });
          console.log("the end",this.router.url);
      });
  }
  
  isLastExperienceGive(){
    return this.storage.get('isExperienceGiven');
  }

  getStateType(){
    return this.storage.get('experienceState');
  }
  getLastTimeStape(){
    return this.storage.get('experienceCreatedTime');
  }
  
  //clear scheduler notification
  scheduleNotificationClearEvent(){
    this.platform.ready().then(() => {
       this.localNotifications.clear(1);
     });
     this.localNotifications.cancelAll().then(() => {
     });
   }
}
