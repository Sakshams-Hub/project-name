// import { Injectable } from '@angular/core';

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: string | null = null;
  private loggedInUserId: number | null = null; // Add this property

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  setLoggedInUser(username: string, user_id: number) {
    this.loggedInUser = username;
    this.loggedInUserId = user_id; // Set the logged-in user ID
  }

  getLoggedInUser(): string | null {
    return this.loggedInUser;
  }

  getLoggedInUserId(): number | null {
    return this.loggedInUserId; // Retrieve the logged-in user ID
  }

  logout() {
    this.loggedInUser = null;  
    this.loggedInUserId = null; 
  }  
}

