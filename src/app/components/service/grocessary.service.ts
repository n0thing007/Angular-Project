import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'//inject dependecies ?
})
export class GrocessaryService {
  url: string = 'http://localhost:8085';

  category: any = [{
    name: "VEGETABLES" , value: 0,
  }, {
    name: "FRUITS", value: 1,
  }, {
    name: "DAIRYPRODUCT", value: 2
  }, {
    name: "SNACKS", value:  3
  }, {
    name: "CERALS", value:  4
  }, {
    name: "FROZENFOODS", value:  5
  }
];

  constructor(
    
    private http: HttpClient,
    private router: Router

  ) { }
  

  /* Client Registeration */
  signUp(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customers/register", body);
  }
  //client login
  clientSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customers/login", body);
  }
//once we logged in that time we are storing client name
storeClientAuthorization(token: string): void {
  localStorage.setItem("token", token);
}
// Get the client's authorization token(get name for clienthomepage)
getClientAuthorization(): any {
  const token = localStorage.getItem("token");
  return token; 
}
// Store the client's name in local storage
storeClientUserName(name: string): void {
  localStorage.setItem("userName", name);
}
// Get the client's name from local storage
getClientName(): any {
  const name = localStorage.getItem("userName");
  return name;
}
// Client Logout and clear data
clientLogout(): void {
  localStorage.clear();
  this.router.navigate(['']);
}
//admin login
adminSignIn(body: any): Observable<any> {
  return this.http.post(this.url + "/api/admin/login", body);
}
// Store the admin's authorization token
storeAdminAuthorization(token: string): void {
  localStorage.setItem("admin", token);
}
// Get the admin's authorization token(take name for Adminhomepage)
getAdminAuthorization(): any {
  const token = localStorage.getItem("admin");
  return token; 
}
// Store the admin's name in local storage
storeAdminUserName(name: string): void {
  localStorage.setItem("adminName", name);
}
// Get the admin's name from local storage
getAdminName(): any {
  const name = localStorage.getItem("adminName");
  return name;
}
// Admin Logout
adminLogout(): void {
  localStorage.clear();
  this.router.navigate(['/']);
}
// Add Product
addProduct(body: any): Observable<any> {
  return this.http.post(this.url + "/api/products/add products", body);
}

getProductlist():Observable<any> {
  return this.http.get(this.url + "/api/products");
}

deleteProduct(id :any):Observable<any> {
  //return this.http.delete(this.url + "/api/products/" +id);
  //secondway
  return this.http.delete(`${this.url}/api/products/${id}`);
}

getProductById(id:any):Observable<any> {
  return this.http.get(this.url + "/api/products/products/"+id);
}

editProduct(body: any,id:any): Observable<any> {
  return this.http.put(this.url + "/api/products/"+id, body);
}

addToCart(body: any,pid:any,cid:any):Observable<any>{
  return this.http.post(this.url+"/api/cart/"+cid+"/"+pid,body);
}

getCustomerById(id:any):Observable<any> {
  return this.http.get(this.url + "/api/customers/customer/"+id);
}

cartList():Observable<any>{
  return this.http.get(this.url+"/api/cart/list");
}
placeOrder(cid:any,cartid:any,body:any):Observable<any> {
  return this.http.post(this.url + "/api/orders/"+cid+"/"+cartid, body);
}
deleteCart(id :any):Observable<any> {
  
  return this.http.delete(`${this.url}/api/cart/${id}`);
}

orderList(id:any):Observable<any>{
  return this.http.get(this.url+"/api/orders/"+id);
}

getCategoryList(): any {
  return this.category;
}
addPayment(body:any,orderid:any,cid:any):Observable<any> {
  return this.http.post(this.url + "/api/payements/"+orderid+"/"+cid, body);
}

isClientLoginPresent(): void {
  if (this.getClientAuthorization() === null) {
    this.router.navigate(['/client-login']);
  }
}

isAdminLoginPresent(): void {
  if (this.getAdminAuthorization() === null) {
    this.router.navigate(['/admin-login']);
  }
}

forgotPassword(body: any):Observable<any> {
  return this.http.post(this.url + "/api/customers/forgotpassword", body);
}

updateCustomerInformation(body: any):Observable<any> {
  return this.http.put(this.url + "/api/customers/customer/"+body?.customerId, body);
}

changePassword(cid: any,password:any):Observable<any> {
  return this.http.post(this.url + "/api/customers/"+cid+"/"+password,{});
}

getProductByCategory(cid: any, offset: any, limit: any):Observable<any>{
  return this.http.get(this.url+"/api/products/" + cid + "/"+ offset + "/" + limit);
}

getAllProducts(offset: any, limit: any):Observable<any>{
  return this.http.get(this.url+"/api/products/" + offset + "/" + limit);
}

}
