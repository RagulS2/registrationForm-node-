import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LogInComponent } from './log-in/log-in.component';
import { FormComponent } from './form/form.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path:'form',component:FormComponent},
  {path:'log-in', component:LogInComponent},
  {path:'profile/:id',component:ProfileComponent},
  { path: 'verify/:token', component: VerifyComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
