import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css'],
  providers: [DatePipe]
})
export class PromotionComponent implements OnInit {
  newPromotion = { price: 0, description: '', mois: '' };
  private apiUrl = 'http://localhost:4000/promotions';
  promotionsByMonth: { [key: string]: Array<{ price: number, description: string, mois: string, _id?: string }> } = {};

  months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  constructor(private datePipe: DatePipe, private http: HttpClient) {}

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

  addPromotion(): void {
    this.http.post<any>(`${this.apiUrl}/register`, this.newPromotion).subscribe(
      response => {
        this.promotionsByMonth = this.groupPromotionsByMonth([...this.getAllPromotions(), response]);
        this.newPromotion = { price: 0, description: '', mois: '' }; // Reset the form
        console.log('Promotion added successfully');
      },
      error => {
        console.error('Error adding promotion:', error);
      }
    );
  }

  deletePromotion(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        this.promotionsByMonth = this.groupPromotionsByMonth(this.getAllPromotions().filter(promotion => promotion._id !== id));
        console.log('Promotion deleted successfully');
      },
      error => {
        console.error('Error deleting promotion:', error);
      }
    );
  }

  private getAllPromotions(): any[] {
    return Object.values(this.promotionsByMonth).flat();
  }
}
