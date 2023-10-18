import { Product } from "./product.model";

export interface Cart{
    cartId : number;
    mrpPrice : number;
    quantity : number;
    customer : any;
    product: Product
}