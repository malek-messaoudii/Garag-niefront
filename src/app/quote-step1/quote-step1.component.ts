import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { VoitureService } from '../voiture.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quote-step1',
  templateUrl: './quote-step1.component.html',
  styleUrls: ['./quote-step1.component.css']
})
export class QuoteStep1Component implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() vehicleInfo = new EventEmitter<any>();
  @Output() prestationInfo = new EventEmitter<any>();

  vehicule: any = {
    make: '',
    model: '',
    immatriculation: '',
    kilo: ''
  };

  makes: string[] = [];
  models: string[] = [];
  prestation: any;

  constructor(
    private carDataService: VoitureService, 
    private route: ActivatedRoute,
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    this.makes = this.carDataService.getMakes();
    this.route.queryParams.subscribe(params => {
      if (params['prestation']) {
        this.prestation = JSON.parse(params['prestation']);
      }
    });
  }

  onMakeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const make = target.value;
    this.models = this.carDataService.getModels(make);
    this.vehicule.model = ''; // Clear the selected model
  }
  
  onNext(): void {
    if (!this.vehicule.make || !this.vehicule.model || !this.vehicule.immatriculation || !this.vehicule.kilo) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    this.vehicleInfo.emit(this.vehicule);
    this.prestationInfo.emit(this.prestation);
    this.nextStep.emit();
    this.toastr.success('Étape 1 validée avec succès.');
    console.log(this.vehicule);
  }
}
