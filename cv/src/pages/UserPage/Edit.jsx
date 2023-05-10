import UserHOC from "./UserHOC"
import styles from "../MainPage/MainPage.module.scss"

const Edit = () => {
    return(
        <div className={styles.wrapper}>
            <UserHOC/>
        </div>
    )
}

export default Edit;