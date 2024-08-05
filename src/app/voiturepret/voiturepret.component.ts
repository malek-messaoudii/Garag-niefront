import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VoitureService } from '../voiture.service';


const backendURL2 = 'http://localhost:4000/devis';

@Component({
  selector: 'app-voiturepret',
  templateUrl: './voiturepret.component.html',
  styleUrls: ['./voiturepret.component.css']
})
export class VoiturepretComponent implements OnInit {
  addrdvForm: FormGroup;
  adddevisForm: FormGroup;
  reservationForm: FormGroup;
  vehicules: any[] = [];
  reservations: any[] = [];
  devisList: any[] = [];
  filteredDevisList: any[] = [];
  showAddForm = false;
  showAddForm1 = false;
  showAddForm2 = false;
  showUpdateForm = false;

  private apiUrl = 'http://localhost:4000/vehicules';
  private apiUrl1 = 'http://localhost:4000/reservation';
  private backendUrl = 'http://localhost:4000/rdv';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private carDataService: VoitureService,
    private toastr: ToastrService
  ) {
    const userEmail = localStorage.getItem('userEmail') || '';
    
    this.addrdvForm = this.fb.group({
      vehicule: ['', Validators.required],
      numdevis: ['', Validators.required],
      datesouhaite: ['', Validators.required],
      heuresouhaite: ['', Validators.required],
      titrepres: ['', Validators.required],
      desc: [''],
      voiturepret: ['', Validators.required],
      email: [userEmail, [Validators.required, Validators.email]]
    });

    this.adddevisForm = this.fb.group({
      typedemande: ['Demande de devis'],
      vehicule: ['', Validators.required],
      titre: ['', Validators.required],
      desc: [''],
      voiturepret: [false],
      email: [userEmail, [Validators.required, Validators.email]],
      images: ['']
    });
    this.reservationForm = this.fb.group({
      dateDebut: ['', [Validators.required, this.futureDateValidator]],
      dateFin: ['', [Validators.required, this.futureDateValidator]],
      utilisateur: this.fb.group({
        email: [userEmail, [Validators.required, Validators.email]],
      }),
      vehicule: ['', Validators.required],
      numdevis: ['', Validators.required],
      prestation: ['', Validators.required],
      message: [''],
    }, { validators: this.dateRangeValidator });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    return inputDate > currentDate ? null : { futureDate: true };
  }

  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const dateDebut = group.get('dateDebut')?.value;
    const dateFin = group.get('dateFin')?.value;
    if (dateDebut && dateFin) {
      return new Date(dateFin) > new Date(dateDebut) ? null : { dateRange: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.fetchVehicules();
    this.fetchReservations();
    this.reservationForm.get('vehicule')?.valueChanges.subscribe(vehiculeId => {
      this.fetchNumDevisByVehicle(vehiculeId);
    });
    this.reservationForm.get('numdevis')?.valueChanges.subscribe(() => {
      this.onNumDevisChange();
    });  }

  

    fetchVehicules(): void {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        this.toastr.error('Email not found in localStorage');
        return;
      }
    
      this.http.get<any[]>(`${this.apiUrl}/user/${userEmail}`).subscribe(
        (data) => {
          this.vehicules = data;
          console.log('Vehicules:', this.vehicules); // Log the fetched vehicles
          if (this.vehicules.length === 0) {
            this.toastr.info('No vehicles found');
          }
        },
        (error) => {
          console.error('Error fetching vehicles:', error);
        }
      );
    }
    

  fetchReservations(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.toastr.error('Email not found in localStorage');
      return;
    }

    this.http.get<any[]>(`${this.apiUrl1}/user/${userEmail}`).subscribe(
      (data) => {
        this.reservations = data;
        if (this.reservations.length === 0) {
          this.toastr.info('Aucune réservation trouvée');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching reservations:', error.message);
        this.toastr.error('Erreur lors de la récupération des réservations');
      }
    );
  }

  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addReservation(): void {
    if (this.reservationForm.valid) {
      // Retrieve email from form and localStorage
      const formEmail = this.reservationForm.get('utilisateur.email')?.value || localStorage.getItem('userEmail1') || '';
  
      // Create reservation data object
      const reservationData = {
        dateDebut: this.reservationForm.get('dateDebut')?.value,
        dateFin: this.reservationForm.get('dateFin')?.value,
        message: this.reservationForm.get('message')?.value,
        vehicule: {
          make: this.getMakeFromId(this.reservationForm.get('vehicule')?.value),
          immatriculation: this.getImmatriculationFromId(this.reservationForm.get('vehicule')?.value),
          model: this.getModelFromId(this.reservationForm.get('vehicule')?.value),
        },
        prestation: this.reservationForm.get('prestation')?.value,
        numdevis: this.reservationForm.get('numdevis')?.value,
        utilisateur: {
          email: this.reservationForm.get('utilisateur.email')?.value
        }
      };
  
      // Log form data to console
      console.log('Form Data:', reservationData);
  
      // Send form data to the server
      this.http.post<any>(`${this.apiUrl1}/add`, reservationData).subscribe(
        (newReservation) => {
          this.reservations.push(newReservation);
          this.reservationForm.reset();
          this.showAddForm = false;
          this.toastr.success('Réservation ajoutée avec succès');
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Erreur lors de l\'ajout de la réservation');
          console.error('Error adding reservation:', error.message);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }
  
  
  
  


  getMakeFromId(vehiculeId: string): string {
    const vehicule = this.vehicules.find(v => v._id === vehiculeId);
    return vehicule ? vehicule.make : '';
  }

  getImmatriculationFromId(vehiculeId: string): string {
    const vehicule = this.vehicules.find(v => v._id === vehiculeId);
    return vehicule ? vehicule.immatriculation : '';
  }
  getModelFromId(vehiculeId: string): string {
    const vehicule = this.vehicules.find(v => v._id === vehiculeId);
    return vehicule ? vehicule.model: '';
  }

  deleteReservation(id: string): void {
    this.http.delete(`${this.apiUrl1}/delete/${id}`).subscribe(
      () => {
        this.reservations = this.reservations.filter(reservation => reservation._id !== id);
        this.toastr.success('Réservation supprimée avec succès');
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Erreur lors de la suppression de la réservation');
        console.error('Error deleting reservation:', error.message);
      }
    );
  }

  onNumDevisChange(): void {
    const numdevis = this.reservationForm.get('numdevis')?.value;
    this.fetchPrestationTitreByNumDevis(numdevis);
  }

  fetchNumDevisByVehicle(vehiculeId: string): void {
    const selectedVehicule = this.vehicules.find(v => v._id === vehiculeId);
  
    if (!selectedVehicule) {
      console.error('Véhicule sélectionné non trouvé.');
      return;
    }
  
    const { make, model, immatriculation } = selectedVehicule;
    const url = `${backendURL2}/getNumDevisByVehicule/${make}/${model}/${immatriculation}`;
  
    this.http.get<any[]>(url).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.devisList = response;
          this.reservationForm.patchValue({ numdevis: this.devisList[0].numdevis });
          this.fetchPrestationTitreByNumDevis(this.devisList[0].numdevis);
        } else {
          console.error('Aucun numéro de devis trouvé pour ce véhicule.');
          this.toastr.error('Aucun numéro de devis trouvé pour ce véhicule.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération du numéro de devis:', error);
        this.toastr.error('Aucune demande de devis pour cette véhicule.');
      }
    );
  }
  

  fetchPrestationTitreByNumDevis(numdevis: string): void {
    const url = `${backendURL2}/getdevis/${numdevis}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response['prestation'] && response['prestation']['titre']) {
          this.reservationForm.patchValue({ 'prestation': response['prestation']['titre'] });
        } else {
          console.error('Titre de prestation non trouvé pour le numéro de devis:', numdevis);
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération du titre de prestation:', error);
      }
    );
  }

 
}
