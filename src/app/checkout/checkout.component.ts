import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  

  constructor(private authService: AuthService, private http: HttpClient, private snackBar : MatSnackBar,private router : Router) { }
  
  cartItems: any[] = []
  total: number = 0;


   ngOnInit(): void {
    // Assuming you have a way to get the user's ID (e.g., from AuthService)
    const userId = this.authService.getLoggedInUserId();

    // Fetch cart data from backend
    this.http.get<any[]>(`http://localhost:3000/get-cart-products/${userId}`).subscribe(
      (cartItems: any[]) => {
        this.cartItems = cartItems;
        this.calculateTotal();
        
      },
      (error) => {
        console.error('Error fetching cart data:', error);
         this.snackBar.open('Error fetching cart data', 'Close', { duration: 2500 });
      }
    );
  }

    calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.actual_price * item.quantity), 0);
  }

   getTotal(): number {
    return this.total;
  }

  buynow():void {
  const userId = this.authService.getLoggedInUserId();

    // Send HTTP POST request to backend /buy endpoint
    this.http.post<any>('http://localhost:3000/buy', { userId }).subscribe(
      (response) => {
        console.log('Purchase successful:', response);
        this.snackBar.open('Your purchase was successful!', 'Close', { duration: 2500 });
        this.router.navigate(['/success']);
        
      },
      (error) => {
        console.error('Error purchasing:', error);
        this.snackBar.open('Your purchase was unsuccessful!', 'Close', { duration: 2500 });
      }
    );
}

  
  submit(form: NgForm) {
    form.resetForm();
  }


}
