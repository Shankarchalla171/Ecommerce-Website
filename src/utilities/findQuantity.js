export const findQuantity=(cart,id)=>{
   const product =cart.find(product =>  product.id === id);

   return product ? product.quantity: 0;
}