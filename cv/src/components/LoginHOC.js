import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

const LoginHOC = ({Component}) => {
    onAuthStateChanged(auth, (currentUser)=>console.log(currentUser));
    const navigate = useNavigate()
    const handleLogin = async (formValue)=>{
        try {
            const response = await signInWithEmailAndPassword(auth, formValue.email, formValue.password );
            if(response?.user?.uid) {
                localStorage.setItem('authUser', JSON.stringify(response.user))
                navigate(`/user/${response?.user?.uid}`)
            }
        }
        catch (e){

        }
    }
    return <Component handleLogin={handleLogin}/>
}

export default LoginHOC