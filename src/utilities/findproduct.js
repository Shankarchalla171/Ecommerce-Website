export const findProduct=(cart,id)=>{
   return cart.some(product => {
  
    return product.id === id
});
}

