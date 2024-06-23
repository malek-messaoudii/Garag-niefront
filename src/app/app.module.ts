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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
