export const cartReducer=(state,action)=>{

    switch(action.type){
        case 'ADD':{
            action.payload={...action.payload,quantity:1};
            return{
                ...state,
                cart:[...state.cart,action.payload]
            }
        }
        case 'REMOVE':{
            return {
                ...state,
                cart:state.cart.filter((product)=>product.id !== action.payload),
            }
        }
        case 'INCREASE':{
            return{
                ...state,
                cart:state.cart.map((product)=> product.id === action.payload ?{...product,quantity:product.quantity+1}:product),
            }
        }
        case 'DECREASE':{
            return {
                ...state,
                cart:state.cart.map((product)=>product.id===action.payload && product.quantity > 0 ? {...product,quantity:product.quantity-1}:product),
            }
        }
        default:
          return state
    }

}