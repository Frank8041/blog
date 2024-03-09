import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [ imageFile, setImageFile ] = useState(null);
    const [ imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [ imageFileUploadError, setImageFileUploadError] = useState(null);
    // for converting the file to set it to profile
    const [ imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerReference = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }        
    };
    // update the profile pic
    useEffect(() => {
        if(imageFile){
            uploadImage();
        }
    }, [ imageFile ])

    const uploadImage = async () => {
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = 
                (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            // eslint-disable-next-line no-unused-vars
            ( error ) => {
                setImageFileUploadError("Could not upload image (File must be less than 2MB)");
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                })
            }
        )

    };        
    
    
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <input 
                    type="file" 
                    hidden accept="image/*" 
                    onChange={handleImageChange} 
                    ref={filePickerReference}/>
                        <div className="relative w-32 h-32 self-center shadow-md overflow-hidden rounded-full" 
                            onClick={() => filePickerReference.current.click()}>
                                {imageFileUploadProgress && (
                                    <CircularProgressbar value={imageFileUploadProgress || 0 }
                                    text={`${imageFileUploadProgress}%`}
                                    strokeWidth={5}
                                    styles={{
                                        root: {
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                        },
                                        path: {
                                            stroke:`rgba(62, 152, 199, ${imageFileUploadProgress / 100 })`
                                        }
                                    }}
                                    />
                                )}
                            <img   
                                src={imageFileUrl || currentUser.profilePicture} alt="userProfile" 
                                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] cursor-pointer
                                    ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`}
                            />
                        </div>
                        { imageFileUploadError &&                             
                        <Alert color="failure">
                            { imageFileUploadError }
                        </Alert>
                        }

                        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}/>
                        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email}/>
                        <TextInput type="password" id="password" placeholder="*******" />
                        <Button gradientDuoTone="purpleToBlue" outline type="submit" >
                            Update
                        </Button>
            </form>
            <div className="text-red-500 underline cursor-pointer flex justify-between mt-6">
                <span>Delete account</span>
                <span>Sign Out</span>
            </div>
        </div>
    )
}
