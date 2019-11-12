import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsumerProfileComponent } from './consumer-profile/consumer-profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ViewPayBillsComponent } from './view-pay-bills/view-pay-bills.component';
import { HeaderComponent } from './dashboard-master/header/header.component';
import { FooterComponent } from './dashboard-master/footer/footer.component';
import { HtReadingDetailsComponent } from './ht-reading-details/ht-reading-details.component';
import { HtLoadProfileComponent } from './ht-load-profile/ht-load-profile.component';
import { PaymentHistoryComponent } from './view-pay-bills/payment-history/payment-history.component';
import { ChartsModule } from 'ng2-charts';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { MustMatchDirective } from './directives/must-match.directive';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    DashboardComponent,
    ConsumerProfileComponent,
    FeedbackComponent,
    ViewPayBillsComponent,
    HeaderComponent,
    FooterComponent,
    HtReadingDetailsComponent,
    HtLoadProfileComponent,
    PaymentHistoryComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    PasswordStrengthMeterModule,
    AvatarModule,
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU',
      // siteKey: '6Lcjn7YUAAAAACdVYgDFNZdqURz5kyuYDu5lhNcU',
    } as RecaptchaSettings
  }],
  exports: [
    ChartsModule,
    MustMatchDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
