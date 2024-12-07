import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuantitySelector } from "@faststore/ui";
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { QuantityService } from '../quantity.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productId: string = '';
  product: any;
  error: string | undefined;
  selectedQuantity: number = 50;

   @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  products: any[] = [];
  user_id: number | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private http: HttpClient, private snackBar: MatSnackBar, private router: Router,private observer: BreakpointObserver,private quantityService : QuantityService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.productId = id;
        this.productService.getproduct(this.productId).subscribe(
          (data: any) => {
            this.product = data;
            
          },
          (error: any) => {
            this.error = error.message || 'Internal server error';
          }
        );
      } else {
        console.error('Product ID is null.');
      }
    });

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

  checkout() {
    this.router.navigate(['/checkout'])
  }

  decreaseQuantity() {
    if (this.selectedQuantity > 50) {
      this.selectedQuantity-=50;
    }
  }

  increaseQuantity() {
    // You can set a maximum limit if needed
    this.selectedQuantity+=50;
  }
  
  addToCart(productId: number, quantity: number) {
    if (this.authService.isLoggedIn()) {
      const userId = this.authService.getLoggedInUserId();
      this.http.post<any>('http://localhost:3000/add-to-cart', { userId, productId, quantity })
        .subscribe(
          (response) => {
            console.log('Product added to cart successfully:', response);
            this.snackBar.open("Added to Cart", "Close", { duration: 2500 });
            this.router.navigate(['/products'])
            this.quantityService.setSelectedQuantity(productId,quantity );
        
          },
          (error) => {
            console.error('Error adding product to cart:', error);
            this.snackBar.open("Unable to add product", "Close", { duration: 2500 })
            // Handle error, show error message, etc.
          }
        );
    } else {
      this.snackBar.open("Please login to Continue.....", "close", { duration: 9000 });
    }

  }

    buynow(productId: number, quantity: number) {
    if (this.authService.isLoggedIn()) {
      const userId = this.authService.getLoggedInUserId();
      this.http.post<any>('http://localhost:3000/add-to-cart', { userId, productId, quantity })
        .subscribe(
          (response) => {
            console.log('Product added to cart successfully:', response);
            this.snackBar.open("Added to Cart", "Close", { duration: 2500 });
            this.router.navigate(['/cart'])
            this.quantityService.setSelectedQuantity(productId,quantity);
            // Optionally, you can navigate to the cart page or show a success message here
        
          },
          (error) => {
            console.error('Error adding product to cart:', error);
            this.snackBar.open("Unable to add product", "Close", { duration: 2500 })
            // Handle error, show error message, etc.
          }
        );
    } else {
      this.snackBar.open("Please login to Continue.....", "close", { duration: 9000 });
    }

  }
}