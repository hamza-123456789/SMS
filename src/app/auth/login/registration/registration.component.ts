import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  SignupForm !:FormGroup;
  constructor(private formBuilder: FormBuilder, private apiservice:ApiserviceService,private route:Router
     ) {}

     ngOnInit() {
      this.SignupForm = this.formBuilder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
    onSubmit(){
      debugger
      const signupData = this.SignupForm.value;
      this.apiservice.postData('/api/Auth/UserRegistration', signupData)
      .subscribe(
        (apiresponse) => {
          debugger
          if(apiresponse.response =="Successfully Register"){
            this.route.navigate(['/login']);
             console.log('/AuthController/UserRegistration', apiresponse);
          }
        },);
    }

}
