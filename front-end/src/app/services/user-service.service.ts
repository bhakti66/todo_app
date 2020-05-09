import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor() { }

  checkLoggedIn(){
    if(JSON.parse(localStorage.getItem("user"))){
      return true
    }
    return false
  }
}
