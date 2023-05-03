import {Link} from "react-router-dom";
import { AppRoutes } from "../common/AppRoutes";
import styles from "../pages/MainPage/MainPage.module.scss";
import error from "../pages/ErrorPage/ErrorPage.module.scss"

export const ButtonLogin = () => {
    return (
        <Link to={AppRoutes.LOGIN}><div className={styles.btnDiv}><button className={styles.btnLogin} type="button">Login</button></div></Link>
    )
}

export const ButtonHome =() => {
    return (
        <Link to={AppRoutes.MAIN}><button className={error.btnHome}>home</button></Link>
    )
}