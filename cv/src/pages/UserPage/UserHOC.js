import { useState, useEffect } from "react";
import UserPage from "./UserPage";
import styles from "../MainPage/MainPage.module.scss"
import MainPage from "../MainPage/MainPage"
import {collection, addDoc, onSnapshot, doc, setDoc} from 'firebase/firestore'
import {db} from "../../firebase";
import {useSelector} from "react-redux";

const UserHOC = () => {
    const [isEditMode,setIsEditMode] = useState(false);
    const authUser = JSON.parse(localStorage.getItem('user'));
    const mockData = useSelector((state)=>state.user);
    const [data, setData] = useState();
    const [isLoading,setIsLoading]=useState(true);
    const collectionRef = collection(db, authUser?.uid);
    useEffect(()=>{
        getInfo();
    },[])
    useEffect(()=> {
        data && setIsLoading(false);
    },[data])
    const addInfo = async ()=>{
        try {
            const docRef = await addDoc(collectionRef, mockData);
            docRef?.id && alert('YES!!!');
        }catch (e){

        }

    }
    const getInfo = ()=>{
        onSnapshot(collectionRef, (snapshot)=>{
           const data = snapshot.docs.map((doc)=>({...doc.data(),id:doc.id}));
           setData(data[0]);
        })
    }
    const updateInfo = async (generalInfo,personalInfo,languages,skills,experience,education,interests,contacts)=>{
        const docRef = doc(db,authUser?.uid, data?.id);
        await setDoc(docRef, {
            ...data,
            generalInfo,
            personalInfo,
            languages,
            skills,
            experience,
            education,
            interests,
            contacts
        })
    }

    return (
        <div>
            <button className={styles.btnEdit} onClick={()=> setIsEditMode((prevState) => !prevState)}>{ isEditMode ? 'Save' : 'Edit'}</button>
            {isEditMode&&data?
                <UserPage addInfo={addInfo} data={data} handleEdit={updateInfo}/>
                :isLoading?
                    <h1>Loading</h1>
                    :data?
                    <MainPage data={data}/>
                        : <h1>No data</h1>
            }
        </div>
    )
}

export default UserHOC