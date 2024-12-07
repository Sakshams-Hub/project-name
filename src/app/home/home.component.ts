import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.gaurd';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  username: string | null = '';
  products:any[]=[]
  

  constructor(private authService: AuthService, private router: Router, private authGuard: AuthGuard, private snackBar: MatSnackBar,private http : HttpClient) { }

  ngOnInit() {
    this.fetchproduct();
    this.username = this.authService.getLoggedInUser();
  }
  
  fetchproduct() {
    this.http.get<any[]>('http://localhost:3000/getproducts').subscribe((products: any[]) => {
      this.products = products; 
    },(error: any) => {
      console.log(error);
    })
  }

}