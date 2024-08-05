import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const backendURL2 = 'http://localhost:4000/devis';
const backendURL1 = 'http://localhost:4000/vehicules';
const backendURL = 'http://localhost:4000/rdv';

interface Carnet {
  name: string;
  description: string;
  country: string;
  yearFounded: number;
}

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.component.html',
  styleUrls: ['./carnet.component.css']
})
export class CarnetComponent implements OnInit {
  rdvs: any[] = [];
  filteredRdvs: any[] = [];
  addrdvForm: FormGroup;
  adddevisForm: FormGroup;
  vehicules: any[] = [];
  showAddForm2: boolean = false;
  showAddForm1: boolean = false;
  selectedFiles: File[] = [];
  devisList: any[] = []; 
  utilisateur: any[] = [];
  selectedDevis: any;

  private apiUrl = 'http://localhost:4000/vehicules';


  vehicleBrands: Carnet[] = [
    { name: 'Toyota', description: 'Toyota Motor Corporation est un fabricant automobile multinational japonais.', country: 'Japon', yearFounded: 1937 },
    { name: 'Ford', description: 'Ford Motor Company est un constructeur automobile multinational américain.', country: 'États-Unis', yearFounded: 1903 },
    { name: 'BMW', description: 'Bayerische Motoren Werke AG est une entreprise multinationale allemande qui produit des véhicules de luxe.', country: 'Allemagne', yearFounded: 1916 },
    { name: 'Mercedes-Benz', description: 'Mercedes-Benz est une marque allemande d\'automobiles de luxe.', country: 'Allemagne', yearFounded: 1926 },
    { name: 'Audi', description: 'Audi AG est un constructeur automobile allemand qui conçoit, fabrique, commercialise et distribue des véhicules de luxe.', country: 'Allemagne', yearFounded: 1910 },
    { name: 'Honda', description: 'Honda Motor Co., Ltd. est un fabricant automobile multinational japonais.', country: 'Japon', yearFounded: 1948 },
    { name: 'Chevrolet', description: 'Chevrolet, surnommé Chevy, est une division de General Motors.', country: 'États-Unis', yearFounded: 1911 },
    { name: 'Nissan', description: 'Nissan Motor Co., Ltd. est un constructeur automobile multinational japonais.', country: 'Japon', yearFounded: 1933 },
    { name: 'Hyundai', description: 'Hyundai Motor Company est un constructeur automobile sud-coréen.', country: 'Corée du Sud', yearFounded: 1967 },
    { name: 'Kia', description: 'Kia Corporation est un constructeur automobile sud-coréen.', country: 'Corée du Sud', yearFounded: 1944 },
    { name: 'Volkswagen', description: 'Volkswagen est un constructeur automobile allemand.', country: 'Allemagne', yearFounded: 1937 },
    { name: 'Peugeot', description: 'Peugeot est un constructeur automobile français.', country: 'France', yearFounded: 1810 },
    { name: 'Renault', description: 'Renault est un constructeur automobile français.', country: 'France', yearFounded: 1899 },
    { name: 'Fiat', description: 'Fiat Automobiles est un constructeur automobile italien.', country: 'Italie', yearFounded: 1899 },
    { name: 'Mazda', description: 'Mazda Motor Corporation est un constructeur automobile japonais.', country: 'Japon', yearFounded: 1920 },
    { name: 'Subaru', description: 'Subaru Corporation est un constructeur automobile japonais.', country: 'Japon', yearFounded: 1953 },
    { name: 'Mitsubishi', description: 'Mitsubishi Motors Corporation est un constructeur automobile japonais.', country: 'Japon', yearFounded: 1970 },
    { name: 'Porsche', description: 'Porsche AG est un constructeur automobile allemand spécialisé dans les voitures de sport.', country: 'Allemagne', yearFounded: 1931 },
    { name: 'Lexus', description: 'Lexus est la division de voitures de luxe du constructeur japonais Toyota.', country: 'Japon', yearFounded: 1989 },
    { name: 'Jaguar', description: 'Jaguar Cars est un constructeur automobile de luxe britannique.', country: 'Royaume-Uni', yearFounded: 1935 },
    { name: 'Land Rover', description: 'Land Rover est une marque de véhicules tout-terrain britanniques.', country: 'Royaume-Uni', yearFounded: 1948 },
    { name: 'Volvo', description: 'Volvo Cars est un constructeur automobile suédois.', country: 'Suède', yearFounded: 1927 },
    { name: 'Alfa Romeo', description: 'Alfa Romeo Automobiles S.p.A. est un constructeur automobile italien.', country: 'Italie', yearFounded: 1910 },
    { name: 'Aston Martin', description: 'Aston Martin Lagonda Global Holdings plc est un constructeur automobile britannique de voitures de luxe.', country: 'Royaume-Uni', yearFounded: 1913 },
    { name: 'Bentley', description: 'Bentley Motors Limited est un constructeur automobile britannique de voitures de luxe.', country: 'Royaume-Uni', yearFounded: 1919 },
    { name: 'Bugatti', description: 'Bugatti Automobiles S.A.S. est un constructeur automobile français de voitures de sport.', country: 'France', yearFounded: 1909 },
    { name: 'Cadillac', description: 'Cadillac est une division du constructeur automobile américain General Motors.', country: 'États-Unis', yearFounded: 1902 },
    { name: 'Chrysler', description: 'Chrysler est un constructeur automobile américain.', country: 'États-Unis', yearFounded: 1925 },
    { name: 'Citroën', description: 'Citroën est un constructeur automobile français.', country: 'France', yearFounded: 1919 },
    { name: 'Dodge', description: 'Dodge est un constructeur automobile américain.', country: 'États-Unis', yearFounded: 1900 },
    { name: 'Ferrari', description: 'Ferrari S.p.A. est un constructeur automobile italien de voitures de sport.', country: 'Italie', yearFounded: 1939 },
    { name: 'Jeep', description: 'Jeep est une marque automobile américaine de véhicules tout-terrain.', country: 'États-Unis', yearFounded: 1943 },
    { name: 'Lamborghini', description: 'Automobili Lamborghini S.p.A. est un constructeur automobile italien de voitures de sport.', country: 'Italie', yearFounded: 1963 },
    { name: 'Maserati', description: 'Maserati S.p.A. est un constructeur automobile italien de voitures de luxe.', country: 'Italie', yearFounded: 1914 },
    { name: 'McLaren', description: 'McLaren Automotive est un constructeur automobile britannique de voitures de sport.', country: 'Royaume-Uni', yearFounded: 1985 },
    { name: 'Rolls-Royce', description: 'Rolls-Royce Motor Cars Limited est un constructeur automobile britannique de voitures de luxe.', country: 'Royaume-Uni', yearFounded: 1904 },
    { name: 'Saab', description: 'Saab Automobile AB est un constructeur automobile suédois.', country: 'Suède', yearFounded: 1945 },
    { name: 'Skoda', description: 'Škoda Auto est un constructeur automobile tchèque.', country: 'Tchéquie', yearFounded: 1895 },
    { name: 'Tesla', description: 'Tesla, Inc. est un constructeur automobile américain de véhicules électriques.', country: 'États-Unis', yearFounded: 2003 },
    { name: 'Suzuki', description: 'Suzuki Motor Corporation est un constructeur automobile japonais.', country: 'Japon', yearFounded: 1909 },
    { name: 'Mini', description: 'Mini est une marque britannique de petites voitures.', country: 'Royaume-Uni', yearFounded: 1959 },
    { name: 'Opel', description: 'Opel Automobile GmbH est un constructeur automobile allemand.', country: 'Allemagne', yearFounded: 1862 },
    { name: 'Vauxhall', description: 'Vauxhall Motors est un constructeur automobile britannique.', country: 'Royaume-Uni', yearFounded: 1857 },
    { name: 'Seat', description: 'SEAT, S.A. est un constructeur automobile espagnol.', country: 'Espagne', yearFounded: 1950 },
    { name: 'Dacia', description: 'Dacia est un constructeur automobile roumain.', country: 'Roumanie', yearFounded: 1966 }
  ];

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


  selectedBrand: Carnet | null = null;
  isPopupVisible: boolean = false;

  selectBrand(brand: Carnet): void {
    this.selectedBrand = brand;
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  ngOnInit(): void {
    this.fetchVehicles();
    this.addrdvForm.get('vehicule')?.valueChanges.subscribe(vehiculeId => {
      this.fetchNumDevisByVehicle(vehiculeId);
    });
    this.addrdvForm.get('numdevis')?.valueChanges.subscribe(() => {
      this.onNumDevisChange();
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
  requestQuote(): void {
    this.showAddForm2 = !this.showAddForm2;
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
