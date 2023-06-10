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
                        {data?
                            <img
                                src={data?.generalInfo?.imageUrl}
                                alt={data?.generalInfo?.imageName}
                                className={styles.img}
                            />:
                            <img className={styles.img} src={mockData.generalInfo.imageUrl} alt={mockData.generalInfo.imageName}/> &&
                            console.log("no data")
                        }
                        <h1 className={styles.firstLastName}>{data ? data.generalInfo.fullName : mockData.generalInfo.fullName}</h1>
                        <h3 className={styles.profession}>{data ? data.generalInfo.position : mockData.generalInfo.position}</h3>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Personal info</h3>
                        <div className={styles.divInfo}>
                            <p>{data ? data.personalInfo.residence : mockData.personalInfo.residence}</p>
                            <p>{data ? data.personalInfo.phoneNumber : mockData.personalInfo.phoneNumber}</p>
                            <p>{data ? data.personalInfo.birthDate : mockData.personalInfo.birthDate}</p>
                            <p>{data ? data.personalInfo.email : mockData.personalInfo.email}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Skills</h3>
                        <ul>
                            {data
                                ? data.skills.map((skill, index) => <li key={index}>{skill}</li>)
                                : mockData.skills.map((skill, index) => <li key={index}>{skill}</li>)
                            }
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Experience</h3>
                        <div className={styles.divInfo}>
                            <p>{data ? data.experience : mockData.experience}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Languages</h3>
                        <ul>
                            {data
                                ? data.languages.map((language, index) => <li key={index}>{language}</li>)
                                : mockData.languages.map((language, index) => <li key={index}>{language}</li>)
                            }
                        </ul>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Description</h2>
                        <p className={styles.description}>{data ? data.generalInfo.description : mockData.generalInfo.description}</p>
                    </div>
                    <div>
                        <h2 className={styles.titlesRight}>Education</h2>
                        <div>
                            <ul className={styles.divInfoRight}>
                                {data
                                    ? data.education.map((education, index) => <li key={index}>{education}</li>)
                                    : mockData.education.map((education, index) => <li key={index}>{education}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Interests</h2>
                        <ul>
                            {data
                                ? data.interests.map((interest, index) => <li key={index}>{interest}</li>)
                                : mockData.interests.map((interest, index) => <li key={index}>{interest}</li>)
                            }
                        </ul>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Social Networks</h2>
                        <ul>
                            {data
                                ? data.contacts.map((contact, index) => <li key={index}>{contact}</li>)
                                : mockData.contacts.map((contact, index) => <li key={index}>{contact}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainPage;