import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  email: string = '';
  codeSent: boolean = false;
  code: string = '';

  handleSendCode(event: Event): void {
    event.preventDefault();
    // Logic to send reset code to the provided email
    console.log('Reset code sent to:', this.email);
    this.codeSent = true;
  }

  handleResendCode(event: Event): void {
    event.preventDefault();
    // Logic to resend reset code
    console.log('Reset code resent to:', this.email);
  }

  handleSubmitCode(event: Event): void {
    event.preventDefault();
    // Logic to handle code submission
    console.log('Code submitted:', this.code);
  }

}
