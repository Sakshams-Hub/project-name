import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.gaurd';
import { RegistrationComponent } from './registration/registration.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SuccessfullComponent } from './successfull/successfull.component';

const routes: Routes = [
  {path: 'cart',component:CartComponent,},
  { path: 'products', component: ProductsComponent, },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, },
  {path:'register',component:RegistrationComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "productDetails/:id", component: ProductDetailsComponent },
  { path: "checkout", component: CheckoutComponent },//,canActivate:[AuthGuard]},  
  { path: "contactus", component: ContactUsComponent },
  { path: "aboutus", component: AboutUsComponent },
  {path:'success',component:SuccessfullComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
