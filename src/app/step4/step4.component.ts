import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const backendURL = 'http://localhost:4000/user';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  @Output() prevStep = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();  
  @Input() prestation: any;
  @Input() vehicule: any;
  @Input() datedernierrevision: any;
  @Input() utilisateur: any;
  userData: any = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    codep: '',
    mdp: '',
    cmdp: '',
    role: '',
    datenais: '',
    typeClient: ''
  };
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
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: [''],
      confirmerMotDePasse: [''],
      codeSecurite: ['', Validators.required],
      datenais: ['', Validators.required]
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
    if (this.utilisateur) {
      this.formData.utilisateur = { ...this.utilisateur, type: this.utilisateur.type || 'particulier' };
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
        this.userData = response;
        const dateNaissanceTrimmed = response.datenais.slice(0, 10);
        this.profileForm.patchValue({
          typeClient: response.__t === 'Clientpriv' ? 'Particulier' : 'Entreprise',
          nom: response.nom,
          prenom: response.prenom,
          telephone: response.telephone,
          adresse: response.adresse,
          codePostal: response.codep,
          email: response.email,
          motDePasse: '',
          confirmerMotDePasse: '',
          codeSecurite: response.codep,
          datenais: dateNaissanceTrimmed
        });
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onPrevious(): void {
    this.prevStep.emit();
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.formData.utilisateur = {
        type: this.profileForm.get('typeClient')?.value,
        nom: this.profileForm.get('nom')?.value,
        prenom: this.profileForm.get('prenom')?.value,
        telephone: this.profileForm.get('telephone')?.value,
        email: this.profileForm.get('email')?.value,
        adresse: this.profileForm.get('adresse')?.value,
        codePostal: this.profileForm.get('codePostal')?.value
      };

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
