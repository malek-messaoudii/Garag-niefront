import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VoitureService } from '../voiture.service'; 

const backendURL2 = 'http://localhost:4000/devis';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  addVehiculeForm: FormGroup;
  addrdvForm: FormGroup;
  updateVehiculeForm: FormGroup;
  adddevisForm: FormGroup;
  prestation: any[] = [];
  vehicules: any[] = [];
  devisList: any[] = []; 
  utilisateur: any[] = [];
  selectedDevis: any;
  showAddForm2: boolean = false;  
  makes: string[] = [];
  models: string[] = [];
  boiteOptions: string[] = ['Automatique', 'Manuelle'];
  energieOptions: string[] = ['Essence', 'Diesel', 'Électrique', 'Hybride'];
  showAddForm: boolean = false;
  showAddForm1: boolean = false;
  showUpdateForm: boolean = false;
  selectedVehiculeId: string | null = null;
  selectedFiles: File[] = [];


  private apiUrl = 'http://localhost:4000/vehicules';
  private backendUrl = 'http://localhost:4000/rdv';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private carDataService: VoitureService, // Adjust service name if necessary
    private toastr: ToastrService
  ) {
    const userEmail = localStorage.getItem('userEmail') || '';
    this.addVehiculeForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      immatriculation: ['', Validators.required],
      kilo: ['', [Validators.required, Validators.min(0)]],
      datedernierrev: ['', Validators.required],
      boite: ['', Validators.required],
      energie: ['', Validators.required],
      email: [userEmail, [Validators.required, Validators.email]]
    });
    
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
    this.updateVehiculeForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      immatriculation: ['', Validators.required],
      kilo: ['', [Validators.required, Validators.min(0)]],
      datedernierrev: ['', Validators.required],
      boite: ['', Validators.required],
      energie: ['', Validators.required],
      email: [userEmail, [Validators.required, Validators.email]]
    });
    const userEmail1 = localStorage.getItem('userEmail') || '';
    this.adddevisForm = this.fb.group({
      typedemande: ['Demande de devis'],
      vehicule: ['', Validators.required],
      titre: ['', Validators.required],
      desc: ['',],
      voiturepret: [false],
      email: [userEmail1, [Validators.required, Validators.email]],
      images: ['']
    });
    
  }






  
  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
  }



 

  openUpdateForm(vehicule: any): void {
    this.selectedVehiculeId = vehicule._id;
    this.updateVehiculeForm.patchValue({
      make: vehicule.make,
      model: vehicule.model,
      immatriculation: vehicule.immatriculation,
      kilo: vehicule.kilo,
      datedernierrev: vehicule.datedernierrev,
      boite: vehicule.boite,
      energie: vehicule.energie,
      email: vehicule.email
    });
    this.showUpdateForm = true;
  }

  submitUpdatedVehicule(): void {
    const formValue = this.updateVehiculeForm.value;
    if (this.updateVehiculeForm.valid && this.selectedVehiculeId) {
      this.http.put<any>(`${this.apiUrl}/${this.selectedVehiculeId}`, formValue).subscribe(
        (updatedVehicule) => {
          const index = this.vehicules.findIndex(v => v._id === this.selectedVehiculeId);
          if (index !== -1) {
            this.vehicules[index] = updatedVehicule;
          }
          this.updateVehiculeForm.reset();
          this.showUpdateForm = false;
          this.selectedVehiculeId = null;
          this.toastr.success('Véhicule mis à jour avec succès');
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour du véhicule');
          console.error('Error updating vehicle:', error);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }


  ngOnInit(): void {
    this.makes = this.carDataService.getMakes(); // Assuming this returns an array of strings
    this.fetchVehicules();
    this.addrdvForm.get('vehicule')?.valueChanges.subscribe(vehiculeId => {
      this.fetchNumDevisByVehicle(vehiculeId);
    });
    this.addrdvForm.get('numdevis')?.valueChanges.subscribe(() => {
      this.onNumDevisChange();
    });
  }

  fetchVehicules(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.toastr.error('Email not found in localStorage');
      return;
    }

    this.http.get<any[]>(`${this.apiUrl}/user/${userEmail}`).subscribe(
      (data) => {
        this.vehicules = data;
        if (this.vehicules.length === 0) {
          this.toastr.info('No vehicles found');
        }
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  onMakeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const make = target.value;
    this.models = this.carDataService.getModels(make); // Assuming this returns an array of strings
    this.addVehiculeForm.get('model')?.setValue(''); // Reset selected model
  }

  addVehicule(): void {
    if (this.addVehiculeForm.valid) {
      this.http.post<any>(`${this.apiUrl}/addvehicule`, this.addVehiculeForm.value).subscribe(
        (newVehicule) => {
          this.vehicules.push(newVehicule);
          this.addVehiculeForm.reset();
          this.showAddForm = false;
          this.toastr.success('Véhicule ajouté avec succès');
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'ajout du véhicule');
          console.error('Error adding vehicle:', error);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }

  deleteVehicule(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        this.vehicules = this.vehicules.filter(v => v._id !== id);
        this.toastr.success('Véhicule supprimé avec succès');
      },
      (error) => {
        this.toastr.error('Erreur lors de la suppression du véhicule');
        console.error('Error deleting vehicle:', error);
      }
    );
  }


  


  viewHistory(id: string): void {
    // Implement view history logic here if needed
  }

  requestQuote(): void {
    this.showAddForm2 = !this.showAddForm2;
  }

  onNumDevisChange(): void {
    const numdevis = this.addrdvForm.get('numdevis')?.value;
    this.fetchpretByNumDevis(numdevis);
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
          this.addrdvForm.patchValue({ numdevis: this.devisList[0].numdevis });
          this.fetchPrestationTitreByNumDevis(this.devisList[0].numdevis);
          this.fetchpretByNumDevis(this.devisList[0].numdevis);
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
          this.addrdvForm.patchValue({ 'titrepres': response['prestation']['titre'] });
        } else {
          console.error('Titre de prestation non trouvé pour le numéro de devis:', numdevis);
          this.toastr.error('Titre de prestation non trouvé pour le numéro de devis.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération du titre de prestation:', error);
        this.toastr.error('Erreur lors de la récupération du titre de prestation.');
      }
    );
  }


  fetchpretByNumDevis(numdevis: string): void {
    const url = `${backendURL2}/getdevis/${numdevis}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response['voiturepret'] ) {
          this.addrdvForm.patchValue({ 'voiturepret': response['voiturepret'] });
        } else {
          console.error('Voiture de prét non trouvé pour le numéro de devis:', numdevis);
          this.toastr.error('Voiture de prét non trouvé pour le numéro de devis.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération du Voiture de prét:', error);
        this.toastr.error('Erreur lors de la récupération du Voiture de prét.');
      }
    );
  }
  
  
  

  

  adddevis() {
    if (this.adddevisForm.valid) {
      const formData = new FormData();
      formData.append('utilisateur[email]', this.adddevisForm.get('email')?.value);
      formData.append('prestation[titre]', this.adddevisForm.get('titre')?.value);
      formData.append('prestation[desc]', this.adddevisForm.get('desc')?.value);
      formData.append('vehicule[make]', this.getMakeFromId(this.adddevisForm.get('vehicule')?.value));
      formData.append('vehicule[immatriculation]', this.getImmatriculationFromId(this.adddevisForm.get('vehicule')?.value));
      formData.append('typedemande', this.adddevisForm.get('typedemande')?.value);
      formData.append('voiturepret', this.adddevisForm.get('voiturepret')?.value ? 'oui' : 'non');

      this.selectedFiles.forEach((file: File) => {
        formData.append('images', file, file.name);
      });

      this.http.post<any>(`${backendURL2}/adddevis2`, formData).subscribe(
        response => {
          this.adddevisForm.reset();
          this.showAddForm2 = false;
          this.toastr.success('Devis ajouté avec succès!');
        },
        error => {
          this.toastr.error('Erreur lors de l\'ajout du devis.');
          console.error('Error adding devis:', error);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }

  // Implémentez des méthodes d'aide pour extraire make et immatriculation de vehicules
  getMakeFromId(vehiculeId: string): string {
    const vehicule = this.vehicules.find(v => v._id === vehiculeId);
    return vehicule ? vehicule.make : '';
  }

  getImmatriculationFromId(vehiculeId: string): string {
    const vehicule = this.vehicules.find(v => v._id === vehiculeId);
    return vehicule ? vehicule.immatriculation : '';
  }

  scheduleAppointment(): void {
    this.showAddForm1 = !this.showAddForm1;
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }
  addrdv(): void {
    if (this.addrdvForm.valid) {
      const dateSouhaitee = new Date(this.addrdvForm.get('datesouhaite')?.value);
      const heureSouhaitee = parseInt(this.addrdvForm.get('heuresouhaite')?.value, 10);
  
      const formData = {
        vehicule: {
          make: this.getMakeFromId(this.addrdvForm.get('vehicule')?.value),
          immatriculation: this.getImmatriculationFromId(this.addrdvForm.get('vehicule')?.value),
          model: this.getModelFromId(this.addrdvForm.get('vehicule')?.value)
        },
        datesouhaite: this.addrdvForm.get('datesouhaite')?.value,
        heuresouhaite: this.addrdvForm.get('heuresouhaite')?.value,
        titrepres: this.addrdvForm.get('titrepres')?.value,
        numdevis: this.addrdvForm.get('numdevis')?.value,
        desc: this.addrdvForm.get('desc')?.value,
        voiturepret: this.addrdvForm.get('voiturepret')?.value,
        email: this.addrdvForm.get('email')?.value,
      };
  
      // Debugging logs
      console.log('Form Values:', this.addrdvForm.value);
      console.log('Form Data:', formData);
  
      const currentDate = new Date();
      if (dateSouhaitee <= currentDate) {
        this.toastr.warning('Veuillez sélectionner une date future pour le rendez-vous.');
        return;
      }
  
      // Vérifier si l'heure est entre 8h et 19h
      if (heureSouhaitee < 8 || heureSouhaitee > 19) {
        this.toastr.info('Veuillez sélectionner une heure entre 8h et 19h pour le rendez-vous.');
        return;
      }
  
      // Toutes les validations sont passées, soumettre le formulaire
      this.http.post<any>(`${this.apiUrl}/addrdv`, formData).subscribe(
        (newRDV) => {
          this.addrdvForm.reset();
          this.showAddForm1 = false;
          this.toastr.success('Rendez-vous ajouté avec succès');
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Erreur lors de l\'ajout du rendez-vous');
          console.error('Error adding RDV:', error);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }
  
  getModelFromId(vehiculeId: string): string {
    const vehicule = this.vehicules.find(v => v._id === vehiculeId);
    return vehicule ? vehicule.model: '';
  }
}
