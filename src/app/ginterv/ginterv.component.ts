import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ginterv',
  templateUrl: './ginterv.component.html',
  styleUrls: ['./ginterv.component.css']
})
export class GintervComponent implements OnInit {
  addIntervForm: FormGroup;
  interventions: any[] = [];
  emails: string[] = [];
  showAddForm: boolean = false;
  selectedFile: File | null = null;
  
  private apiUrl = 'http://localhost:4000/interventions';
  private rdvUrl = 'http://localhost:4000/rdv';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    const userEmail1 = localStorage.getItem('userEmail') || '';
    this.addIntervForm = this.fb.group({
      email: ['', Validators.required],
      titre: ['', Validators.required],
      kilo: ['', Validators.required],
      pdf: [null, Validators.required],
      emailperso: [userEmail1, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.fetchInterventions();
    this.fetchEmails();
  }

  fetchInterventions(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.toastr.error('Email not found in localStorage');
      return;
    }
    this.http.get<any[]>(`${this.apiUrl}/getbyemail/${userEmail}`).subscribe(
      (data) => {
        this.interventions = data;
        if (this.interventions.length === 0) {
          this.toastr.info('Pas encore d\'interventions');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching interventions:', error);
      }
    );
  }

  fetchEmails(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.toastr.error('Email not found in localStorage');
      return;
    }
    this.http.get<string[]>(`${this.rdvUrl}/emails/${userEmail}`).subscribe(
      (data) => {
        this.emails = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching emails:', error);
        this.toastr.error('Erreur lors de la récupération des emails');
      }
    );
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.addIntervForm.get('pdf')?.setValue(file); // Update form control value
    } else {
      this.toastr.error('Veuillez sélectionner un fichier PDF');
      this.addIntervForm.get('pdf')?.reset();
      this.selectedFile = null; // Reset selected file
    }
  }

  addIntervention(): void {
    console.log(this.addIntervForm.value);  // Log form values
    console.log(this.addIntervForm.valid);  // Log form validity
  
    if (this.addIntervForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('email', this.addIntervForm.get('email')?.value);
      formData.append('titre', this.addIntervForm.get('titre')?.value);
      formData.append('kilo', this.addIntervForm.get('kilo')?.value);
      formData.append('pdf', this.selectedFile);
  
      const emailPerso = localStorage.getItem('userEmail') || '';
      formData.append('emailperso', emailPerso);
  
      this.http.post<any>(`${this.apiUrl}/addinter`, formData).subscribe(
        (newIntervention) => {
          this.interventions.push(newIntervention);
          this.addIntervForm.reset();
          this.selectedFile = null;
          this.showAddForm = false;
          this.toastr.success('Intervention ajoutée avec succès');
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding intervention:', error);
          this.toastr.error(`Erreur lors de l'ajout de l'intervention`);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }
  
}
