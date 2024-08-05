import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

const backendURL = 'http://localhost:4000/devis';

@Component({
  selector: 'app-profite',
  templateUrl: './profite.component.html',
  styleUrls: ['./profite.component.css']
})
export class ProfiteComponent implements OnInit {
  formData: any = { utilisateur: { type: 'particulier' }, vehicule: {}, prestation: {} };
  errorMessage: string = '';
  promotion: any;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['promotion']) {
        this.promotion = JSON.parse(params['promotion']);
        this.formData.prestation = this.promotion.prestation || {};
      }
    });
  }

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
        this.toastr.success('Devis soumis avec succès.');
        devisForm.resetForm(); 
        this.router.navigate(['/home']); 
      } catch (error) {
        console.error('Erreur lors de l\'ajout du devis:', error);
        this.toastr.error('Erreur lors de la soumission du devis');
      }
    } else {
      this.toastr.warning('Veuillez remplir tous les champs requis');
    }
  }
}
