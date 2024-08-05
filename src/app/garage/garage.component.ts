  
  import { Component, OnInit } from '@angular/core';

  interface Service {
    title: string;
    description: string;
    image: string;
  }

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {


  

    garagisteName: string = 'Nom du Garagiste';
    services: Service[] = [
      {
        title: 'Changement de pneus',
        description: 'Service rapide et professionnel pour tous types de pneus.',
        image: 'path/to/tire-service.jpg'
      },
      {
        title: 'Révision complète',
        description: 'Révision complète de votre véhicule pour une sécurité optimale.',
        image: 'path/to/full-check.jpg'
      },
      {
        title: 'Diagnostic moteur',
        description: 'Diagnostic précis pour identifier et résoudre les problèmes de moteur.',
        image: 'path/to/engine-diagnostic.jpg'
      }
    ];
  
    constructor() {}
  
    ngOnInit(): void {}
  }
  