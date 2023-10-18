// Import necessary modules and components
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { GrocessaryService } from '../../service/grocessary.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.css']
})
export class ClientPaymentComponent implements OnInit {
  // Define component properties
  totalPrice: string = '';
  orderId: number = 0;
  customer: any = {};
  nameOnCard: string = '';
  cardNumber: string = '';
  expYear: string = '';
  cvv: string = '';
  PaidDate: string = '';
  paidAmount: string = '';
  
  constructor(
    private activateRoute: ActivatedRoute,
    private gService: GrocessaryService,
    private datePipe: DatePipe,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.gService.isClientLoginPresent(); // Check if the client is logged in

    // Subscribe to route parameters to get orderId and totalPrice
    this.activateRoute.params.subscribe((res: any) => {
      this.orderId = res?.orderId;
      this.totalPrice = res?.totalPrice;
    });
  }

  ngOnInit(): void {
    this.getCustomerDetail(); // Call function to get customer details
  }

  // Function to set the PaidDate when a date is selected
  setPaidDate(ev: any): void {
    const date: any = this.datePipe.transform(ev?.value, 'yyyy-MM-dd');
    this.PaidDate = date;
  }

  // Function to get customer details using the GrocessaryService
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

  // Function to handle the payment process
  onPayment(): void {
    this.paidAmount = this.totalPrice;

    // Validation checks for payment details
    if (this.nameOnCard.length === 0) {
      this.openSnackBar("Name on card should not be blank");
      return;
    }
    if (this.cardNumber === '' || this.cardNumber.length !== 16) {
      this.openSnackBar("Card number must be exactly 16 digits");
      return;
    }
    if (this.expYear.length === 0) {
      this.openSnackBar("Exp year should not be blank");
      return;
    }
    if (this.cvv.length === 0) {
      this.openSnackBar("CVV should not be blank");
      return;
    }

    // Set the PaidDate to the current date
    this.setPaidDate(new Date());

    // Create a payment data object
    const body: any = {
      totalPrice: parseInt(this.totalPrice),
      orderId: this.orderId,
      nameOnCard: this.nameOnCard,
      cardNumber: this.cardNumber,
      expYear: this.expYear,
      cvv: parseInt(this.cvv),
      PaidDate: this.PaidDate,
      paidAmount: parseInt(this.paidAmount),
      customer: this.customer
    };

    // Make a payment request using the GrocessaryService
    this.gService.addPayment(body, this.orderId, this.customer?.customerId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("*********", res);
        if (res && res?.paymentId) {
          this.openSnackBar("Payment done successfully");
          this.router.navigate(["/client/order"]);
        } else {
          this.openSnackBar("Bank details do not match. Payment not successful.");
        }
      }, err => {
        this.openSnackBar("Bank details do not match. Payment not successful.");
      }
    );
  }

  // Function to display a snack bar message
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
    });
  }
}
