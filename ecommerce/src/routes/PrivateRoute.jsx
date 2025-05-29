import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const PrivateRoute=({children})=>{
    const {islogged}=useContext(AuthContext);

    return islogged?children:<Navigate to='/login'/>

}

export default PrivateRoute