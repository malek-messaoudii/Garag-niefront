import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestations',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.css']
})
export class PrestationsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  prestations = [
    {
      titre: 'FORFAIT RÉVISION',
      image: '.././assets/revision.jpg',
      details: 'Détails supplémentaires sur l\'innovation continue.'
    },
    {
      titre: 'FORFAIT FREINAGE',
      image: '.././assets/freinage.jpg',  
      details: 'Détails supplémentaires sur la satisfaction client.'
    },
    {
      titre: 'FORFAIT AMORTISSEUR',
      image: '.././assets/amorti.jpg',  
      details: 'Détails supplémentaires sur la transparence.'
    },
    {
      titre: 'FORFAIT EMBRAYAGE',
      image: '.././assets/embrayage.jpeg',
      details: 'Détails supplémentaires sur l\'innovation continue.'
    },
    {
      titre: 'DÉMARRAGE',
      image: '.././assets/demarrage.jpg',  
      details: 'Détails supplémentaires sur la satisfaction client.'
    },
    {
      titre: 'FORFAIT KIT DE DISTRIBUTION',
      image: '.././assets/kit.jpg',  
      details: 'Détails supplémentaires sur la transparence.'
    },
    {
      titre: 'DIRECTION',
      image: '.././assets/direction.jpeg',
      details: 'Détails supplémentaires sur l\'innovation continue.'
    },
    {
      titre: 'FORFAIT ÉCHAPPEMENT',
      image: '.././assets/echap.jpeg',  
      details: 'Détails supplémentaires sur la satisfaction client.'
    },
    {
      titre: 'FORFAIT CLIMATISATION',
      image: '.././assets/clim.jpg',  
      details: 'Détails supplémentaires sur la transparence.'
    },
  ];

  onPrestationClick(prestation: any): void {
    this.router.navigate(['/devis'], { queryParams: { prestation: prestation.titre } });
  }

}
