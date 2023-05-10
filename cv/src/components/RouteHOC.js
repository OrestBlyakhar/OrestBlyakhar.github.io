import {Link, Navigate} from "react-router-dom";
import { AppRoutes } from "../common/AppRoutes";
import styles from "../pages/MainPage/MainPage.module.scss";
import error from "../pages/ErrorPage/ErrorPage.module.scss"

export const PublicRouteForHOC = ({HOC, Component}) => {
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    console.log(authUser);
    return authUser?.uid
    ? <Navigate to={`/user/${authUser?.uid}`}/>
    : <HOC Component={Component}/>
}

export const PrivateRouteForHOC = ({HOC, Component}) => {
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    console.log(authUser);
    return authUser?.uid
    ? <HOC Component={Component}/>
    : <Navigate to={AppRoutes.LOGIN}/>
}

export const ButtonLogin = () => {
    return <Link to={AppRoutes.LOGIN}><button className={styles.btnLogin} type="button">Login</button></Link>
}

export const ButtonHome = () => {
    return <Link to={AppRoutes.MAIN}><button className={error.btnHome}>home</button></Link>
}