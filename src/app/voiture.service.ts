import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private carMakes: Record<string, string[]> = {
    'Toyota': ['Corolla', 'Camry', 'Prius'],
    'Ford': ['Fiesta', 'Focus', 'Mustang'],
    'BMW': ['3 Series', '5 Series', '7 Series']
  };

  getMakes(): string[] {
    return Object.keys(this.carMakes);
  }

  getModels(make: string): string[] {
    return this.carMakes[make] || [];
  }
}
