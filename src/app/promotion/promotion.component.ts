import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css'],
  providers: [DatePipe]
})
export class PromotionComponent implements OnInit {
  promotionsByMonth: { [key: string]: { price: number, prestation: { titre: string }, mois: string, _id?: string }[] } = {};
  months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];


  private apiUrl = 'http://localhost:4000/promotions';

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPromotions();
    
  }

  

  fetchPromotions(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => {
        this.promotionsByMonth = this.groupPromotionsByMonth(data);
      },
      error => {
        console.error('Error fetching promotions:', error);
      }
    );
  }

  groupPromotionsByMonth(promotions: any[]): { [key: string]: any[] } {
    return promotions.reduce((groups, promotion) => {
      const month = promotion.mois;
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(promotion);
      return groups;
    }, {});
  }

  onPrestationClick(promotion: any): void {
    this.router.navigate(['/profite'], { queryParams: { promotion: JSON.stringify(promotion) } });
  }
}
