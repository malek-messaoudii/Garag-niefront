import { Component, EventEmitter, Output,OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-step3',
  templateUrl: './quote-step3.component.html',
  styleUrls: ['./quote-step3.component.css']
})
export class QuoteStep3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  @Output() specificOptions = new EventEmitter<any>();

  options: any = {
    option1: false,
    option2: false
  };

  onNext() {
    this.specificOptions.emit(this.options);
    this.nextStep.emit();
  }

  onPrevious() {
    this.prevStep.emit();
  }

}
