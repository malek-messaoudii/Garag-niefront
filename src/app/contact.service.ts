import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private backendURL = 'http://localhost:4000/formcontact';

  constructor(private http :HttpClient) { 
    
  }
  sendContactForm(formData: any) {
    return this.http.post(`${this.backendURL}/addformcontact`, formData);
  }

}
