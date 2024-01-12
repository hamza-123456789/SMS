import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm !:FormGroup;
jwttoken:any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiserviceService,
              private route:Router ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const loginData = this.loginForm.value;
    this.apiService.postData('/api/Auth/UserLogin', loginData)
      .subscribe(
        (apiresponse) => {
          debugger
          if(apiresponse.response =="Successfully Login"){
             this.jwttoken=apiresponse.token
             localStorage.setItem('authToken', this.jwttoken);
             this.route.navigate(['/dashboard']);
             console.log('/AuthController/UserLogin', apiresponse);
          }
        },);
  }
  Signup(){
    this.route.navigateByUrl('/signup');

  }
}
