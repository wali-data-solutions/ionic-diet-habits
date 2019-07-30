import { Component, OnInit } from '@angular/core';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Storage} from '@ionic/storage';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { resolve } from 'url';
import { Platform, AlertController } from '@ionic/angular';
import { DbstorageService } from '../../services/dbstorage.service';
import { AppRate } from '@ionic-native/app-rate/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {
  setting: any;
  desireLimit : any;
  delayMins : any;
  track: boolean;
  goSelected: string;
  goAnywaySelected: string;
  waitSelected: string;

  isFirstTimeTrackingChanged:boolean = true;
  isGoTextFirstTimeChange:boolean = true;
  isGoAnyWayTextFirstTimeChange:boolean = true;
  isWaitTextFirstTimeChange:boolean = true;

  text = {
    goText: [],
    goAnywayText: [],
    waitText: [],
  };
  
  settingsJson = {
    desireValue: [
      { description: "20" },
      { description: "30" },
      { description: "40" },
      { description: "50" },
      { description: "60" },
      { description: "70" },
      { description: "80" },
      { description: "90" }
    ],
    pauseMinutes : [
      { description: "5" },
      { description: "10" },
      { description: "15" },
      { description: "20" },
      { description: "30" }
    ]
  }

  constructor(
    private selector: WheelSelector, private toast : Toast, private storage: Storage,
    private appRate: AppRate,
    private dbService: DbstorageService,
    private alertController: AlertController)
  {
    /* Get track settings value */
    this.dbService.getDatabaseState().subscribe(rdy => {
      //this.dbService.connectDB();
      if (rdy) {
        this.getSettings();
      }
    })
  }

  ionViewDidEnter() {
    
    /* Show Desire limit default value on button */
    this.getDesireLimitFromStorage().then((result) => {
      if(result==null)
        this.desireLimit=70;
      else
        this.desireLimit = result;
    });

    /* Show Pause mins default value on button */
    this.getdelayMinsFromStorage().then((result) => {
      if(result==null)
        this.delayMins = 15;
      else
        this.delayMins = result;
    });
    
  }
  setDesireLimit() {
    
    this.getDesireLimitFromStorage().then((result) => {
      if(result == null){
        result = 70;
      }
      this.desireLimit = result;
      let mylimitIndex = this.getMylimitIndex(result);
      this.selector.show({
        title: 'mylimit',
        items: [
          this.settingsJson.desireValue
        ],
        positiveButtonText: 'Choose',
        negativeButtonText: 'Cancel',
        defaultItems: [
          { index: 0, value: this.settingsJson.desireValue[mylimitIndex].description }
        ]
      }).then(
        result => {
          this.storage.set('desireLimit', result[0].description);
          this.desireLimit = result[0].description;
          // this.toast.show(result[0].description, '3000', 'center').subscribe(
          //   toast => {
          //     console.log(toast);
          //   }
          // );

        },
        err => console.log('Code Error is : ', err)
      );
    });
  }

  setPauseTime() {
    this.getdelayMinsFromStorage().then((result) => {
      if(result == null){
        result = 15;
      }
      this.delayMins = result;
      let mydelayIndex = this.getMydelayIndex(result);
      this.selector.show({
        title: 'Delay for self-rating (minutes)',
        items: [
          this.settingsJson.pauseMinutes
        ],
        positiveButtonText: 'Choose',
        negativeButtonText: 'Cancel',
        defaultItems: [ 
          { index: 0, value: this.settingsJson.pauseMinutes[mydelayIndex].description }
        ]
      }).then(
        result => {
          this.storage.set('delayMins', result[0].description);
          this.delayMins = result[0].description;
          // this.toast.show(result[0].description, '3000', 'center').subscribe(
          //   toast => {
          //     console.log(toast);
          //   }
          // );
        },
        err => console.log('Error: ', err)
        );
    });
  }

  getMylimitIndex(value){
    let arrayLength = this.settingsJson.desireValue.length;
    for(let i = 0; i < arrayLength; i++){
      if(this.settingsJson.desireValue[i].description == value){
        return i;
      }
    }
  }

  getMydelayIndex(value){
    let arrayLength = this.settingsJson.pauseMinutes.length;
    for(let i = 0; i < arrayLength; i++){
      if(this.settingsJson.pauseMinutes[i].description == value){
        return i;
      }
    }
  }

  getDesireLimitFromStorage(){
    return this.storage.get('desireLimit');
  }

  getdelayMinsFromStorage(){
    return this.storage.get('delayMins');
  }

  getSettings(){
    return this.dbService.getSettings().then(data => {
      if(data){
        this.setting = data;
        this.track = this.setting[0].track;
        // this.desireLimit = this.setting[0].mylimit;
        // this.delayMins = this.setting[0].pause_time;
        this.goSelected = this.setting[0].go_text;
        this.goAnywaySelected = this.setting[0].goanyway_text;
        this.waitSelected = this.setting[0].wait_text;
        this.getStateTextByType('Go');
        this.getStateTextByType('Go anyway');
        this.getStateTextByType('Wait');
      }else{
        console.log('No settings found in DB');
      }
      return data;
    })
  }

  getStateTextByType(type) {
    this.dbService.getStateTextByType(type).then(data => {
      if(type == 'Go'){
        this.text.goText = data;
        this.pushCustomText(data, this.goSelected, type);
      }
      if(type == 'Go anyway'){
        this.text.goAnywayText = data;
        this.pushCustomText(data, this.goAnywaySelected, type);
      }
      if(type == 'Wait'){
        this.text.waitText = data;
        this.pushCustomText(data, this.waitSelected, type);
      }
    })
  }

  pushCustomText(textArray, selectedText ,type){
    let notCustom = false;
    let customObj = {};
    for(let text of textArray){
      if(text.description === selectedText){
        notCustom = true;
        break;
      }
    }
    /* Make custom text object */
    if(notCustom){
      customObj = {'name': 'Own text', 'description': 'Own text', 'type': type};
    }else{
      customObj = {'name': 'Own text', 'description': selectedText, 'type': type};
    }
    /* Push custom text object to array */
    if(type == 'Go'){
      this.text.goText.push(customObj);
    }
    if(type == 'Go anyway'){
      this.text.goAnywayText.push(customObj);
    }
    if(type == 'Wait'){
      this.text.waitText.push(customObj);
    }
  }

  showCustomTextToast(){
    var text = 'Enter at least 4 characters for custom text!';
    this.toast.show(text, '3000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  async customTextGo(val){
    const customAlert = await this.alertController.create({
      header: 'Go Custom Text',
      cssClass: 'my-custom-alert',
      inputs:[{
        type: 'text',
        name: 'addCustomText',
        value: val,
        placeholder: 'Enter custom text'
      }],
      buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'alertButton'
      },
      {
        text: 'Save',
        cssClass: 'alertButton',
        handler: (inputData)=>{
          if(inputData.addCustomText != "" && inputData.addCustomText.length > 3){
            this.goSelected = inputData.addCustomText;
            this.updateTextList(this.goSelected, 'Go');
            this.goTextUpdate();
          }else{
            this.showCustomTextToast();
          }
        }
      }]
    });
    await customAlert.present();
  }

  async customTextGoAnyway(val){
    const customAlert = await this.alertController.create({
      header: 'Go Anyway Custom Text',
      cssClass: 'my-custom-alert',
      inputs:[{
        type: 'text',
        name: 'addCustomText',
        value: val,
        placeholder: 'Enter custom text'
      }],
      buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'alertButton'
      },
      {
        text: 'Save',
        cssClass: 'alertButton',
        handler: (inputData)=>{
          if(inputData.addCustomText != "" && inputData.addCustomText.length > 3){
            this.goAnywaySelected = inputData.addCustomText;
            this.updateTextList(this.goAnywaySelected, 'Go anyway');
            this.goAnywayTextUpdate();
          }else{
            this.showCustomTextToast();
          }
        }
      }]
    });
    await customAlert.present();
  }

  async customTextWait(val){
    const customAlert = await this.alertController.create({
      header: 'Wait Custom Text',
      cssClass: 'my-custom-alert',
      inputs:[{
        type: 'text',
        name: 'addCustomText',
        value: val,
        placeholder: 'Enter custom text'
      }],
      buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'alertButton',
      },
      {
        text: 'Save',
        cssClass: 'alertButton',
        handler: (inputData)=>{
          if(inputData.addCustomText != "" && inputData.addCustomText.length > 3){
            this.waitSelected = inputData.addCustomText;
            this.updateTextList(this.waitSelected, 'Wait');
            this.waitTextUpdate();
          }else{
            this.showCustomTextToast();
          }
        }
      }]
    });
    await customAlert.present();
  }

  updateTextList(customText, type){
    /* Refresh texts array */
    if(type == 'Go'){
      for(let i = 0; i <= this.text.goText.length; i++){
        if(this.text.goText[i].name === 'Own text'){
          this.text.goText[i].description = customText;
          break;
        }
      }
    }
    else if(type == 'Go anyway'){
      for(let i = 0; i <= this.text.goAnywayText.length; i++){
        if(this.text.goAnywayText[i].name === 'Own text'){
          this.text.goAnywayText[i].description = customText;
          break;
        }
      }
    }
    else if(type == 'Wait'){
      for(let i = 0; i <= this.text.waitText.length; i++){
        if(this.text.waitText[i].name === 'Own text'){
          this.text.waitText[i].description = customText;
          break;
        }
      }
    }
  }

  trackingChange(){
    let enableValue = 0;
    let trackingText : string = 'Tracking Disabled!';
    if(this.track == true){
      enableValue = 1;
      trackingText = 'Tracking Enabled!';
    }
    
    this.dbService.updateSettings(null, null, null, null, null, enableValue).then(data => {
      if(this.isFirstTimeTrackingChanged ==false){

        // this.toast.show(trackingText, '3000', 'center').subscribe(
        //   toast => {
        //     console.log(toast);
        //   }
        // );
      }
    });
    this.isFirstTimeTrackingChanged = false;
  }

  goTextUpdate(){
    this.dbService.updateSettings(null, null, this.goSelected, null, null, null).then(data => {
      if(this.isGoTextFirstTimeChange==false){
        // this.toast.show('"'+this.goSelected + '" saved!', '3000', 'center').subscribe(
        //   toast => {
        //     console.log(toast);
        //   }
        // );  
      }
    });
    this.isGoTextFirstTimeChange = false;
  }
  goAnywayTextUpdate(){
    this.dbService.updateSettings(null, null, null, this.goAnywaySelected, null, null).then(data => {
      if(this.isGoAnyWayTextFirstTimeChange ==false){

        // this.toast.show('"'+this.goAnywaySelected + '" saved!', '3000', 'center').subscribe(
        //   toast => {
        //     console.log(toast);
        //   }
        // );  
      }
    });
    this.isGoAnyWayTextFirstTimeChange = false;
  }
  waitTextUpdate(){
    this.dbService.updateSettings(null, null, null, null, this.waitSelected, null).then(data => {
      if(this.isWaitTextFirstTimeChange==false){

        // this.toast.show('"'+this.waitSelected + '" saved!', '3000', 'center').subscribe(
        //   toast => {
        //     console.log(toast);
        //   }
        // );  
      }
    });
    this.isWaitTextFirstTimeChange=false;
  }

  ngOnInit() {
  }

  rateApp(){
    // set certain preferences
    this.appRate.preferences.storeAppURL = {
      ios: '1216856883',
      android: 'market://details?id=com.devdactic.crossingnumbers'
    }
    
// Opens the rating immediately no matter what preferences you set
    // this.appRate.promptForRating(true);
  }

}
