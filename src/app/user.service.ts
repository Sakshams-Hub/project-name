import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import e from "express";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root',
})

export class UserService {
   private apiurl = 'http://localhost:3000';
    
  //    constructor(private http: HttpClient) {}

  // getUser(userId: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiurl}/users/${userId}`);
  // }
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): Observable<any> {
    // Retrieve the logged-in user's ID from the authentication service
    const user_Id = this.authService.getLoggedInUser_Id();

    // Make API call to get user details using the retrieved user ID
    return this.http.get<any>(`${this.apiurl}/users/${user_Id}`);
  }
}
