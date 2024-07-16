import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userData: any = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    codep: '',
    mdp: '',
    cmdp: '',
    role: '',
    datenais: '',
    typeClient: ''
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  handleLogout(): void {
    this.userData = {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      adresse: '',
      codep: '',
      mdp: '',
      cmdp: '',
      role: '',
      datenais: '',
      typeClient: ''
    };
    localStorage.clear();
    this.toastr.success("Session terminée");
    this.router.navigate(['/login']);
  }
}
