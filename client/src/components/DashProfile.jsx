import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    updateStart,
    updateSuccess,
    updateFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";



export default function DashProfile() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [ imageFile, setImageFile ] = useState(null);
    const [ imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [ imageFileUploadError, setImageFileUploadError] = useState(null);
    // for converting the file to set it to profile
    const [ imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerReference = useRef();
    // for updating user
    const [ formData, setFormData ] = useState({});
    const [ imageFileUploading, setImageFileUploading ] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess ] = useState(null);
    const [updateUserError, setUpdateUserError ] = useState(null); 

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
        setImageFileUploading(true);
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
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                })
            }
        )
    };     
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError("No changes made!");
            return;
        }
        if(imageFileUploading) {
            setUpdateUserError("Please wait image to upload!");
            return;
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok){
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);                
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's Profile updated successfully!");
            }
            
        } catch (error) {
            dispatch(updateFailure(error.message));
        }
    }

    
    
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                        <TextInput 
                            type="text" 
                            id="username" 
                            placeholder="username" 
                            defaultValue={currentUser.username}
                            onChange={handleChange}
                            />
                        <TextInput 
                            type="email" 
                            id="email" 
                            placeholder="email" 
                            defaultValue={currentUser.email}
                            onChange={handleChange}
                            />
                        <TextInput 
                            type="password" 
                            id="password" 
                            placeholder="*******" 
                            onChange={handleChange}
                            />

                        <Button gradientDuoTone="purpleToBlue" outline type="submit" >
                            Update
                        </Button>
            </form>
            <div className="text-red-500 underline cursor-pointer flex justify-between mt-6">
                <span>Delete account</span>
                <span>Sign Out</span>
            </div>

            {
                updateUserSuccess && (
                    <Alert color="success" className="mt-5">
                        { updateUserSuccess }
                    </Alert>
                )
            }

            {
                updateUserError && (
                    <Alert color="failure" className="mt-5">
                        { updateUserError }
                    </Alert>
                )
            }


        </div>
    )
}
