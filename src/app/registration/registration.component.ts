import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
   animations: [
    trigger('state', [
      state('void, hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
      transition('visible => *', animate('75ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ]),
  ],
})
export class RegistrationComponent {
  isRightPanelActive: boolean = false;
  registrationData = { username: '', email_id: '', password: '' };

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router : Router) { }

  onSubmit() {
    this.http.post('http://localhost:3000/register', this.registrationData).subscribe(
      (response:any) => {
        console.log('Registration successful', response);

        this.registrationData = { username: "", email_id: '', password: '' };
        
        this.snackBar.open("User registered successfully!", "Close", { duration: 2500 });

        this.router.navigate(['/login'])
      },
      (error) => {
        console.error('Registration failed', error);
        this.snackBar.open("Registering Failed! Please try again.", "Close", { duration:  3000 });
      }


    );
  }

  gotologin() {
    this.isRightPanelActive = true;
    this.router.navigate(['/login']);
  }

}
