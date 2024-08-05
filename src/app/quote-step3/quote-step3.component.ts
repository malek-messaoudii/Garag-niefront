import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quote-step3',
  templateUrl: './quote-step3.component.html',
  styleUrls: ['./quote-step3.component.css']
})
export class QuoteStep3Component implements OnInit {

  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  @Output() vehicleInfo = new EventEmitter<any>();
  @Output() prestationInfo = new EventEmitter<any>();

  @Input() vehicule: any;
  @Input() prestation: any = {
    specificOptions: [],
    options: [],
    datedernierrevision: ''
  };

  options: string[] = [];

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.prestation && this.prestation.options) {
      this.options = [...this.prestation.options];
    } else {
      this.prestation.options = [];
    }
  }

  onOptionChange(event: any): void {
    const selected = event.target.value;
    if (event.target.checked) {
      this.options.push(selected);
    } else {
      const index = this.options.indexOf(selected);
      if (index > -1) {
        this.options.splice(index, 1);
      }
    }
  }

  onNext(): void {
    if (this.isFormValid()) {
      this.prestation.options = this.options;
      this.prestationInfo.emit(this.prestation);
      this.vehicleInfo.emit(this.vehicule);
      this.nextStep.emit();
      this.toastr.success('Étape 3 validée avec succès.');
      console.log(this.options, this.prestation.datedernierrevision);
    } else {
      this.toastr.warning('Veuillez sélectionner au moins une option.');
    }
  }

  onPrevious(): void {
    this.prevStep.emit();
  }

  isFormValid(): boolean {
    return this.options.length > 0;
  }
}
