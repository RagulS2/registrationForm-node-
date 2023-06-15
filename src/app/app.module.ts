import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ServiceService } from './service.service';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyComponent } from './verify/verify.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LogInComponent,
    ProfileComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
