// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { take } from 'rxjs';
// import { GrocessaryService } from '../../service/grocessary.service';


// @Component({
//   selector: 'app-admin-login-page',
//   templateUrl: './admin-login-page.component.html',
//   styleUrls: ['./admin-login-page.component.css']
// })
// export class AdminLoginPageComponent implements OnInit {

//   email: string = "";
//   password: string = "";
//   adminLoginForm= new FormGroup({});

//   constructor(
//     private router:Router,
//     private gservice:GrocessaryService,
//     private fb:FormBuilder
//   ) { {
//     const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
//     this.adminLoginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.pattern(pattern)]],
//       password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
//     });

//   }}

//   ngOnInit(): void {
//   }
//   signIn(): void {
//     //alert("sucess")
//     const body = {
//       "adminEmailId": this.email,
//       "adminPassword": this.password
//     }
    
//     this.gservice.adminSignIn(body).pipe(take(1)).subscribe((res :any) => {
//       console.log("*****",res);
//       if(res && res?.adminId){
//         let userName = '';
//         if (res?.firstName) {
//           userName+=res?.firstName;
//         }
//         if (res?.lastName){
//           userName+=' ' + res?.lastName;
//         }
//         this.gservice.storeAdminUserName(userName);
//         this.gservice.storeAdminAuthorization(res?.adminId);
//         this.router.navigate(['/admin/home']);
       
//       }
//     }, err =>{
//       console.log("Error  ",err);
//       alert("Something going wrong in login!!pl try again");
//     })
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { GrocessaryService } from '../../service/grocessary.service';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})
export class AdminLoginPageComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(
    private router:Router,
    private gservice:GrocessaryService
  ) { }

  ngOnInit(): void {
  }
  signIn(): void {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
    if (!pattern.test(this.email)) {
      alert("Email is not valid.");
      return;
    }
    if (this.password === '') {
      alert("Password should not be blank");
      return;
    }
    //alert("sucess")
    const body = {
      "adminEmailId": this.email,
      "adminPassword": this.password
    }
    
    this.gservice.adminSignIn(body).pipe(take(1)).subscribe((res :any) => {
      console.log("***",res);
      if(res && res?.adminId){
        let userName = '';
        if (res?.firstName) {
          userName+=res?.firstName;
        }
        if (res?.lastName){
          userName+=' ' + res?.lastName;
        }
        this.gservice.storeAdminUserName(userName);
        this.gservice.storeAdminAuthorization(res?.adminId);
        this.router.navigate(['/admin/home']);
       
      }
    }, err =>{
      console.log("Error  ",err);
      alert("Something going wrong in login!!pl try again");
    })
  }


}