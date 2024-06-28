import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const backendURL = 'http://localhost:4000/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  mdp: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const credentials = { email: this.email, mdp: this.mdp };
    this.http.post<any>(`${backendURL}/login`, credentials).subscribe({
      next: (response) => {
        if (response.mytoken && response.role) {
          localStorage.setItem('token', response.mytoken);
          this.toastr.success('Login successful');
          switch (response.role) {
            case 'clientprivate':
              this.router.navigate(['/clientprivate-dashboard']);
              break;
            case 'clientpro':
              this.router.navigate(['/clientpro-dashboard']);
              break;
            case 'garagiste':
              this.router.navigate(['/garagiste-dashboard']);
              break;
            default:
              this.errorMessage = 'Rôle utilisateur non reconnu';
              this.toastr.error(this.errorMessage);
              break;
          }
        } else {
          this.errorMessage = 'Invalid response from server';
          this.toastr.error(this.errorMessage);
        }
      },
      error: (error) => {
        if (error.status === 404 || error.status === 401) {
          this.toastr.error('Email or password invalid');
        } else {
          this.toastr.error('Internal Server Error');
        }
      }
    });
  }
}
