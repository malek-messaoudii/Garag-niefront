import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const backendURL = 'http://localhost:4000/devis';

@Component({
  selector: 'app-devisexpress',
  templateUrl: './devisexpress.component.html',
  styleUrls: ['./devisexpress.component.css']
})
export class DevisexpressComponent {
  formData: any = { utilisateur: { type: 'particulier' }, vehicule: {}, prestation: {} };
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async submitForm(devisForm: NgForm) {
    if (devisForm.valid) {
      const today = new Date().setHours(0, 0, 0, 0);
      const revisionDate = new Date(this.formData.datedernierrevision).setHours(0, 0, 0, 0);

      if (revisionDate > today) {
        this.toastr.warning('La date de révision ne peut pas être ultérieure à aujourd\'hui');
        return;
      }

      try {
        const response = await this.http.post(`${backendURL}/adddevis`, this.formData).toPromise();
        console.log('Devis ajouté avec succès:', response);
        this.toastr.success('Devis soumis avec succès. Créez-vous un compte pour suivre l\'état d\'avancement de votre demande.');
        devisForm.resetForm(); 
        this.router.navigate(['/signup']); 
      } catch (error) {
        console.error('Erreur lors de l\'ajout du devis:', error);
        this.toastr.error('Erreur lors de la soumission du devis');
      }
    } else {
      this.toastr.warning('Veuillez remplir tous les champs requis');
    }
  }
}
