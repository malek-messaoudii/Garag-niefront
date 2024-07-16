import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const backendURL = 'http://localhost:4000/devis';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {
  currentStep = 1;
  formData: any = { utilisateur: {}, vehicule: {}, prestation: {}, datedernierrevision: '' };
  errorMessage: string = '';
  selectedPrestation: any = {};
  vehicule: any = {};
  utilisateur: any = {};
  prestation: any = {};

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['prestation']) {
        this.selectedPrestation = JSON.parse(params['prestation']);
      }
    });
  }

  goToNextStep(): void {
    this.currentStep++;
  }

  goToPreviousStep(): void {
    this.currentStep--;
  }

  setVehicleInfo(info: any): void {
    this.vehicule = info;
    this.formData.vehicule = info;
    console.log('Vehicle info:', info);
  }

  setUsageInfo(info: any): void {
    this.prestation.selectedTypes = info.selectedTypes;
    this.formData.prestation.selectedTypes = info.selectedTypes;
    this.formData.datedernierrevision = info.datedernierrevision;
    console.log('Usage info:', info);
  }

  setSpecificOptions(options: any): void {
    this.prestation.options = options;
    this.formData.prestation.options = options;
    console.log('Specific options:', options);
  }

  setPrestationInfo(prestation: any): void {
    this.selectedPrestation = prestation;
    this.formData.prestation = prestation;
    console.log('Prestation info:', prestation);
  }

  setUtilisateurInfo(utilisateur: any): void {
    this.utilisateur = utilisateur;
    this.formData.utilisateur = utilisateur;
    console.log('Utilisateur info:', utilisateur);
  }

  submitDevis(formData: any): void {
    console.log('Form data before submission:', formData);
    if (this.isFormValid(formData)) {
      this.http.post(`${backendURL}/adddevis`, formData).subscribe(
        response => {
          console.log('Devis submitted successfully', response);
          this.toastr.success('Devis soumis avec succès. Créez-vous un compte pour suivre l\'état d\'avancement de votre demande.');
          this.router.navigate(['/signup']);
        },
        error => {
          console.error('Error submitting devis', error);
          this.toastr.error('Erreur lors de la soumission du devis');
        }
      );
    } else {
      console.log('Form is invalid:', formData);
      this.toastr.warning('Veuillez remplir tous les champs obligatoires.');
    }
  }

  isFormValid(formData: any): boolean {
    if (formData.utilisateur.type === 'particulier') {
      return (
        formData.utilisateur.nom &&
        formData.utilisateur.prenom &&
        formData.utilisateur.telephone &&
        formData.utilisateur.email &&
        formData.utilisateur.adresse &&
        formData.utilisateur.codePostal
      );
    } else if (formData.utilisateur.type === 'entreprise') {
      return (
        formData.utilisateur.nomEntreprise &&
        formData.utilisateur.siret &&
        formData.utilisateur.nom &&
        formData.utilisateur.prenom &&
        formData.utilisateur.telephone &&
        formData.utilisateur.email &&
        formData.utilisateur.adresse &&
        formData.utilisateur.codePostal
      );
    }
    return false;
  }
}
