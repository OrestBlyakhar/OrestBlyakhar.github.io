import {Link} from "react-router-dom";
import { AppRoutes } from "../common/AppRoutes";
import styles from "../pages/MainPage.module.scss";

export const ButtonLogin = () => {
    return (
        <Link to={AppRoutes.LOGIN}><div className={styles.btnDiv}><button className={styles.btnLogin} type="button">Login</button></div></Link>
    )
}