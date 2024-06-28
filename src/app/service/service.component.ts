import { Component, OnInit } from '@angular/core';

interface ServiceItem {
  title: string;
  icon: string;
}


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  items: ServiceItem[] = [
    { title: 'Mise en relation avec des garages certifiés', icon: 'Nous mettons en contact les propriétaires de véhicules avec des garages qualifiés pour la réparation automobile.' },
    { title: 'Demande de devis en ligne ', icon: 'Les clients peuvent soumettre leurs besoins et obtenir des estimations pour les réparations.' },
    { title: 'Comparaison des garages', icon: 'Nous diffusons les offres promotionnelles des garages partenaires sur notre site web.' },
    { title: 'Suivi de l’état des réparations', icon: 'Notre plateforme permet aux clients de suivre l’avancement de leurs demandes en ligne N’hésitez pas à nous contacter pour plus d’informations' },
   
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
