export interface Order{
    mrpPrice : number;
    orderId : number;
    orderStatus:string;
    orderedDate:string;
    paymentStatus:string;
    quantity : number;
    totalPrice: number;	
    productname: string;
    image: string;
}