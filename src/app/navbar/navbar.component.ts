import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchVisible: boolean = false;
  isLoggedIn:boolean = false

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { 
    
  }

    ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); // Initialize isLoggedIn based on authentication state
  }
  
  home(){
    this.router.navigate([`/home`]);
  }
  products() {
    this .router.navigate(["/products"]);
  }
  cart() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/cart']);
    } else {
      this.snackBar.open("Please Login to Continue...", "Close",{duration:2000})
    }

  }

  contactus() {
    this.router.navigate(['contactus'])
  }

  aboutus() {
    this.router.navigate(['aboutus'])
  }
toggleSearch() {
   
    this.searchVisible = !this.searchVisible; 
  }

  
logout() {
    
  this.authService.logout();
  this.isLoggedIn=false;
    this.router.navigate(['login']); 
    console.log(this.authService.getLoggedInUser());
  }

  login() {
    this.router.navigate(['/login']);
    
  }
}
