import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Product } from '../../model/product.model';
import { GrocessaryService } from '../../service/grocessary.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  productList: Array<Product> = [];
  quantity: number = 0;
  customer: any = {};
  getCategoryList: any[] = [];
  category: any = 100;//to initially allows to display all products
  allProductList : Array<Product>= [];
  offset: number = 0;
  pageSize: number = 5; // How many item you want to display in your page.
  totalItem: number = 1;

  constructor(
    private gService: GrocessaryService,
    private router: Router,
    private snakcbar: MatSnackBar
  ) {
   this.gService.isClientLoginPresent();
    this.getProductList(true);
    this.getCustomerDetail();
  }


  ngOnInit(): void {
    this.getCategoryList = this.gService.getCategoryList();
  }
//to check customer present or not if yes get details
  getCustomerDetail(): void {
    const cid = this.gService.getClientAuthorization();
    this.gService.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer*****", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }
// if all selected in drowdown give all product else give the enter category product
  getProductList(isAllProduct: boolean = false): void {
    let product: any = this.gService.getAllProducts(this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);//to start checking product from firstpage
    if (!isAllProduct) {
      product = this.gService.getProductByCategory(this.category, this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    }
    product.pipe(take(1)).subscribe((res: any) => {
      ;
      if (res && res?.product && Array.isArray(res?.product)) {
        this.productList = res?.product;
        this.allProductList = res?.product;
        this.totalItem = res?.totalProduct;
      }
    }, (err: any) => {
      console.log("Error");
    });
  }

  addToCart(product: Product): void {
    const element: any = document.getElementById(product?.productId.toString());
  let qty:any= element!==null ? element.value : 0; 
  if(qty ===""){
    element.value=0;
    qty=0;
  }
    if (qty === 0 || qty === "0") {
      alert("Qunatity should not be zero");
      return ;
    }
    if (qty > product?.quantity) {
      alert('Added quantity should not greater than available quantity');
      return;
    }
    
    const body: any = {
      quantity: qty,
      mrpPrice: product?.mrpPrice,
      prouct: product,
      customer: this.customer
    };
    console.log("add to cart", body);
    this.gService.addToCart(body, product?.productId, this.customer?.customerId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log(res);
        if (!!res && res?.cartId) {
        alert("Item added sucessfully");
          this.getProductList();
        }
      }, err => {
        console.log("Error");
      }
    )
  }

  getProductByCategory(): void {
    this.offset = 0;
    this.totalItem = 1;
    if (this.category === "100") {
      this.getProductList(true);
    } else {
      this.getProductList(false);
    }
  }

  onNextPageClick(pageOffSet: any): void {
    this.offset = pageOffSet;
    this.getProductList(this.category === 100 || this.category === "100");
  }

  onPreviousPageClick(pageOffSet: any): void {
    this.offset -= 1;
    this.getProductList(this.category === 100 || this.category === "100");
  }

  onFirstPageClick(pageOffSet: any): void {
    this.offset = 0;
    this.getProductList(this.category === 100 || this.category === "100");
  }

  onLastPageClick(pageOffSet: any): void {
    const lastPage = Math.ceil(this.totalItem / this.pageSize);
    this.offset = lastPage;
    this.getProductList(this.category === 100 || this.category === "100");
  }

}



