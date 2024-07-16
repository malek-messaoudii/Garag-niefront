// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Import the AuthService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getRole(); // Retrieve the role from the AuthService
  }
}
