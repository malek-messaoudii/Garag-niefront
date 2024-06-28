import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
    
const backendURL = 'http://localhost:4000/user';
    
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
    
      constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}
    
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
            this.toastr.success('Compte crée avec succès!');
            switch (response.role) {
              case 'clientprivate':
                this.router.navigate(['/accueil']);
                break;
              case 'clientpro':
                this.router.navigate(['/clientpro-dashboard']);
                break;
              case 'garagiste':
                this.router.navigate(['/garagiste-dashboard']);
                break;
              default:
                this.errorMessage = 'Rôle utilisateur non reconnu';
                break;
            }
    
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
    
