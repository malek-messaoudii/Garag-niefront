import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const backendURL = 'http://localhost:4000/user';
const backendURL1 = 'http://localhost:4000/vehicules';
const backendURL2 = 'http://localhost:4000/devis';

@Component({
  selector: 'app-userinfos',
  templateUrl: './userinfos.component.html',
  styleUrls: ['./userinfos.component.css']
})
export class UserinfosComponent implements OnInit {
  addrdvForm: FormGroup;
  adddevisForm: FormGroup;
  vehicules: any[] = [];
  devisList: any[] = []; // Declare devisList here
  utilisateur: any[] = [];
  selectedDevis: any;
  showAddForm1: boolean = false;
  showAddForm2: boolean = false;
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
  selectedFiles: File[] = [];
  private apiUrl = 'http://localhost:4000/rdv';

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
    this.fetchUserData();
    this.fetchVehicles();
    this.addrdvForm.get('vehicule')?.valueChanges.subscribe(vehiculeId => {
      this.fetchNumDevisByVehicle(vehiculeId);
    });
    this.addrdvForm.get('numdevis')?.valueChanges.subscribe(() => {
      this.onNumDevisChange();
    });

    }
      
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  scheduleAppointment(): void {
    this.showAddForm1 = !this.showAddForm1;
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
  
    console.log('Form Values:', this.addrdvForm.value);
      console.log('Form Data:', formData);
  
      const currentDate = new Date();
      if (dateSouhaitee <= currentDate) {
        this.toastr.warning('Veuillez sélectionner une date future pour le rendez-vous.');
        return;
      }
  
      if (heureSouhaitee < 8 || heureSouhaitee > 19) {
        this.toastr.info('Veuillez sélectionner une heure entre 8h et 19h pour le rendez-vous.');
        return;
      }
  
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
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération du titre de prestation:', error);
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
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération du Voiture de prét:', error);
      }
    );
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

  onSubmit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('No email found in localStorage');
      return;
    }

    const formData = this.profileForm.value;

    this.http.put(`${backendURL}/updateuser/${email}`, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      })
    }).subscribe(
      response => {
        console.log('User updated successfully:', response);
        this.toastr.success("Informations modifiés avec succés");
        this.fetchUserData();
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  handleLogout(): void {
    this.userData = {
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
    localStorage.clear();
    this.toastr.success("Session terminée");
    this.router.navigate(['/login']);
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
      formData.append('vehicule[model]', this.getModelFromId(this.adddevisForm.get('vehicule')?.value));
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
        (error: HttpErrorResponse) => {
          this.toastr.error('Erreur lors de l\'ajout du devis.');
          console.error('Error adding devis:', error);
          // Additional logging for debugging
          console.error('Status code:', error.status);
          console.error('Error body:', error.error);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }

  // Helper methods to extract make and immatriculation from vehicles
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
}
