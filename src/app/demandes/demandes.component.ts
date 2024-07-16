import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
const backendURL1 = 'http://localhost:4000/vehicules';
const backendURL2 = 'http://localhost:4000/devis';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {
  addrdvForm: FormGroup;
  adddevisForm: FormGroup;
  demandes: any[] = [];
  vehicules: any[] = [];
  showAddForm1: boolean = false;
  showAddForm2: boolean = false;
  selectedFiles: File[] = [];

  private apiUrl = 'http://localhost:4000/rdv';

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
      voiturepret: [false],
      email: [userEmail, [Validators.required, Validators.email]]
    });

    const userEmail1 = localStorage.getItem('userEmail') || '';
    this.adddevisForm = this.fb.group({
      typedemande: ['demande de devis', Validators.required],
      vehicule: this.fb.group({
        make: ['', Validators.required],
        model: ['', Validators.required],
      }),
      prestation: this.fb.group({
        titre: ['', Validators.required],
        desc: ['']
      }),
      voiturepret: [false],
      email: [userEmail1, [Validators.required, Validators.email]],
      piecesJustificatives: ['']
    });
  }

  ngOnInit(): void {
    this.fetchDevis();
    this.fetchVehicles();
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
      this.http.post<any>(`${this.apiUrl}/addrdv`, this.addrdvForm.value).subscribe(
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

  
  fetchDevis(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.toastr.error('Email not found in localStorage');
      return;
    }
  
    this.http.get<any[]>(`${backendURL2}/user/${userEmail}`).subscribe(
      (data) => {
        this.demandes = data;
        if (this.demandes.length === 0) {
          this.toastr.info('Pas de demandes de devis');
        }
      },
      (error) => {
        console.error('Error fetching Devis:', error);
      }
    );
    
  }
  
  

  requestQuote(): void {
    this.showAddForm2 = !this.showAddForm2;
  }



  adddevis(): void {
    if (this.adddevisForm.valid) {
      const formData = new FormData();
      formData.append('typedemande', this.adddevisForm.get('typedemande')?.value);
      
      const vehicule = this.adddevisForm.get('vehicule')?.value;
      formData.append('vehicule[make]', vehicule.make);
      formData.append('vehicule[model]', vehicule.model);
  
      const prestation = this.adddevisForm.get('prestation')?.value;
      formData.append('prestation[titre]', prestation.titre);
      formData.append('prestation[desc]', prestation.desc);
  
      formData.append('voiturepret', this.adddevisForm.get('voiturepret')?.value ? 'true' : 'false');
      formData.append('email', this.adddevisForm.get('email')?.value);
  
      this.selectedFiles.forEach(file => {
        formData.append('images', file);
      });
  
      this.http.post<any>(`${backendURL2}/adddevis`, formData).subscribe(
        (newDevis) => {
          this.adddevisForm.reset();
          this.showAddForm2 = false;
          this.toastr.success('Devis ajouté avec succès');
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'ajout du devis');
          console.error('Error adding devis:', error);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
