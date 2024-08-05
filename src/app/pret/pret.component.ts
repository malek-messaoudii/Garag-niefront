import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pret',
  templateUrl: './pret.component.html',
  styleUrls: ['./pret.component.css']
})
export class PretComponent implements OnInit {

  reservationForm: FormGroup;
  showForm = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.reservationForm = this.fb.group({
      dateDebut: ['', [Validators.required, this.futureDateValidator]],
      dateFin: ['', [Validators.required, this.futureDateValidator]],
      prestation: ['', Validators.required],
      utilisateur: this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', Validators.required]
      }),
      vehicule: this.fb.group({
        immatriculation: ['', Validators.required],
        kilometrage: ['', Validators.required],
        dateDerniereRevision: ['', [Validators.required, this.pastDateValidator]]
      }),
      message: ['']
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    const userEmail = localStorage.getItem('userEmail') || '';
    if (userEmail) {
      this.http.get<any>(`http://localhost:4000/user/getuser/${userEmail}`).subscribe(
        (user) => {
          this.reservationForm.patchValue({
            utilisateur: {
              nom: user.nom,
              prenom: user.prenom,
              email: user.email,
              telephone: user.telephone
            }
          });
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.toastr.error('Erreur lors de la récupération des détails de l\'utilisateur');
        }
      );
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      this.http.post('http://localhost:4000/reservation/add', this.reservationForm.value).subscribe(
        response => {
          this.toastr.success('Réservation ajoutée avec succès');
          console.log('Réservation ajoutée avec succès', response);
          this.reservationForm.reset();
          this.showForm = false;
        },
        error => {
          console.error('Erreur lors de l\'ajout de la réservation', error);
          this.toastr.error('Erreur lors de l\'ajout de la réservation');
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    return inputDate > currentDate ? null : { futureDate: true };
  }

  pastDateValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    return inputDate < currentDate ? null : { pastDate: true };
  }

  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const dateDebut = group.get('dateDebut')?.value;
    const dateFin = group.get('dateFin')?.value;
    if (dateDebut && dateFin) {
      return new Date(dateFin) > new Date(dateDebut) ? null : { dateRange: true };
    }
    return null;
  }
}
