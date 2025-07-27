export const authReducer=(state,action)=>{
    switch(action.type){
        case 'EMAIL':{
            return{
                ...state,
                email:action.payload,
            }
        }
        case 'PASSWORD':{
            return{
                ...state,
                password:action.payload,
            }
        }
        case 'NAME':{
            return{
                ...state,
                name:action.payload,
            }
        }
        case 'PHOTO':{
            return {
                ...state,
                photo:action.payload,
            }
        }
        case 'LOGIN_SUCCESS':{

            return{
              ...state,
              islogged:true,
              token:action.payload,
            }
        }
        case 'LOGOUT':{
            return{
                ...state,
                islogged:false,
                name:'',
                email:'',
                password:"",
                photo:'',
                token:{}
            }
        }
        default:
           return state
    }
}