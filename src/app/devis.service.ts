import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private backendUrl = 'http://localhost:4000/devis'; 

  constructor(private http: HttpClient) {}

  submitDevis(data: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/adddevis`, data);
  }
}
