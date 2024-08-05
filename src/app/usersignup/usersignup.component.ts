import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const backendURL = 'http://localhost:4000/user';
const USER_EMAIL_KEY = 'user_email'; // Key for local storage

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent implements OnInit {
  selectedPersonType: string = 'client';
  selectedPersonCategory: string = 'physique';
  formData: any = {};
  errorMessage: string = '';
  email: string = '';


  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  handlePersonTypeChange(event: any) {
    this.selectedPersonType = event.target.value;
    if (this.selectedPersonType === 'garagiste') {
      this.selectedPersonCategory = '';
    } else if (this.selectedPersonType === 'client') {
      this.selectedPersonCategory = 'physique';
    }
  }

  handlePersonCategoryChange(event: any) {
    this.selectedPersonCategory = event.target.value;
  }

  isClientPhysiqueSelected(): boolean {
    return this.selectedPersonType === 'client' && this.selectedPersonCategory === 'physique';
  }

  isClientMoraleSelected(): boolean {
    return this.selectedPersonType === 'client' && this.selectedPersonCategory === 'morale';
  }

  isGaragisteSelected(): boolean {
    return this.selectedPersonType === 'garagiste';
  }

  async register(event: any) {
    event.preventDefault();

    try {
      const response: any = await this.http.post(`${backendURL}/register`, this.formData).toPromise();

      if (response && response.user) {
        localStorage.setItem('accessToken', response.mytoken);
        localStorage.setItem('userEmail', this.email);
        this.toastr.success('Compte créé avec succès!');
        
        localStorage.setItem(USER_EMAIL_KEY, response.user.email);

        switch (response.role) {
          case 'clientprivate':
            this.router.navigate(['/home']);
            break;
          case 'clientpro':
            this.router.navigate(['/clientpro-dashboard']);
            break;
          case 'garagiste':
            this.router.navigate(['/home2']);
            break;
          default:
            this.errorMessage = 'Rôle utilisateur non reconnu';
            break;
        }

        // Clear form data
        this.formData = {};
      } else {
        this.errorMessage = 'Email ou mot de passe invalide';
      }
    } catch (error) {
      console.error('Error creating user:', error);
      this.errorMessage = 'Une erreur s\'est produite lors de la création du compte.';
    }
  }
}
