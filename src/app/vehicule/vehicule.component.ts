import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VoitureService } from '../voiture.service'; // Adjust path as necessary


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
  vehicules: any[] = [];
  prestation: any[] = [];
  utilisateur: any[] = [];
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
      vehicule: [''],
      numdevis: ['', Validators.required],
      datesouhaite: ['', Validators.required],
      heuresouhaite: ['', Validators.required],
      titrepres : ['', Validators.required],
      desc : [''],
      voiturepret: [false],
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
      this.http.post<any>(`${this.backendUrl}/addrdv`, this.addrdvForm.value).subscribe(
        (newRDV) => {
          this.addrdvForm.reset();
          this.showAddForm1 = false;
          this.toastr.success('Rendez-vous ajouté avec succès');
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'ajout du rendez-vous');
          console.error('Error adding RDV:', error);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
