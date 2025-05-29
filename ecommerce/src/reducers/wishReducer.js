export const WishReducer=(state,action)=>{
   switch(action.type){
        case 'ADD':{
            return{
                ...state,
                wishlist:[...state.wishlist,action.payload]
            }
        }
        case 'remove':{
            console.log('form the reducer function', typeof(action.payload));
            state.wishlist.forEach((product)=>{
                console.log(product.id === action.payload);
            })
            return {
                ...state,
                wishlist:state.wishlist.filter((product)=>product.id !== action.payload),
            }
        }
        default:
          return state
    }
}