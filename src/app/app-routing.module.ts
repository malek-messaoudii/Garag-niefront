import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions} from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PassComponent } from './pass/pass.component';
import { UsersignupComponent } from './usersignup/usersignup.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DevisComponent } from './devis/devis.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64], // facultatif, ajustez selon vos besoins
};
const routes: Routes = [
  {path : '', component : AccueilComponent},
  {path : 'login', component : LoginComponent},
  {path : 'pass', component : PassComponent},
  {path : 'signup', component : UsersignupComponent},
  { path: 'contact' , component : ContactComponent},
  { path: 'accueil' , component : AccueilComponent},
  { path: 'devis' , component : DevisComponent},
  { path: '**' , component : NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
