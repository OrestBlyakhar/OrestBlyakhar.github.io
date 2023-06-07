import { useState, useEffect } from "react";
import UserPage from "./UserPage";
import styles from "../MainPage/MainPage.module.scss"
import MainPage from "../MainPage/MainPage"
import {collection, addDoc, onSnapshot, doc, setDoc} from 'firebase/firestore'
import {db, storage} from "../../firebase";
import { mockData } from "./UserPage";
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from "firebase/storage";

const UserHOC = () => {
    const [isEditMode,setIsEditMode] = useState(false);
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const [data, setData] = useState();
    const [isLoading,setIsLoading]=useState(true);
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);
    const [previousImageName, setPreviousImageName] = useState('');
    const [newImage, setNewImage] = useState('');
    useEffect(()=>{
        getInfo();
    },[])
    useEffect(()=> {
        data && setIsLoading(false);
    },[data])
    const addInfo = async ()=>{
        const collectionRef = collection(db, authUser?.uid);
        try {
            const docRef = await addDoc(collectionRef, mockData);
            docRef?.id && alert('YES!!!');
        }catch (e){

        }

    }
    const getInfo = ()=>{
        const collectionRef = collection(db, authUser?.uid);
        onSnapshot(collectionRef, (snapshot)=>{
           const data = snapshot.docs.map((doc)=>({...doc.data(),id:doc.id}));
           setData(data[0]);
        })
    }
    const updateInfo = async (generalInfo,personalInfo,languages,skills,experience,education,interests,contacts)=>{
        const docRef = doc(db,authUser?.uid, data?.id);
        await setDoc(docRef, {
            ...data,
            generalInfo:{
                ...generalInfo,
                ...newImage
            },
            personalInfo,
            languages,
            skills,
            experience,
            education,
            interests,
            contacts
        })
    }
    const deleteImageFromStorage = (imageName = previousImageName) => {
        console.log(imageName)
        const storageRef = ref(storage, `/${authUser?.uid}/${imageName}`)
        deleteObject(storageRef)
            .then(() => {
                setPreviousImageName('')
                setNewImage({})
            })
            .catch((e) => console.log("File delete Error"))
    }
    const handleFileUpload = async (file)=>{
        setUploading(true);
        const storageRef = ref(storage, `/${authUser?.uid}/${file.name}`)
        const uploadData = uploadBytesResumable(storageRef, file)

        uploadData.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            (error) => {
                setUploading(false);
                setFileInfo('')
            },
            () => {
                getDownloadURL(uploadData.snapshot.ref)
                    .then(url => {
                        setUploading(false);
                        setPreviousImageName(data?.generalInfo?.imageName)
                        setNewImage({
                            imageUrl: url,
                            imageName: file.name,
                        })
                    })
            }
        )
    }

    return (
        <div>
            <button className={styles.btnEdit} onClick={()=> setIsEditMode((prevState) => !prevState)}>{ isEditMode ? 'Save' : 'Edit'}</button>
            {isEditMode&&data?
                <UserPage addInfo={addInfo} data={data} handleGIEEdit={updateInfo} setFileInfo={setFileInfo} fileInfo={fileInfo} handleFileUpload={handleFileUpload} uploading={uploading}/>
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