import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthGuard } from '../auth.gaurd';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

    @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  products: any[] = [];
  user_id: number | null = null;
  selectedQuantity : number = 50


  constructor(private http: HttpClient,private router : Router,private cartService :CartService,private authService : AuthService,private observer: BreakpointObserver,private authGuard:AuthGuard,private snackBar : MatSnackBar) { }
  
  ngOnInit(): void{
    this.fetchProducts();
     this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
     });
    
    
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  fetchProducts(): void{
    this.http.get<any[]>('http://localhost:3000/getproducts').subscribe((products: any[])=> {
      this.products = products;
    }, (error: any) => {
      console.log(error);  
    });
  }

  addToCart(productId: number, quantity: number ) {
  if (this.authService.isLoggedIn()) {
      const userId = this.authService.getLoggedInUserId(); 
  this.http.post<any>('http://localhost:3000/add-to-cart', { userId, productId, quantity })
    .subscribe(
      (response) => {
        console.log('Product added to cart successfully:', response);
        this.snackBar.open("Added to Cart", "Close", { duration: 2500 });
        this.router.navigate(['/products'])
          
        
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        this.snackBar.open("Unable to add product","Close",{duration:2500})
        // Handle error, show error message, etc.
      }
    );
  } else {
    this.snackBar.open("Please login to Continue.....", "close", { duration: 9000 });
  } 
} 
}
