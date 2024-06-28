import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  currentStep: number = 1;
  vehicleInfo: any = {};
  usageInfo: any = {};
  specificOptions: any = {};

  goToNextStep() {
    this.currentStep++;
  }

  goToPreviousStep() {
    this.currentStep--;
  }

  setVehicleInfo(info: any) {
    this.vehicleInfo = info;
  }

  setUsageInfo(info: any) {
    this.usageInfo = info;
  }

  setSpecificOptions(options: any) {
    this.specificOptions = options;
  }
}



