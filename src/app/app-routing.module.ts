import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingPreloaderService } from './app-routing-preloader-service';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'my-eat-experience/:state-type', loadChildren: './pages/my-eat-experience/my-eat-experience.module#MyEatExperiencePageModule' },
  { path: 'screen2/:range', loadChildren: './pages/screen2/screen2.module#Screen2PageModule' },
  { path: 'screen2b/:range', loadChildren: './pages/screen2b/screen2b.module#Screen2bPageModule' },
  { path: 'screen4/:state-type', loadChildren: './pages/screen4/screen4.module#Screen4PageModule' },
  { path: 'checkout-screen', loadChildren: './pages/checkout-screen/checkout-screen.module#CheckoutScreenPageModule' },
  { path: 'screen5/:state-type', loadChildren: './pages/screen5/screen5.module#Screen5PageModule' },
  { path: 'screen3/:range', loadChildren: './pages/screen3/screen3.module#Screen3PageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppRoutingPreloaderService })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
