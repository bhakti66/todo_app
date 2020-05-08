import { Component, OnInit, Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, RouterModule, Routes  } from "@angular/router";
import { HttpServiceService } from '../services/http-service.service'

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpServiceService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    var payload = this.loginForm.value
    this.http.post('user/login',payload).subscribe((result)=>{
      if(result['status']==200)
      { 
        localStorage.setItem('user',JSON.stringify(result['data'][0]))
        this.router.navigateByUrl("todolist");
      }
      else{
        alert('User does not exist')
      }
    },(err)=>{
      alert("Login Failed!")
      console.log(err)
    });
    
  }
}
