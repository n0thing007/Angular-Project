import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { GrocessaryService } from '../../service/grocessary.service';

@Component({
  selector: 'app-client-login-page',
  templateUrl: './client-login-page.component.html',
  styleUrls: ['./client-login-page.component.css']
})
export class ClientLoginPageComponent implements OnInit {

  email: string = "";
  password: string = "";
  clientLoginForm = new FormGroup({});

  constructor(
    private router: Router,
    private gservice:GrocessaryService,
    private fb: FormBuilder

  ) {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // pattern for email and pass
    //required is already mention in .ts
    this.clientLoginForm = this.fb.group({//to create new formgroup 
      email: ['', [Validators.required, Validators.pattern(pattern)]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  ngOnInit(): void {
  }

  
  signIn(): void {
    //retrives values of email and pass
    const body = {
      "emailID": this.clientLoginForm.controls['email'].value,
      "password": this.clientLoginForm.controls['password'].value
    }
    console.log("=======>",body);//for debugging in cosole
    this.gservice.clientSignIn(body).pipe(take(1)).subscribe((res :any) => {//Authentication status will be taken if its true 
      console.log("*****",res);
      if(res && res?.customerId){
       
        this.gservice.storeClientAuthorization(res?.customerId);
        let userName = '';
        if (res?.firstName) {
          userName+=res?.firstName;
        }
        if (res?.lastName){
          userName+=' ' + res?.lastName;
        }
        this.gservice.storeClientUserName(userName);// for the purpose of client home page to show his/her name
        this.router.navigate(['/client/home']);
       
      }
    }, err =>{// if no data found
      console.log("Error  ",err);
      alert("Something going wrong in login!!pl try again");
    })

  }

  routeToNewUser(): void {
    this.router.navigate(["/client-register"]);
  }

  routeToForgotPassword(): void {
    this.router.navigate(["/forgot-password"]);
  }
}