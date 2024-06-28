import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-step2',
  templateUrl: './quote-step2.component.html',
  styleUrls: ['./quote-step2.component.css']
})
export class QuoteStep2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  @Output() usageInfo = new EventEmitter<any>();

  usage: any = {
    type: '',
    lastRevisionDate: ''
  };

  onNext() {
    this.usageInfo.emit(this.usage);
    this.nextStep.emit();
  }

  onPrevious() {
    this.prevStep.emit();
  }
}


