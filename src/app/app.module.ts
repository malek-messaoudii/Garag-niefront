import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { UsersignupComponent } from './usersignup/usersignup.component';
import { PassComponent } from './pass/pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { AccueilComponent } from './accueil/accueil.component';
import { Homes1Component } from './homes1/homes1.component';
import { ValeursComponent } from './valeurs/valeurs.component';
import { AproposComponent } from './apropos/apropos.component';
import { QuestionsComponent } from './questions/questions.component';
import { ServiceComponent } from './service/service.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PrestationsComponent } from './prestations/prestations.component';
import { DevisComponent } from './devis/devis.component';
import { BarreComponent } from './barre/barre.component';
import { QuoteStep1Component } from './quote-step1/quote-step1.component';
import { QuoteStep2Component } from './quote-step2/quote-step2.component';
import { QuoteStep3Component } from './quote-step3/quote-step3.component';
import { HomeComponent } from './home/home.component';
import { PrestComponent } from './prest/prest.component';
import { SectiontelComponent } from './sectiontel/sectiontel.component';
import { TeldevisComponent } from './teldevis/teldevis.component';
import { QuoteStep4Component } from './quote-step4/quote-step4.component';
import { DevisexpressComponent } from './devisexpress/devisexpress.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Contact2Component } from './contact2/contact2.component';
import { UserinfosComponent } from './userinfos/userinfos.component';
import { FirstComponent } from './first/first.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { Barre2Component } from './barre2/barre2.component';
import { Devisexpress2Component } from './devisexpress2/devisexpress2.component';
import { RdvComponent } from './rdv/rdv.component';
import { Tel2Component } from './tel2/tel2.component';
import { CarnetComponent } from './carnet/carnet.component';
import { DemandesComponent } from './demandes/demandes.component';
import { PromotionComponent } from './promotion/promotion.component';
import { RdvvenirComponent } from './rdvvenir/rdvvenir.component';
import { Devis2Component } from './devis2/devis2.component';
import { Step4Component } from './step4/step4.component';
import { ProfiteComponent } from './profite/profite.component';
import { GmenuComponent } from './gmenu/gmenu.component';
import { GhomeComponent } from './ghome/ghome.component';
import { GcontactComponent } from './gcontact/gcontact.component';
import { GstatComponent } from './gstat/gstat.component';
import { GinfoComponent } from './ginfo/ginfo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { GmecanComponent } from './gmecan/gmecan.component';
import { ProgrammeComponent } from './programme/programme.component';
import { GarageComponent } from './garage/garage.component';
import { GagendaComponent } from './gagenda/gagenda.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GrdvComponent } from './grdv/grdv.component';
import { GdemandeComponent } from './gdemande/gdemande.component';
import { GintervComponent } from './ginterv/ginterv.component';
import { PretComponent } from './pret/pret.component';
import { VoiturepretComponent } from './voiturepret/voiturepret.component'; 

@NgModule({
  declarations: [
    AppComponent,
    AdminlayoutComponent,
    UserlayoutComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    UsersignupComponent,
    PassComponent,
    ContactComponent,
    ServicesComponent,
    AccueilComponent,
    Homes1Component,
    ValeursComponent,
    AproposComponent,
    QuestionsComponent,
    ServiceComponent,
    NotfoundComponent,
    PrestationsComponent,
    DevisComponent,
    BarreComponent,
    QuoteStep1Component,
    QuoteStep2Component,
    QuoteStep3Component,
    HomeComponent,
    PrestComponent,
    SectiontelComponent,
    TeldevisComponent,
    QuoteStep4Component,
    DevisexpressComponent,
    SidebarComponent,
    Contact2Component,
    UserinfosComponent,
    FirstComponent,
    VehiculeComponent,
    Barre2Component,
    Devisexpress2Component,
    RdvComponent,
    Tel2Component,
    CarnetComponent,
    DemandesComponent,
    PromotionComponent,
    RdvvenirComponent,
    Devis2Component,
    Step4Component,
    ProfiteComponent,
    GmenuComponent,
    GhomeComponent,
    GcontactComponent,
    GstatComponent,
    GinfoComponent,
    GmecanComponent,
    ProgrammeComponent,
    GarageComponent,
    GagendaComponent,
    GrdvComponent,
    GdemandeComponent,
    GintervComponent,
    PretComponent,
    VoiturepretComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton: true,
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: false,
    }),
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
