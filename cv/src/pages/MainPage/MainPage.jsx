import styles from "./MainPage.module.scss"
import { ButtonLogin } from "../../components/RouteHOC";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../common/AppRoutes";
import {auth} from "../../firebase";
import { signOut } from "firebase/auth";
import { mockData } from "../UserPage/UserPage";

const MainPage = ({data}) => {
    const navigate = useNavigate()
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('authUser')
            navigate(AppRoutes.MAIN)
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <ButtonLogin/>
                <button className={styles.btnLogOut} onClick={handleSignOut}>Log out</button>
            </div>
            <div className={styles.main}>
                <div className={styles.leftSide}>
                    <div>
                        <img src={mockData.generalInfo.imageUrl} alt={mockData.generalInfo.imageName} className={styles.img}/>
                        <h1 className={styles.firstLastName}>{mockData.generalInfo.fullName}</h1>
                        <h3 className={styles.profession}>{mockData.generalInfo.position}</h3>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Personal info</h3>
                        <div className={styles.divInfo}>
                            <p>{mockData.personalInfo.residence}</p>
                            <p>{mockData.personalInfo.phoneNumber}</p>
                            <p>{mockData.personalInfo.birthDate}</p>
                            <p>{mockData.personalInfo.email}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Skills</h3>
                        <ul>
                            {mockData.skills.map((skill, index) => <li key={index}>{skill}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Experience</h3>
                        <div className={styles.divInfo}>
                            <p>{mockData.experience}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Languages</h3>
                        <ul>
                            {mockData.languages.map((languages, index) => <li key={index}>{languages}</li>)}
                        </ul>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Description</h2>
                        <p className={styles.description}>{mockData.generalInfo.description}</p>
                    </div>
                    <div>
                        <h2 className={styles.titlesRight}>Education</h2>
                        <div>
                            <ul className={styles.divInfoRight}>
                            {mockData.education.map((education, index) => <li key={index}>{education}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Interests</h2>
                        <ul>
                        {mockData.interests.map((interest, index) => <li key={index}>{interest}</li>)}
                        </ul>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Social Networks</h2>
                        <ul>
                            {mockData.contacts.map((contact, index) => <li key={index}>{contact}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainPage;