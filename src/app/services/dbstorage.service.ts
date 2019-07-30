import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DbstorageService {
  
  
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite,  private platform: Platform, private http: Http) 
  {
    this.databaseReady = new BehaviorSubject(false);
    // this.connectDB();

    // setTimeout(() => {
    //   this.connectDB();
    // }, 500);
  }

  connectDB() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'mylimit.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.storage.get('database_filled').then(val => {
          if (val) {
            this.databaseReady.next(true);
          } else {
            this.fillDatabase();
          }
        });
      });
    });
  }

  fillDatabase() {
  this.http.get('../assets/dummyStateText.sql')
    .map(res => res.text())
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(data => {
          this.databaseReady.next(true);
          this.storage.set('database_filled', true);
        })
        .catch(e => console.error(e));
    });
  }
 
  getStateTextByType(type:any) {
    return this.database.executeSql("SELECT * FROM state_text where type = ?", [type]).then((data) => {
      let texts = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          texts.push({id: data.rows.item(i).id, name: data.rows.item(i).name, description: data.rows.item(i).description });
        }
      }else{
        console.log('data not found');
      }
      return texts;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getSettings() {
    return this.database.executeSql("SELECT * FROM setting", []).then((data) => {
      let settings = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          
          let trackBool = (data.rows.item(i).track == 1) ? true : false;

          settings.push({id: data.rows.item(i).id, mylimit: data.rows.item(i).mylimit,
            pause_time: data.rows.item(i).pause_time, go_text: data.rows.item(i).go_text,
            goanyway_text: data.rows.item(i).goanyway_text, wait_text: data.rows.item(i).wait_text,
            track: trackBool
          });
        }
      }else{
        console.log('data not found');
      }
      return settings;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  updateSettings(mylimit, pause_time, go_text, goanyway_text, wait_text, track) {

    if(mylimit != null || pause_time != null || go_text != null || goanyway_text != null || wait_text != null || track != null){

      let query = "UPDATE setting SET";
      let queryData = [];
      let addComma = false;
      /* #1# Set mylimit ## */
      if(mylimit != null){
        query = query + " mylimit=?";
        queryData.push(mylimit);
        addComma = true;
      }
      /* #2# Set pause_time ## */
      if(pause_time != null){
        if(addComma){
          query = query + ",";  
        }
        query = query + " pause_time=?";
        queryData.push(pause_time);
        addComma = true;
      }
      /* #3# Set state_text ## */
      if(go_text != null){
        if(addComma){
          query = query + ",";  
        }
        query = query + " go_text=?";
        queryData.push(go_text);
        addComma = true;
      }
      /* #4# Set state_text_type ## */
      if(goanyway_text != null){
        if(addComma){
          query = query + ",";  
        }
        query = query + " goanyway_text=?";
        queryData.push(goanyway_text);
        addComma = true;
      }
      /* #5# Set custom_state ## */
      if(wait_text != null){
        if(addComma){
          query = query + ",";  
        }
        query = query + " wait_text=?";
        queryData.push(wait_text);
        addComma = true;
      }
      /* #6# Set track ## */
      if(track != null){
        if(addComma){
          query = query + ",";  
        }
        query = query + " track=?";
        queryData.push(track);
        addComma = true;
      }

      return this.database.executeSql(query, queryData).then((check) => {
        if (check) {
          console.log('Settings update');
          return true;
        }else{
          console.log('Settings not update');
          return false;
        }
        console.log(query);
        console.dir(queryData);
      }, err => {
        console.log('Error: ', err);
        return [];
      });
    }
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  addExperience(enjoymentExperience, guiltExperience, check) {
    let data = [enjoymentExperience, guiltExperience, check]
    return this.database.executeSql("INSERT INTO tracking (satisfaction_experience, guilt_experience, chosen_state) VALUES (?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
  /** get tracking data  */
  getTracking(filterDate) {
    let query = "SELECT * FROM tracking where DATE(created_at) ";
    if(filterDate == 'yesterday'){
      query = query + "= DATE('now','-1 day')";
    }else if(filterDate == '7' || filterDate =='15'){
      query = query + " BETWEEN DATE('now', '"+-filterDate+1+" days') AND DATE('now')";
    }else{
      query = query + "= DATE('now')";
    }
    return this.database.executeSql(query, []).then((data) => {
      let trackingList = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          trackingList.push({ eatSatisfaction: data.rows.item(i).satisfaction_experience, guiltExperience: data.rows.item(i).guilt_experience, stateType: data.rows.item(i).chosen_state });
        }
      }
      return trackingList;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
  
  /* get tracking status from setting table */
  getTrackStatus() {
    
    return this.database.executeSql("SELECT track FROM setting", []).then((data) => {
      let trackBool=true;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let trackBool = (data.rows.item(i).track == 1) ? true : false;
          return trackBool;
        }
      }else{
        console.log('track data not found');
      }
      return trackBool;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  /* add decision statics data e.g go, goanyway, wait */
  addDecisionStatistic(goDecision, goAnywayDecision, waitDecision) {
    let data = [goDecision, goAnywayDecision, waitDecision]
    return this.database.executeSql("INSERT INTO statistic (go_count, go_anyway_count, wait_count) VALUES (?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
  /**  get bar chart data  */
  getBarChartData(barChartFilterDate) {
    let query = "SELECT sum(go_count) as go_count, sum(go_anyway_count) as go_anyway_count, sum(wait_count) as wait_count FROM statistic where DATE(created_at) ";
    if(barChartFilterDate == 'yesterday'){
      query = query + "= DATE('now','-1 day')";
    }else if(barChartFilterDate == '7' || barChartFilterDate =='15'){
      query = query + " BETWEEN DATE('now', '"+-barChartFilterDate+1+" days') AND DATE('now')";
    }else{
      query = query + "= DATE('now')";
    }
    return this.database.executeSql(query, []).then((data) => {
      let result = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          result.push({ go: data.rows.item(i).go_count, goanyway: data.rows.item(i).go_anyway_count, wait: data.rows.item(i).wait_count });
        }
      }
      return result;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  /** get tracking data  */
  getTrackingAverage(eatAverageFilterDate) {
    let query = "SELECT AVG(satisfaction_experience) as satisfaction_experience, AVG(guilt_experience) as guilt_experience, count(id) as total FROM tracking where DATE(created_at) ";
    if(eatAverageFilterDate == 'yesterday'){
      query = query + "= DATE('now','-1 day')";
    }else if(eatAverageFilterDate == '7' || eatAverageFilterDate =='15'){
      query = query + " BETWEEN DATE('now', '"+-eatAverageFilterDate+1+" days') AND DATE('now')";
    }else{
      query = query + "= DATE('now')";
    }
    return this.database.executeSql(query, []).then((data) => {
      let trackingList = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          trackingList.push({ eatSatisfaction: data.rows.item(i).satisfaction_experience, guiltExperience: data.rows.item(i).guilt_experience, total: data.rows.item(i).total });
        }
      }
      return trackingList;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
}