import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const backendURL2 = 'http://localhost:4000/devis';
const backendURL1 = 'http://localhost:4000/vehicules';
const backendURL = 'http://localhost:4000/rdv';

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

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    const userEmail = localStorage.getItem('userEmail') || '';
    this.addrdvForm = this.fb.group({
      vehicule: [''],
      numdevis: ['', Validators.required],
      datesouhaite: ['', Validators.required],
      heuresouhaite: ['', Validators.required],
      titrepres: ['', Validators.required],
      desc: [''],
      voiturepret: [false],
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
    this.fetchrdv();
    this.fetchVehicles();
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

  fetchrdv(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('No email found in localStorage');
      return;
    }

    this.http.get<any[]>(`${backendURL}/user/${email}`).subscribe(
      (data) => {
        this.rdvs = data;
        if (this.rdvs.length === 0) {
          this.toastr.info('Pas de rendez-vous trouvés.');
        }
      },
      (error) => {
        console.error('Error fetching rendez-vous:', error);
        this.toastr.error('Erreur lors de la récupération des rendez-vous.');
      }
    );
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

  // Methods to extract make and immatriculation from vehicles
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
      this.http.post<any>(`${backendURL}/addrdv`, this.addrdvForm.value).subscribe(
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
