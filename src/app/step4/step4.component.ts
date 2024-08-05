import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const backendURL = 'http://localhost:4000/user';
const backendDevisURL = 'http://localhost:4000/devis';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  @Output() prevStep = new EventEmitter<void>();
  @Input() prestation: any;
  @Input() vehicule: any;
  @Input() datedernierrevision: any;
  profileForm: FormGroup;
  formData: any = { utilisateur: { type: 'particulier' }, prestation: {}, datedernierrevision: '' };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      typeClient: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required], // Updated pattern
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required], // Updated pattern
      email: ['', [Validators.required, Validators.email]],
      datenais: ['']
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
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
        options: this.prestation.options,
        desc: this.prestation.desc || '' // Initialize desc
      };
    }
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
        if (response) {
          const dateNaissanceTrimmed = response.datenais.slice(0, 10);
          this.profileForm.patchValue({
            typeClient: response.__t === 'Clientpriv' ? 'Particulier' : 'Entreprise',
            nom: response.nom,
            prenom: response.prenom,
            telephone: response.telephone,
            adresse: response.adresse,
            codePostal: response.codep,
            email: response.email,
            datenais: dateNaissanceTrimmed
          });
          console.log('User data loaded into form:', this.profileForm.value);
        } else {
          console.error('No user data found for the provided email');
        }
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onPrevious(): void {
    this.prevStep.emit();
  }

  submitDevis(): void {
    if (this.profileForm.valid) {
      this.formData.utilisateur = {
        type: this.profileForm.get('typeClient')?.value.toLowerCase(), // Convert to lowercase
        nom: this.profileForm.get('nom')?.value,
        prenom: this.profileForm.get('prenom')?.value,
        telephone: this.profileForm.get('telephone')?.value,
        email: this.profileForm.get('email')?.value,
        adresse: this.profileForm.get('adresse')?.value,
        codePostal: this.profileForm.get('codePostal')?.value
      };
  
      console.log('Form data before submission:', this.formData);
      this.http.post(`${backendDevisURL}/adddevis`, this.formData).subscribe(
        response => {
          console.log('Devis submitted successfully', response);
          this.toastr.success('Devis soumis avec succès.');
          this.router.navigate(['/home']);
        },
        error => {
          // Enhance error logging
          console.error('Error submitting devis', error);
          const errorMessage = error.error?.message || 'Erreur lors de la soumission du devis';
          this.toastr.error(errorMessage);
        }
      );
    } else {
      this.profileForm.markAllAsTouched();
      this.toastr.warning('Veuillez remplir tous les champs obligatoires.');
      console.log('Form is invalid:', this.profileForm.value);
    }
  }
  
  
  onSubmit(): void {
    this.submitDevis();
  }
}
