import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VoitureService } from '../voiture.service'; // Adjust path as necessary

@Component({
  selector: 'app-gmecan',
  templateUrl: './gmecan.component.html',
  styleUrls: ['./gmecan.component.css']
})
export class GmecanComponent implements OnInit {

  addMecanForm: FormGroup;
  updateMecanForm: FormGroup;
  mecanicien: any[] = [];
  showAddForm2: boolean = false;
  genre: string[] = ['Monsieur', 'Madame'];
  statut: string[] = ['Actif', 'Non actif'];
  showAddForm: boolean = false;
  showAddForm1: boolean = false;
  showUpdateForm: boolean = false;
  selectedMecanId: string | null = null;

  private apiUrl = 'http://localhost:4000/mecanicien';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    const userEmail1 = localStorage.getItem('userEmail') || '';
    this.addMecanForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      status: ['', Validators.required],
      genre: ['', Validators.required],
      emailperso: [userEmail1, [Validators.required, Validators.email]]
    });
    const userEmail = localStorage.getItem('userEmail') || '';
    this.updateMecanForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      status: ['', Validators.required],
      genre: ['', Validators.required],
      emailperso: [userEmail, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.fetchMecaniciens();
  }

  fetchMecaniciens(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.toastr.error('Email not found in localStorage');
      return;
    }
    this.http.get<any[]>(`${this.apiUrl}/user/${userEmail}`).subscribe(
      (data) => {
        this.mecanicien = data;
        if (this.mecanicien.length === 0) {
          this.toastr.info('Pas de mécaniciens trouvés');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching mecaniciens:', error);
      }
    );
  }
  

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addMecanicien(): void {
    if (this.addMecanForm.valid) {
      console.log('Adding mecanicien with data:', this.addMecanForm.value);
      this.http.post<any>(`${this.apiUrl}/addmecan`, this.addMecanForm.value).subscribe(
        (newMecanicien) => {
          this.mecanicien.push(newMecanicien);
          this.addMecanForm.reset();
          this.showAddForm = false;
          this.toastr.success('Mécanicien ajouté avec succès');
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding mecanicien:', error);
          this.toastr.error(`Erreur lors de l'ajout du mécanicien:`);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }



  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
  }

  openUpdateForm(mecanicien: any): void {
    this.selectedMecanId = mecanicien._id;  // Ensure _id is used
    this.updateMecanForm.patchValue(mecanicien);
    this.showUpdateForm = true;
  }
  
  submitUpdatedMecanicien(): void {
    if (this.updateMecanForm.valid && this.selectedMecanId) {
      console.log('Updating mecanicien with id:', this.selectedMecanId, 'and data:', this.updateMecanForm.value);
      this.http.put<any>(`${this.apiUrl}/updatemecan/${this.selectedMecanId}`, this.updateMecanForm.value).subscribe(
        (updatedMecanicien) => {
          const index = this.mecanicien.findIndex(m => m._id === this.selectedMecanId);
          if (index !== -1) {
            this.mecanicien[index] = updatedMecanicien;
          }
          this.updateMecanForm.reset();
          this.showUpdateForm = false;
          this.selectedMecanId = null;
          this.toastr.success('Mécanicien mis à jour avec succès');
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating mecanicien:', error);
          this.toastr.error(`Erreur lors de la mise à jour du mécanicien`);
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }
  

  deleteMecanicien(id: string): void {
    console.log('Deleting mecanicien with id:', id);
    this.http.delete(`${this.apiUrl}/deletemecan/${id}`).subscribe(
      () => {
        this.mecanicien = this.mecanicien.filter(m => m._id !== id);
        this.toastr.success('Mécanicien supprimé avec succès');
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting mecanicien:', error);
        this.toastr.error(`Erreur lors de la suppression du mécanicien`);
      }
    );
  }
}
