import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuantityService } from '../quantity.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  {
  cartItems: any[] = [];
  total: number = 0;
  qrCodeUrl: string = '';
  console: any;
  selectedQuantity: number = 50;

  constructor(private http: HttpClient, private authService: AuthService, private snackBar: MatSnackBar, private router: Router, private quantityService: QuantityService) { }

  async ngOnInit(): Promise<void> {
    // Assuming you have a way to get the user's ID (e.g., from AuthService)
    const userId = this.authService.getLoggedInUserId();

    // Fetch cart data from backend
    this.http.get<any[]>(`http://localhost:3000/get-cart-products/${userId}`).subscribe(
      (cartItems: any[]) => {
        this.cartItems = cartItems.map(item => ({ ...item, quantity: this.quantityService.getSelectedQuantity(item.product_id) }));
        this.calculateTotal();
        
      },
      (error) => {
        console.error('Error fetching cart data:', error);
        // Handle error
      }
    );
  }

    calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.actual_price * item.quantity), 0);
  }

  getTotal(): number {
    return this.total;
  }

  calculateItemTotal(item: any): number {
  return item.actual_price * item.quantity;
  }
  
   async increaseQuantity(item: any): Promise<void> {
    item.quantity += 50;
    await this.updateQuantity(item.product_id, item.quantity);
    this.calculateTotal();
  }

  async decreaseQuantity(item: any): Promise<void> {
    if (item.quantity > 50) {
      item.quantity -= 50;
      await this.updateQuantity(item.product_id, item.quantity);
      this.calculateTotal();
    }
  }

    private async updateQuantity(productId: number, quantity: number) {
    const userId = this.authService.getLoggedInUserId();
    this.http.put<any>(`http://localhost:3000/update-cart-item/${userId}/${productId}`, { quantity }).subscribe(
      (response) => {
        console.log('Quantity updated successfully:', response);
      },
      (error) => {
        console.error('Error updating quantity:', error);
      }
    );
  }
 
 buyNow(): void {
    // Assuming you have a way to get the user's ID (e.g., from AuthService)
    const userId = this.authService.getLoggedInUserId();

    // Send HTTP POST request to backend /buy endpoint
    this.http.post<any>('http://localhost:3000/buy', { userId }).subscribe(
      (response) => {
        console.log('Purchase successful:', response);
        this.snackBar.open('Your purchase was successful!', 'Close', { duration: 2500 });
        // Optionally, you can navigate to a success page or show a success message here
      },
      (error) => {
        console.error('Error purchasing:', error);
        this.snackBar.open('Your purchase was unsuccessful!', 'Close', { duration: 2500 });

        // Handle error, show error message, etc.
      }
    );
  }

  checkout() {
    this.router.navigate(["/checkout"]);
  }
  

  removeFromCart(productId: number): void {
  // Assuming you have a way to get the user's ID (e.g., from AuthService)
    console.log('Removing product with ID:', productId);
    
    const userId = this.authService.getLoggedInUserId();
    
  

  // Send HTTP DELETE request to backend /remove-from-cart endpoint
  this.http.delete<any>(`http://localhost:3000/remove-from-cart/${userId}/${productId}`).subscribe(
    (response) => {
      console.log('Product removed from cart:', response);
      this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
      this.calculateTotal()

    },
    (error) => {
      console.error('Error removing product from cart:', error);
      // Handle error, show error message, etc.
    }
  );
}
}
