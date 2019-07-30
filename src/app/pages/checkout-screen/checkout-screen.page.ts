import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-checkout-screen',
  templateUrl: './checkout-screen.page.html',
  styleUrls: ['./checkout-screen.page.scss'],
})
export class CheckoutScreenPage implements OnInit {
  sTimeout: any;
  constructor() { 
    this.sTimeout = setTimeout(() => this.showDelay(), 3000);

    }

    ngOnInit() {
      
    }
    private showDelay() { 
      navigator['app'].exitApp();
    }
   

  
    
    

}
