import styles from "../MainPage/MainPage.module.scss";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../common/AppRoutes";
import {auth} from "../../firebase";
import { signOut } from "firebase/auth";
import { ButtonLogin } from "../../components/RouteHOC";
import { ULInputs } from "../../components/ULInputs";

export const mockData = {
    generalInfo: {
        fullName: 'BLIAKHAR OREST',
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
        'Ukrainian - native speaker', 'English - Intermediate'
    ],
    skills: [
        'HTML5', 'CSS', 'SCSS', 'JavaScript', 'React', 'Git'
    ],
    experience: [
        'No work experience'
    ],
    education: [
        'September 2012 - today:', 'Lyceum №74 named after Mariyka Pidhiryanka', 'September 2022 - May 2023:', 'Frontend developer - Logos'
    ],
    interests: [
        'Football', 'Computer games', 'Basketball', 'Sport'
    ],
    contacts: [
        'Instagram: orest_blyakhar', 'GitHub: https://github.com/OrestBlyakhar', 'Discord: Невротик#3664', 'TikTok: https://www.tiktok.com/@xorestx'
    ],
}

const UserPage = ({data, handleEdit, addInfo}) => {

    const [generalInfo, setGeneralInfo] = useState(data.generalInfo);
    const [personalInfo, setPersonalInfo]=useState(data.personalInfo);
    const [languagesFormValue,setLanguagesFormValue]=useState(data.languages);
    const [skillsFormValue,setSkillsFormValue]=useState(data.skills);
    const [experience,setExperience] = useState(data.experience);
    const [educationFormValue, setEducationFormValue] = useState(data.education);
    const [interestsFormValue,setInterestsFormValue]=useState(data.interests);
    const [contactsFormValue,setContactsFormValue]=useState(data.contacts);
    
    useEffect(()=>{
        setLanguagesFormValue(data.languages)
        setSkillsFormValue(data.skills)
        setEducationFormValue(data.education)
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
                        <img src={data.generalInfo.imageUrl} alt={data.generalInfo.imageName} className={styles.img}/>
                        <h1 className={styles.firstLastName}>{data.generalInfo.fullName}</h1>
                        <input className={styles.input} type="text" placeholder="FullName" onChange={(e)=>handleInputChange('fullName', e.target.value)}/>
                        <h3 className={styles.profession}>{data.generalInfo.position}</h3>
                        <input className={styles.input} type="text" placeholder="Profession" onChange={(e)=>handleInputChange('position', e.target.value)}/>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Personal info</h3>
                        <div className={styles.divInfo}>
                            <p>{data.personalInfo.residence}</p>
                            <input className={styles.input} type="text" placeholder="Residence" onChange={(e)=>handleInputChange('residence', e.target.value)}/>
                            <p>{data.personalInfo.phoneNumber}</p>
                            <input className={styles.input} type="text" placeholder="Phone number" onChange={(e)=>handleInputChange('phoneNumber', e.target.value)}/>
                            <p>{data.personalInfo.birthDate}</p>
                            <input className={styles.input} type="text" placeholder="Date of birth" onChange={(e)=>handleInputChange('birthDate', e.target.value)}/>
                            <p>{data.personalInfo.email}</p>
                            <input className={styles.input} type="text" placeholder="Email" onChange={(e)=>handleInputChange('email', e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Skills</h3>
                        <ul>
                            {skillsFormValue.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                        <ULInputs formValue={skillsFormValue} setFormValue={setSkillsFormValue} placeholder="New Skill"/>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Experience</h3>
                        <div className={styles.divInfo}>
                            <p>{data.experience}</p>
                            <input className={styles.input} type="text" placeholder="Experience" onChange={(e)=>handleInputChange('experience', e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Languages</h3>
                        <ul>
                            {languagesFormValue.map((language, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                        <ULInputs formValue={languagesFormValue} setFormValue={setLanguagesFormValue} placeholder="New language"/>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Description</h2>
                        <p className={styles.description}>{data.generalInfo.description}</p>
                        <input className={styles.input} type="text" placeholder="Description" onChange={(e)=>handleInputChange('description', e.target.value)}/>
                    </div>
                    <div>
                        <h2 className={styles.titlesRight}>Education</h2>
                        <div>
                            <ul className={styles.divInfoRight}>
                                {educationFormValue.map((education, index) => (
                                    <li key={index}>{education}</li>
                                ))}
                            </ul>
                            <ULInputs formValue={educationFormValue} setFormValue={setEducationFormValue} placeholder="New education"/>
                        </div>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Interests</h2>
                        <ul>
                        {interestsFormValue.map((interest, index) => (
                                    <li key={index}>{interest}</li>
                                ))}
                        </ul>
                        <ULInputs formValue={interestsFormValue} setFormValue={setInterestsFormValue} placeholder="New interest"/>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Social Networks</h2>
                        <ul>
                            {contactsFormValue.map((contact, index) => (
                                <li key={index}>{contact}</li>
                            ))}
                        </ul>
                        <ULInputs formValue={contactsFormValue} setFormValue={setContactsFormValue} placeholder="New contact"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserPage;