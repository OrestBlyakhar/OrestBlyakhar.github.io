import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "../common/AppRoutes";

const LoginHOC = ({Component}) => {
    onAuthStateChanged(auth, (currentUser)=>console.log(currentUser));
    const navigate = useNavigate()
     const handleLogin = async (formValue)=>{
        try {
            const response = await signInWithEmailAndPassword(auth, formValue.email, formValue.password );
            console.log(response);
            response?.user?.uid && navigate(AppRoutes.USER);
        }
        catch (e){

        }
    }
    return <Component handleLogin={handleLogin}/>
}

export default LoginHOC;