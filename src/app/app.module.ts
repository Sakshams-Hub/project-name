import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.gaurd';
import { AuthService } from './auth.service';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavbarComponent } from './navbar/navbar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MatMenuModule } from "@angular/material/menu";
import { CheckoutComponent } from './checkout/checkout.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgImageSliderModule } from 'ng-image-slider';
import{ MatSelectModule } from "@angular/material/select";
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SuccessfullComponent } from './successfull/successfull.component'



@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        HomeComponent,
        ProductsComponent,
        CartComponent,
        NavbarComponent,
        ProductDetailsComponent,
        CheckoutComponent,
        ContactUsComponent,
        AboutUsComponent,
        SuccessfullComponent,
     
       
       
    ],
    providers: [
        provideClientHydration(), AuthGuard, AuthService, provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatFormFieldModule,
        NgImageSliderModule,
        MatSelectModule
        
        
    ]
})
export class AppModule { }
