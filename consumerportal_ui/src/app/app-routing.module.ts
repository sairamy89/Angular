import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsumerProfileComponent } from './consumer-profile/consumer-profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HeaderComponent } from './dashboard-master/header/header.component';
import { FooterComponent } from './dashboard-master/footer/footer.component';
import { ViewPayBillsComponent } from './view-pay-bills/view-pay-bills.component';
import { HtLoadProfileComponent } from './ht-load-profile/ht-load-profile.component';
import { HtReadingDetailsComponent } from './ht-reading-details/ht-reading-details.component';
import { PaymentHistoryComponent } from './view-pay-bills/payment-history/payment-history.component';

const routes: Routes = [
  { path: '', component: AccountComponent },
  { path: 'null', component: AccountComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'consumerprofile', component: ConsumerProfileComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'view-pay', component: ViewPayBillsComponent },
  { path: 'paymentHistory', component: PaymentHistoryComponent },
  { path: 'readingDetails', component: HtReadingDetailsComponent },
  { path: 'loadProfile', component: HtLoadProfileComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
