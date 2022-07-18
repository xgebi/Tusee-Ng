import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/home',
},
  {
  path: 'home',
  component: HomeComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard]

},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: 'registration',
  component: RegistrationComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
