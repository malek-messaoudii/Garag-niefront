import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { VoitureService } from '../voiture.service';

@Component({
  selector: 'app-quote-step1',
  templateUrl: './quote-step1.component.html',
  styleUrls: ['./quote-step1.component.css']
})
export class QuoteStep1Component implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() vehicleInfo = new EventEmitter<any>();

  vehicle: any = {
    make: '',
    model: '',
    immatriculation: ''
  };

  makes: string[] = [];
  models: string[] = [];

  constructor(private carDataService: VoitureService) { }

  ngOnInit(): void {
    this.makes = this.carDataService.getMakes();
  }

  onMakeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const make = target.value;
    this.models = this.carDataService.getModels(make);
    this.vehicle.model = ''; // Reset model when make changes
  }

  onNext() {
    this.vehicleInfo.emit(this.vehicle);
    this.nextStep.emit();
  }
}
