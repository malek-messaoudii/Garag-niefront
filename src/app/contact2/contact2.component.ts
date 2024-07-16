import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

const backendURL = 'http://localhost:4000/formcontact';

@Component({
  selector: 'app-contact2',
  templateUrl: './contact2.component.html',
  styleUrls: ['./contact2.component.css']
})
export class Contact2Component implements OnInit {

  formData = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    message: ''
  };

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  handleSubmit(form: NgForm): void {
    if (form.valid) {
      this.http.post(`${backendURL}/addformcontact`, this.formData).subscribe(
        response => {
          this.toastr.success('Formulaire envoyé avec succès!');
          form.resetForm();
        },
        error => {
          this.toastr.error("Échec d'envoi.");
        }
      );
    } else {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
