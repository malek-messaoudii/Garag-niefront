import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent implements OnInit {
  selectedPersonType: string = 'client';
  selectedPersonCategory: string = 'physique';

  constructor() { }

  ngOnInit(): void {
  }

  handlePersonTypeChange(event: any) {
    this.selectedPersonType = event.target.value;
    if (this.selectedPersonType === 'garagiste') {
      this.selectedPersonCategory = ''; 
    } else if (this.selectedPersonType === 'client') {
      this.selectedPersonCategory = 'physique';
    }
  }

  handlePersonCategoryChange(event: any) {
    this.selectedPersonCategory = event.target.value;
  }

  isClientPhysiqueSelected(): boolean {
    return this.selectedPersonType === 'client' && this.selectedPersonCategory === 'physique';
  }

  isClientMoraleSelected(): boolean {
    return this.selectedPersonType === 'client' && this.selectedPersonCategory === 'morale';
  }

  isGaragisteSelected(): boolean {
    return this.selectedPersonType === 'garagiste';
  }
}
