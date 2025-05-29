export const cartReducer=(state,action)=>{

    switch(action.type){
        case 'ADD':{
            return{
                ...state,
                cart:[...state.cart,action.payload]
            }
        }
        case 'remove':{
            return {
                ...state,
                cart:state.cart.filter((product)=>product.id !== action.payload),
            }
        }
        default:
          return state
    }

}