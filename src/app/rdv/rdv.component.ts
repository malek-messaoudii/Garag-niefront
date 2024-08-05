import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const backendURL2 = 'http://localhost:4000/devis';
const backendURL1 = 'http://localhost:4000/vehicules';
const backendURL = 'http://localhost:4000/rdv';

interface Vehicule {
  _id: string;
  make: string;
  model: string;
  immatriculation: string;
}


@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {
  rdvs: any[] = [];
  addrdvForm: FormGroup;
  adddevisForm: FormGroup;
  vehicules: any[] = [];
  showAddForm2: boolean = false;
  showAddForm1: boolean = false;
  selectedFiles: File[] = [];
  devisList: any[] = []; 
  utilisateur: any[] = [];
  selectedDevis: any;
  rdvsWithDevisRec: any[] = [];
  rdvsWithoutDevisRec: any[] = [];

  private apiUrl = 'http://localhost:4000/vehicules';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
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

    const userEmail1 = localStorage.getItem('userEmail') || '';
    this.adddevisForm = this.fb.group({
      typedemande: ['Demande de devis'],
      vehicule: ['', Validators.required],
      titre: ['', Validators.required],
      desc: [''],
      voiturepret: [false],
      email: [userEmail1, [Validators.required, Validators.email]],
      images: ['']
    });
  }

  ngOnInit(): void {
    this.fetchRdv();
    this.fetchVehicles();
    this.addrdvForm.get('vehicule')?.valueChanges.subscribe(vehiculeId => {
      if (vehiculeId) {
        this.fetchNumDevisByVehicle(vehiculeId);
      }
    });
    this.addrdvForm.get('numdevis')?.valueChanges.subscribe(numdevis => {
      if (numdevis) {
        this.onNumDevisChange();
      }
    });
  }


  

  fetchVehicles(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('No email found in localStorage');
      return;
    }

    this.http.get<any[]>(`${backendURL1}/user/${email}`).subscribe(
      vehicles => {
        this.vehicules = vehicles;
      },
      error => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  fetchRdv(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('No email found in localStorage');
      return;
    }
  
    this.http.get<any[]>(`${backendURL}/user/${email}`).subscribe(
      (data) => {
        console.log('Fetched RDVs:', data);
        this.rdvs = data;
        if (this.rdvs.length === 0) {
          this.toastr.info('Pas de rendez-vous trouvés.');
        }
        this.filterRdvs(); // Filtrer les rendez-vous après les avoir récupérés
      },
      (error) => {
        console.error('Error fetching rendez-vous:', error);
        this.toastr.error('Erreur lors de la récupération des rendez-vous.');
      }
    );
  }

  filterRdvs(): void {
    this.rdvsWithDevisRec = this.rdvs.filter(r => r.devisrec === true);
    this.rdvsWithoutDevisRec = this.rdvs.filter(r => r.devisrec === false);
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
      this.toastr.error('Véhicule sélectionné non trouvé.');
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
        this.toastr.error('Erreur lors de la récupération du numéro de devis.');
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
