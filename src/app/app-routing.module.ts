import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AdminAddgrocessaryComponent } from './components/admin/admin-addgrocessary/admin-addgrocessary.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginPageComponent } from './components/admin/admin-login-page/admin-login-page.component';
import { GrocessaryListComponent } from './components/admin/grocessary-list/grocessary-list.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ClientCartComponent } from './components/client/client-cart/client-cart.component';
import { ClientHomeComponent } from './components/client/client-home/client-home.component';
import { ClientLoginPageComponent } from './components/client/client-login-page/client-login-page.component';
import { ClientOrderComponent } from './components/client/client-order/client-order.component';
import { ClientPaymentComponent } from './components/client/client-payment/client-payment.component';
import { ClientSignUpComponent } from './components/client/client-sign-up/client-sign-up.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'contact-us',component:ContactusComponent},
  {path:'about-us',component:AboutusComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path:'client-register',component: ClientSignUpComponent},
  {path:'client-login',component:ClientLoginPageComponent},
  {path:'admin-login',component:AdminLoginPageComponent},
  {path:'client',children:[
    {path:'home',component:ClientHomeComponent},
    {path:'cart',component:ClientCartComponent},
    {path:'order',component:ClientOrderComponent},
    {path:'payment/:orderId/:totalPrice',component:ClientPaymentComponent}
  ]},
  {path:'admin',children:[
    {path:'home',component:AdminHomeComponent},
    {path: 'addproduct', component:AdminAddgrocessaryComponent },
    {path:'listproduct',component:GrocessaryListComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
