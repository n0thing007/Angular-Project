// Import necessary modules and components
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Order } from '../../model/order.model';
import { GrocessaryService } from '../../service/grocessary.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {
  orderList: Order[] = []; // Initialize an empty array for the order list

  // Constructor for the component, injecting required services and components
  constructor(
    private gService: GrocessaryService,
    private router: Router,
    private datePipe: DatePipe // DatePipe for date formatting
  ) { 
    this.gService.isClientLoginPresent(); // Check if the client is logged in
  }

  ngOnInit(): void {
    this.getOrderList(); // Call the function to get the order list when the component is initialized
  }

  // Function to get the order list from the service
  getOrderList(): void {
    // Get the order list using the GrocessaryService and the client's authorization
    this.gService.orderList(this.gService.getClientAuthorization())
      .pipe(take(1)) // Take only one emission from the observable
      .subscribe(
        (res: any) => {
          console.log("************", res);

          if (!!res && Array.isArray(res)) {
            this.orderList = res; // Assign the retrieved order list to the class property
          }
        },
        err => {
          console.log("Error");
        }
      )
  }

  // Function to format a date and return it
  getDate(d: string | undefined): any {
    let ans: any;
    console.log("DDDDDD", d);

    if (!!d && d !== null) {
      // Format the date using DatePipe to 'shortDate' format
      ans = this.datePipe.transform(d, "shortDate") || null;
      console.log("@@@@@@@@", ans);
    }

    return ans;
  }

  // Function to navigate to the payment page for a specific order
  addPayment(order: Order): void {
    this.router.navigate([`/client/payment/${order?.orderId}/${order?.totalPrice}`])
  }
}
