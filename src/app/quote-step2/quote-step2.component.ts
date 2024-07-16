import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quote-step2',
  templateUrl: './quote-step2.component.html',
  styleUrls: ['./quote-step2.component.css']
})
export class QuoteStep2Component implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  @Output() usageInfo = new EventEmitter<any>();

  @Input() vehicule: any;
  @Input() prestation: any = {
    titre: '',
    selectedTypes: [],
    options: '',
  };
  @Input() datedernierrevision: any;

  selectedTypes: string[] = [];

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.prestation && this.prestation.selectedTypes) {
      this.selectedTypes = this.prestation.selectedTypes;
    }
  }

  onUsageTypeChange(event: any): void {
    const selected = event.target.value;
    if (event.target.checked) {
      this.selectedTypes.push(selected);
    } else {
      const index = this.selectedTypes.indexOf(selected);
      if (index > -1) {
        this.selectedTypes.splice(index, 1);
      }
    }
    this.prestation.selectedTypes = this.selectedTypes;
  }

  onNext(): void {
    if (this.isFormValid()) {
      if (new Date(this.datedernierrevision) > new Date()) {
        this.toastr.warning('La date de la dernière révision ne peut pas être dans le futur.');
        return;
      }
      const usageData = {
        selectedTypes: this.selectedTypes,
        datedernierrevision: this.datedernierrevision
      };
      this.usageInfo.emit(usageData);
      this.nextStep.emit();
      this.toastr.success('Étape 2 validée avec succès.');
    } else {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onPrevious(): void {
    this.prevStep.emit();
  }

  isFormValid(): boolean {
    return this.selectedTypes.length > 0 && this.datedernierrevision;
  }
}
