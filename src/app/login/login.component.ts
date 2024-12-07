import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('state', [
      state('void, hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
      transition('visible => *', animate('75ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ]),
  ],
})
export class LoginComponent {

    loginData = { usernameOremail_id: '', password: '', user_id: "" };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private snackbar: MatSnackBar) {}

  onSubmit() {
  this.http.post('http://localhost:3000/login', this.loginData).subscribe(
    (response: any) => {
      console.log('Login response:', response); // Log the entire response
      
      // Check if the userId property exists in the response
      if ('user_id' in response) {
        console.log('User ID:', response.user_id); // Log the user ID if it exists
        // Set the logged-in user and user ID in AuthService
        this.authService.setLoggedInUser(response.username, response.user_id);

        this.snackbar.open("You are now logged in as " + response.username, "", { duration: 3000 });

        this.router.navigate(['/home']);
      } else {
        console.error('User ID is missing in the response');
      }
    },
    (error) => {
      console.error('Login failed', error);
      this.snackbar.open("Invalid username or password", "Try again", { duration: 3000 });
    }
  );
}

  goToSignupPage() {
    this.router.navigate(['/register']);
  }
  
}
