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
import { QuoteStep4Component } from './quote-step4/quote-step4.component';




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
    QuoteStep4Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
