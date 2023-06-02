import styles from "../MainPage/MainPage.module.scss";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../common/AppRoutes";
import {auth} from "../../firebase";
import { signOut } from "firebase/auth";
import { ButtonLogin } from "../../components/RouteHOC";

export const mockData = {
    generalInfo: {
        fullName: 'Orest Bliakhar',
        position: 'Frontend Developer',
        description: 'I`m Orest, 16 years old, I am purposeful, responsible, attentive, ready to learn new things, want to work as a Front-end developer and develop myself in this direction',
        imageUrl: 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg',
        imageName: '1',
    },
    personalInfo: {
        residence: 'Rudno, Lviv 79493',
        phoneNumber: '+380685161907',
        birthDate: '29-12-2006',
        email: 'blyakhar76@gmail.com'
    },
    languages: [
        {
            name: 'Ukrainian',
            level: 'native speaker'
        },
        {
            name: 'English',
            level: 'Intermediate'
        }
    ],
    skills: [
        'HTML5', 'CSS', 'SCSS', 'JavaScript', 'React', 'Git'
    ],
    experience: [
        'No work experience'
    ],
    education: [
        {
            years: 'September 2012 - today:',
            name: 'Lyceum №74 named after Mariyka Pidhiryanka'
        },
        {
            years: 'September 2022 - May 2023:',
            name: 'Frontend developer - Logos'
        }
    ],
    interests: [
        'Footbal', 'Computer games', 'Basketball', 'Sport'
    ],
    contacts: {
        instagram: 'Instagram: orest_blyakhar',
        github: 'https://github.com/OrestBlyakhar',
        discord: 'Discord: Невротик#3664',
        tiktok: 'https://www.tiktok.com/@xorestx'
    },
}

const UserPage = ({data, handleEdit, addInfo}) => {

    const [generalInfo, setGeneralInfo] = useState(data.generalInfo);
    const [personalInfo, setPersonalInfo]=useState(data.personalInfo);
    const [languagesFormValue,setLanguagesFormValue]=useState(data.languages);
    const [skillsFormValue,setSkillsFormValue]=useState(data.skills);
    const [experience,setExperience] = useState(data.experience);
    const [education, setEducation] = useState(data.education);
    const [interestsFormValue,setInterestsFormValue]=useState(data.interests);
    const [contactsFormValue,setContactsFormValue]=useState(data.contacts);
    
    useEffect(()=>{
        setLanguagesFormValue(data.languages)
        setSkillsFormValue(data.skills)
        setInterestsFormValue(data.interests)
        setContactsFormValue(data.contacts)
    }, [data])

    const handleInputChange = (key,value)=>{
        setGeneralInfo((prevState)=>{
                return{
                    ...prevState,
                    [key]:value
                }
            }
        )
        setPersonalInfo((prevState)=>{
                return{
                    ...prevState,
                    [key]:value
                }
            }
        )
    }

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
                        <img className={styles.img} src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg" alt="1" />
                        <h1 className={styles.firstLastName}>{data.generalInfo.fullName}</h1>
                        <h3 className={styles.profession}>{data.generalInfo.position}</h3>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Personal info</h3>
                        <div className={styles.divInfo}>
                            <p>Rudno, Lviv 79493</p>
                            <p>+380685161907</p>
                            <p>29-12-2006</p>
                            <p>blyakhar76@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Skills</h3>
                        <ul>
                            <li>HTML5</li>
                            <li>CSS</li>
                            <li>SCSS</li>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>Git</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Experience</h3>
                        <div className={styles.divInfo}>
                            <p>No work experience</p>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Languages</h3>
                        <ul>
                            <li>Ukrainian - native speaker</li>
                            <li>English - intermidiate</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Description</h2>
                        <p className={styles.description}>I'm Orest, 16 years old, I am purposeful, responsible, attentive, ready to learn new things,
                            want to work as a Front-end developer and develop myself in this direction.
                        </p>
                    </div>
                    <div>
                        <h2 className={styles.titlesRight}>Education</h2>
                        <div>
                            <ul className={styles.divInfoRight}>
                                <li>September 2012 - today:</li>
                                <li>Lyceum №74 named after Mariyka Pidhiryanka</li>
                                <li>September 2022 - May 2023:</li>
                                <li>Frontend developer - Logos</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Interests</h2>
                        <ul>
                            <li>Football</li>
                            <li>Computer games</li>
                            <li>Basketball</li>
                            <li>Sport</li>
                        </ul>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Social Networks</h2>
                        <ul>
                            <li>Instagram: orest_blyakhar</li>
                            <Link className={styles.links} to={'https://github.com/OrestBlyakhar'}><li>GitHub: OrestBlyakhar</li></Link>
                            <li>Discord: Невротик#3664</li>
                            <Link className={styles.links} to={'https://www.tiktok.com/@xorestx'}><li>Tiktok: xorestx</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserPage;