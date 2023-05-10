import { useState } from "react";
import UserPage from "./UserPage";
import styles from "../MainPage/MainPage.module.scss"
import MainPage from "../MainPage/MainPage"

const UserHOC = () => {

    const [isEditMode, setIsEditMode] = useState(false)

    return (
        <div>
                <button className={styles.btnEdit} onClick={()=> setIsEditMode((prevState) => !prevState)}>{ isEditMode ? 'Save' : 'Edit'}</button>
            {isEditMode ? <UserPage/> : <MainPage/>}
        </div>
    )
}

export default UserHOC