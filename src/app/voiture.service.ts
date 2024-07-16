import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private carMakes: Record<string, string[]> = {
    'Toyota': ['Corolla', 'Camry', 'Prius', 'RAV4', 'Highlander'],
    'Ford': ['Fiesta', 'Focus', 'Mustang', 'Explorer', 'F-150'],
    'BMW': ['3 Series', '5 Series', '7 Series', 'X3', 'X5'],
    'Audi': ['A3', 'A4', 'A6', 'Q5', 'Q7'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit'],
    'Chevrolet': ['Spark', 'Malibu', 'Impala', 'Equinox', 'Tahoe'],
    'Nissan': ['Sentra', 'Altima', 'Maxima', 'Rogue', 'Murano'],
    'Hyundai': ['Elantra', 'Sonata', 'Santa Fe', 'Tucson', 'Kona'],
    'Kia': ['Rio', 'Forte', 'Optima', 'Sportage', 'Sorento'],
    'Volkswagen': ['Golf', 'Jetta', 'Passat', 'Tiguan', 'Atlas'],
    'Subaru': ['Impreza', 'Legacy', 'Outback', 'Forester', 'Ascent'],
    'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Koleos'],
    'Chery': ['Tiggo 3', 'Tiggo 5', 'Tiggo 7', 'Arrizo 5', 'Arrizo 7'],
    'Fiat': ['500', 'Panda', 'Tipo', 'Punto', 'Ducato'],
    'Peugeot': ['208', '308', '508', 'Partner', '3008'],
    'Acura': ['ILX', 'MDX', 'RDX', 'TLX'],
    'Alfa Romeo': ['Giulia', 'Stelvio', '4C'],
    'Aston Martin': ['DB11', 'Vantage', 'DBS'],
    'Bentley': ['Bentayga', 'Continental', 'Flying Spur'],
    'Buick': ['Enclave', 'Encore', 'Envision'],
    'Cadillac': ['CT5', 'XT5', 'Escalade'],
    'Chrysler': ['300', 'Pacifica'],
    'Citroën': ['C3', 'C4', 'C5 Aircross'],
    'Dodge': ['Charger', 'Durango', 'Challenger'],
    'Ferrari': ['488', 'Portofino', 'Roma'],
    'GMC': ['Acadia', 'Terrain', 'Yukon'],
    'Infiniti': ['Q50', 'QX60', 'QX80'],
    'Jaguar': ['XE', 'XF', 'F-Pace'],
    'Jeep': ['Cherokee', 'Grand Cherokee', 'Wrangler'],
    'Lamborghini': ['Huracan', 'Aventador', 'Urus'],
    'Land Rover': ['Range Rover', 'Discovery', 'Defender'],
    'Lexus': ['IS', 'RX', 'NX'],
    'Lincoln': ['Aviator', 'Corsair', 'Nautilus'],
    'Maserati': ['Ghibli', 'Levante', 'Quattroporte'],
    'Mazda': ['Mazda3', 'CX-5', 'CX-9'],
    'Mini': ['Cooper', 'Countryman', 'Clubman'],
    'Mitsubishi': ['Outlander', 'Eclipse Cross', 'Mirage'],
    'Porsche': ['911', 'Cayenne', 'Macan'],
    'Ram': ['1500', '2500', '3500'],
    'Rolls-Royce': ['Ghost', 'Phantom', 'Cullinan'],
    'Saab': ['9-3', '9-5'],
    'Suzuki': ['Swift', 'Vitara', 'Jimny'],
    'Tesla': ['Model S', 'Model 3', 'Model X', 'Model Y'],
    'Volvo': ['S60', 'XC40', 'XC90']
  };

  getMakes(): string[] {
    return Object.keys(this.carMakes);
  }

  getModels(make: string): string[] {
    return this.carMakes[make] || [];
  }
  
}
