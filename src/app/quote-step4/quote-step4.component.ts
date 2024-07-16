import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-step4',
  templateUrl: './quote-step4.component.html',
  styleUrls: ['./quote-step4.component.css']
})
export class QuoteStep4Component implements OnInit {
  @Output() prevStep = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();  
  @Input() prestation: any;
  @Input() vehicule: any;
  @Input() datedernierrevision: any;
  @Input() utilisateur: any;

  formData: any = { utilisateur: { type: 'particulier' }, prestation: {}, datedernierrevision: '' };

  constructor() {}

  ngOnInit(): void {
    if (this.datedernierrevision) {
      this.formData.datedernierrevision = this.datedernierrevision;
    }
    if (this.vehicule) {
      this.formData.vehicule = this.vehicule;
    }
    if (this.prestation) {
      this.formData.prestation = {
        titre: this.prestation.titre,
        selectedTypes: this.prestation.selectedTypes,
        options: this.prestation.options
      };
    }
    if (this.utilisateur) {
      this.formData.utilisateur = { ...this.utilisateur, type: this.utilisateur.type || 'particulier' };
    }
  }

  onPrevious(): void {
    this.prevStep.emit();
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.submitForm.emit(this.formData);
      console.log('Form data:', this.formData);
    } else {
      console.log('Form is invalid:', this.formData);
    }
  }

  isFormValid(): boolean {
    if (this.formData.utilisateur.type === 'particulier') {
      return (
        this.formData.utilisateur.nom &&
        this.formData.utilisateur.prenom &&
        this.formData.utilisateur.telephone &&
        this.formData.utilisateur.email &&
        this.formData.utilisateur.adresse &&
        this.formData.utilisateur.codePostal
      );
    } else {
      return (
        this.formData.utilisateur.nomEntreprise &&
        this.formData.utilisateur.siret &&
        this.formData.utilisateur.nom &&
        this.formData.utilisateur.prenom &&
        this.formData.utilisateur.telephone &&
        this.formData.utilisateur.email &&
        this.formData.utilisateur.adresse &&
        this.formData.utilisateur.codePostal
      );
    }
  }
}
