import { Component, OnInit } from '@angular/core';


interface questionItem {
  title: string;
  para: string;
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  items: questionItem[] = [
    { title: 'Comment fonctionne notre service de mise en relation avec les garages ?', para: 'Notre service simplifie la recherche de garages pour la réparation automobile. Vous soumettez une demande de devis via notre plateforme, et nous la transmettons à nos partenaires garages. Ils vous envoient ensuite leurs estimations directement.' },
    { title: 'Quels types de réparations proposez-vous ?', para: 'Nous couvrons une large gamme de services, de la mécanique générale à la carrosserie, en passant par les diagnostics électroniques. Quelle que soit la réparation dont vous avez besoin, nous avons des partenaires qualifiés pour vous aider.' },
    { title: 'Quelles garanties offrez-vous sur les travaux effectués par les garages ?', para: 'Nous travaillons uniquement avec des garages certifiés et réputés. Ils offrent des garanties sur leurs réparations conformément aux normes de l’industrie.' },
    { title: 'Pouvez-vous m’aider en cas de litige avec un garage ?', para: 'Absolument ! Si vous rencontrez des problèmes avec l’un de nos partenaires, contactez-nous. Nous ferons de notre mieux pour résoudre tout différend.' },
    { title: 'Comment puis-je suivre l’état de ma demande de réparation ?', para: 'Connectez-vous à votre compte sur notre site web pour suivre l’avancement de votre demande. Vous recevrez également des notifications par e-mail.' },
  ];


  Index: number = 0;
  itemss: questionItem[] = [];

  ngOnInit() {
    this.updateItems();
  }

  changeg() {
    this.Index = (this.Index - 1 + this.items.length) % this.items.length;
    this.updateItems();
  }

  changed() {
    this.Index = (this.Index + 1) % this.items.length;
    this.updateItems();
  }

  updateItems() {
    this.itemss = [this.items[this.Index]];
  }





  constructor() { }



}
