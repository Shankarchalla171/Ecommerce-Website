export const findProduct=(cart,id)=>{
    // console.log(cart);
   return cart.some(product => {
    //   console.log(product);
    //   console.log(product.id);
    //   console.log(id);
    return product.id === id
});
}

