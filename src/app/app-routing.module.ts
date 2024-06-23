import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PassComponent } from './pass/pass.component';
import { UsersignupComponent } from './usersignup/usersignup.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'login', component : LoginComponent},
  {path : 'pass', component : PassComponent},
  {path : 'signup', component : UsersignupComponent},
  { path: 'contact' , component : ContactComponent},
  { path: 'accueil' , component : AccueilComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
