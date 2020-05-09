import { Component } from '@angular/core';
import { Router, RouterModule, Routes  } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { UpdateProfileComponent } from "./update-profile/update-profile.component"
import { UserServiceService } from './services/user-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  
  constructor(private router: Router,
    private dialog: MatDialog,
    private userService: UserServiceService
  ){

    
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigateByUrl("");
  }

  change_password(){
    this.dialog.open(UpdateProfileComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
