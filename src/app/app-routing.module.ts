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
import { HomeComponent } from './home/home.component';
import { PrestComponent } from './prest/prest.component';
import { TeldevisComponent } from './teldevis/teldevis.component';
import { DevisexpressComponent } from './devisexpress/devisexpress.component';
import { Contact2Component } from './contact2/contact2.component';
import { UserinfosComponent } from './userinfos/userinfos.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { Devisexpress2Component } from './devisexpress2/devisexpress2.component';
import { RdvComponent } from './rdv/rdv.component';
import { Tel2Component } from './tel2/tel2.component';
import { CarnetComponent } from './carnet/carnet.component';
import { DemandesComponent } from './demandes/demandes.component';
import { PromotionComponent } from './promotion/promotion.component';
import { RdvvenirComponent } from './rdvvenir/rdvvenir.component';
import { Devis2Component } from './devis2/devis2.component';
import { ProfiteComponent } from './profite/profite.component';
import { GhomeComponent } from './ghome/ghome.component';
import { GcontactComponent } from './gcontact/gcontact.component';
import { GstatComponent } from './gstat/gstat.component';
import { GinfoComponent } from './ginfo/ginfo.component';
import { GmecanComponent } from './gmecan/gmecan.component';
import { ProgrammeComponent } from './programme/programme.component';
import { GagendaComponent } from './gagenda/gagenda.component';
import { GrdvComponent } from './grdv/grdv.component';
import { GdemandeComponent } from './gdemande/gdemande.component';
import { GintervComponent } from './ginterv/ginterv.component';
import { VoiturepretComponent } from './voiturepret/voiturepret.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};
const routes: Routes = [
  {path : '', component : AccueilComponent},
  {path : 'login', component : LoginComponent},
  {path : 'pass', component : PassComponent},
  {path : 'signup', component : UsersignupComponent},
  { path: 'contact' , component : ContactComponent},
  { path: 'accueil' , component : AccueilComponent},
  { path: 'devis' , component : DevisComponent},
  { path: 'home' , component : HomeComponent},
  { path: 'prest' , component : PrestComponent},
  { path: 'tel' , component : TeldevisComponent},
  { path: 'devisexpress' , component : DevisexpressComponent},
  { path: 'contact2' , component : Contact2Component},
  { path: 'userinfo' , component : UserinfosComponent},
  { path: 'vehicule' , component : VehiculeComponent},
  { path: 'devisexpress2' , component : Devisexpress2Component},
  { path: 'rdv' , component : RdvComponent},
  { path: 'tel2' , component : Tel2Component},
  { path: 'carnet' , component : CarnetComponent},
  { path: 'demandes' , component : DemandesComponent},
  { path: 'promo' , component : PromotionComponent},
  { path: 'rdvvenir' , component : RdvvenirComponent},
  { path: 'devis2' , component : Devis2Component},
  { path: 'profite' , component : ProfiteComponent},
  { path: 'home2' , component : GhomeComponent},
  { path: 'contact3' , component : GcontactComponent},
  { path: 'stat' , component : GstatComponent},
  { path: 'info' , component : GinfoComponent},
  { path: 'mecan' , component : GmecanComponent},
  { path: 'programme' , component : ProgrammeComponent},
  { path: 'agenda' , component : GagendaComponent},
  { path: 'grdv' , component : GrdvComponent},
  { path: 'gdemande' , component : GdemandeComponent},
  { path: 'intervention' , component : GintervComponent},
  { path: 'voiturepret' , component : VoiturepretComponent},
  { path: '**' , component : NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
