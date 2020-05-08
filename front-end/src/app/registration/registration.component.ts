import { Component, OnInit, Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, RouterModule, Routes  } from "@angular/router";
import { HttpServiceService } from '../services/http-service.service'

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpServiceService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  register() {
    var payload = this.loginForm.value
    this.http.post('user/register',payload).subscribe((result)=>{
      this.router.navigateByUrl("login");
    },(err)=>{
      alert("Registration Failed!")
      console.log(err)
    });
    
  }
}
