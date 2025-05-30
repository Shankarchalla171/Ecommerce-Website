export const PriceFinder=(cart)=>{
    return cart.reduce((acc,cur)=>acc+=(cur.price*cur.quantity),0);
}