import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-gdemande',
  templateUrl: './gdemande.component.html',
  styleUrls: ['./gdemande.component.css']
})
export class GdemandeComponent implements OnInit {

  

    rdv: any[] = [];
    emailperso: string = '';
    nom: string = '';
    prenom: string = '';
  
    private apiUrl = 'http://localhost:4000/rdv';
    private apiUrl1 = 'http://localhost:4000/user';
  
    constructor(private http: HttpClient, private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.fetchRdvByEmailPerso();
    }
  
    fetchRdvByEmailPerso(): void {
      const emailperso = localStorage.getItem('userEmail');
      if (!emailperso) {
        console.error('No email found in localStorage');
        return;
      }
      this.http.get<any[]>(`${this.apiUrl}/rdvbyemailperso/${emailperso}`)
        .subscribe(
          async (response) => {
            this.rdv = response || [];
            await this.fetchUserDetailsForRdv(); // Call to fetch user details after rdv is loaded
          },
          (error) => {
            console.error('Erreur lors de la récupération des rendez-vous par email:', error);
            this.toastr.error('Erreur lors de la récupération des rendez-vous par email');
          }
        );
    }
  
    async fetchUserDetailsForRdv(): Promise<void> {
      for (const rdvItem of this.rdv) {
        try {
          const userResponse = await this.http.get<{ nom?: string, prenom?: string }>(`${this.apiUrl1}/getnomprenom/${rdvItem.email}`).toPromise();
          if (userResponse && userResponse.nom && userResponse.prenom) {
            rdvItem.nom = userResponse.nom;
            rdvItem.prenom = userResponse.prenom;
          } else {
            console.warn(`No user details found for email ${rdvItem.email}`);
          }
        } catch (error) {
          console.error(`Erreur lors de la récupération des informations utilisateur pour l'email ${rdvItem.email}:`, error);
          this.toastr.error(`Erreur lors de la récupération des informations utilisateur pour l'email ${rdvItem.email}`);
        }
      }
    }
  }
  