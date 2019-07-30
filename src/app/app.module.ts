import { NgModule, ErrorHandler  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { DbstorageService} from './services/dbstorage.service';
import { SQLite} from '@ionic-native/sqlite/ngx';
import { SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { Crashlytics } from '@ionic-native/fabric/ngx';
import { GlobalErrorHandler } from './app-error-handler';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    LocalNotifications,
    WheelSelector,
    Toast,
    DatePipe,
    AppRate,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: ErrorHandler, useClass: GlobalErrorHandler },
    DbstorageService,
    SQLite,
    SQLitePorter,
    GoogleAnalytics,
    Crashlytics
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
