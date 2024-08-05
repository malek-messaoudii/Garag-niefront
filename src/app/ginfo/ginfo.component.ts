import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const backendURL = 'http://localhost:4000/user';
@Component({
  selector: 'app-ginfo',
  templateUrl: './ginfo.component.html',
  styleUrls: ['./ginfo.component.css']
})
export class GinfoComponent implements OnInit {

  userData: any = {
    noms: '',
    nums: '',
    nafc:'',
    telephone: '',
    fax:'',
    website:'',
    adresse: '',
    codep: '',
    genre:'',
    nom: '',
    prenom: '',
    email: '',
    id:'',
    mdp: '',
    cmdp: '',
  };
  profileForm: FormGroup;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.profileForm = this.fb.group({
      noms: ['', Validators.required],
      nums: ['', Validators.required],
      nafc: ['', Validators.required],
      telephone: ['', Validators.required],
      fax: [''],
      website: [''],
      adresse: ['', Validators.required],
      codep: ['', Validators.required],
      genre: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: ['', Validators.required],
      motDePasse: [''],
      confirmerMotDePasse: [''],
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }


  fetchUserData(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('No email found in localStorage');
      return;
    }
  
    this.http.get<any>(`${backendURL}/getuser/${email}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      })
    }).subscribe(
      response => {
        this.userData = response;
        this.profileForm.patchValue({
          noms: response.noms,
          nums: response.nums,
          nafc: response.nafc,
          telephone: response.telephone,
          fax: response.fax,
          website: response.website,
          adresse: response.adresse,
          codep: response.codep,
          genre: response.genre,
          nom: response.nom,
          prenom: response.prenom,
          email: response.email,
          id: response.id,
          motDePasse: '',
          confirmerMotDePasse: '',
        });
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSubmit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('No email found in localStorage');
      return;
    }

    const formData = this.profileForm.value;

    this.http.put(`${backendURL}/updateuser/${email}`, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      })
    }).subscribe(
      response => {
        console.log('User updated successfully:', response);
        this.toastr.success("Informations modifiés avec succés");
        this.fetchUserData();
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  handleLogout(): void {
    this.userData = {
      noms: '',
      nums: '',
      nafc: '',
      telephone: '',
      fax: '',
      website: '',
      adresse: '',
      codep: '',
      genre: '',
      nom: '',
      prenom: '',
      email: '',
      id: '',
      mdp: '',
      cmdp: '',
    };
    localStorage.clear();
    this.toastr.success("Session terminée");
    this.router.navigate(['/login']);
  }
  


  
}