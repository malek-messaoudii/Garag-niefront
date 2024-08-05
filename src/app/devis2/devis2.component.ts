import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devis2',
  templateUrl: './devis2.component.html',
  styleUrls: ['./devis2.component.css']
})
export class Devis2Component implements OnInit {
  currentStep = 1;
  formData: any = { utilisateur: {}, vehicule: {}, prestation: {}, datedernierrevision: '' };
  selectedPrestation: any = {};
  vehicule: any = {};
  prestation: any = {};

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['prestation']) {
        this.selectedPrestation = JSON.parse(params['prestation']);
      }
    });
  }

  goToNextStep(): void {
    this.currentStep++;
  }

  goToPreviousStep(): void {
    this.currentStep--;
  }

  setVehicleInfo(info: any): void {
    this.vehicule = info;
    this.formData.vehicule = info;
    console.log('Vehicle info:', info);
  }

  setUsageInfo(info: any): void {
    this.prestation.selectedTypes = info.selectedTypes;
    this.formData.prestation.selectedTypes = info.selectedTypes;
    this.formData.datedernierrevision = info.datedernierrevision;
    console.log('Usage info:', info);
  }

  setSpecificOptions(options: any): void {
    this.prestation.options = options;
    this.formData.prestation.options = options;
    console.log('Specific options:', options);
  }

  setPrestationInfo(prestation: any): void {
    this.selectedPrestation = prestation;
    this.formData.prestation = prestation;
    console.log('Prestation info:', prestation);
  }
}
