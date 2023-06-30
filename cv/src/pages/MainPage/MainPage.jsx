import styles from "./MainPage.module.scss";
import { ButtonLogin } from "../../components/RouteHOC";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../common/AppRoutes";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { mockData } from "../UserPage/UserPage";
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

const MainPage = ({data}) => {
    const [fbData, setFbData] = useState(data);

    const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('authUser');
      navigate(AppRoutes.MAIN);
    } catch (e) {
      console.log(e);
    }
  };

    const getInfo = ()=>{
        const collectionRef = collection(db, 'SYkip6VofoQYOjFOLkCl2XAB0602');
        onSnapshot(collectionRef, (snapshot)=>{
            const data = snapshot.docs.map((doc)=>({...doc.data(),id:doc.id}));
          console.log(data);
            setFbData(data[0]);
        })
    }


  useEffect(() => {
    !fbData && getInfo()
  }, [fbData]);
  return (
    <div className={styles.wrapper}>
      { fbData && <>
        <div className={styles.header}>
        <ButtonLogin/>
        <button className={styles.btnLogOut} onClick={handleSignOut}>Log out</button>
      </div>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div>
            {data ?
              <img
                src={data?.generalInfo?.imageUrl}
                alt={data?.generalInfo?.imageName}
                className={styles.img}
              /> :
              <img className={styles.img}
                   src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                   alt="male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"/>
            }
            <h1 className={styles.firstLastName}>{data ? data.generalInfo.fullName : fbData.generalInfo.fullName}</h1>
            <h3 className={styles.profession}>{data ? data.generalInfo.position : fbData.generalInfo.position}</h3>
          </div>
          <div>
            <h3 className={styles.titles}>Personal info</h3>
            <div className={styles.divInfo}>
              <p>{data ? data.personalInfo.residence : fbData.personalInfo.residence}</p>
              <p>{data ? data.personalInfo.phoneNumber : fbData.personalInfo.phoneNumber}</p>
              <p>{data ? data.personalInfo.birthDate : fbData.personalInfo.birthDate}</p>
              <p>{data ? data.personalInfo.email : fbData.personalInfo.email}</p>
            </div>
          </div>
          <div>
            <h3 className={styles.titles}>Skills</h3>
            <ul>
              {data
                ? data.skills.map((skill, index) => <li key={index}>{skill}</li>)
                : fbData.skills.map((skill, index) => <li key={index}>{skill}</li>)
              }
            </ul>
          </div>
          <div>
            <h3 className={styles.titles}>Experience</h3>
            <div className={styles.divInfo}>
              <p>{data ? data.experience : fbData.experience}</p>
            </div>
          </div>
          <div>
            <h3 className={styles.titles}>Languages</h3>
            <ul>
              {data
                ? data.languages.map((language, index) => <li key={index}>{language}</li>)
                : fbData.languages.map((language, index) => <li key={index}>{language}</li>)
              }
            </ul>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.divInfoRight}>
            <h2 className={styles.titlesRight}>Description</h2>
            <p
              className={styles.description}>{data ? data.generalInfo.description : fbData.generalInfo.description}</p>
          </div>
          <div>
            <h2 className={styles.titlesRight}>Education</h2>
            <div>
              <ul className={styles.divInfoRight}>
                {data
                  ? data.education.map((education, index) => <li key={index}>{education}</li>)
                  : fbData.education.map((education, index) => <li key={index}>{education}</li>)
                }
              </ul>
            </div>
          </div>
          <div className={styles.divInfoRight}>
            <h2 className={styles.titlesRight}>Interests</h2>
            <ul>
              {data
                ? data.interests.map((interest, index) => <li key={index}>{interest}</li>)
                : fbData.interests.map((interest, index) => <li key={index}>{interest}</li>)
              }
            </ul>
          </div>
          <div className={styles.divInfoRight}>
            <h2 className={styles.titlesRight}>Social Networks</h2>
            <ul>
              {data
                ? data.contacts.map((contact, index) => <li key={index}>{contact}</li>)
                : fbData.contacts.map((contact, index) => <li key={index}>{contact}</li>)
              }
            </ul>
          </div>
        </div>
      </div>\
      </>}
    </div>
  );
};
export default MainPage;
