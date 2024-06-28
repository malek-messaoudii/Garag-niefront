import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valeurs',
  templateUrl: './valeurs.component.html',
  styleUrls: ['./valeurs.component.css']
})
export class ValeursComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
    valeurs = [
      {
        titre: 'Innovation continue',
        description: 'Nous adoptons les dernières technologies pour offrir des solutions de réparation innovantes.',
        icon: 'lightbulb'
      },
      {
        titre: 'Satisfaction client',
        description: 'Notre priorité est la satisfaction de nos clients grâce à un service personnalisé.',
        icon: 'thumb_up'
      },
      {
        titre: 'Transparence',
        description: 'Nous nous engageons à fournir des informations claires et transparentes à nos clients.',
        icon: 'visibility'
      },
      
      
    ];
}
