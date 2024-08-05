import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const backendURL = 'http://localhost:4000/user';

@Component({
  selector: 'app-gstat',
  templateUrl: './gstat.component.html',
  styleUrls: ['./gstat.component.css']
})
export class GstatComponent implements OnInit {
  userData: any = {
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
  welcome: string = '';
  currentTime: string = '';
  currentView: string = 'dashboard';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.createUsersActivityChart();
    this.createVisitorsChart();
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
        const dateNaissanceTrimmed = response.datenais.slice(0, 10); // Not used anywhere
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  setView(view: string) {
    this.currentView = view;
  }

  createUsersActivityChart(): void {
    const ctx = document.getElementById('usersActivityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['1/2016', '2/2012', '3/2016', '4/2016', '5/2016', '6/2016', '7/2016', '8/2016', '9/2016'],
        datasets: [{
          label: 'Users',
          data: [1, 2, 4, 3, 2, 11, 3, 9, 6],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createVisitorsChart(): void {
    const ctx = document.getElementById('visitorsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['demandes de devis', 'rendez vous'],
        datasets: [{
          label: 'demande de devis/rendez vous',
          data: [95, 5],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
}
