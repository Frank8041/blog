import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <div className="w-32 h-32 self-center shadow-md overflow-hidden rounded-full">
                    <img   
                        src={currentUser.profilePicture} alt="userProfile" 
                        className="rounded-full w-full h-full object-cover border-8 border-[lightgray] cursor-pointer"
                    />
                </div>

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
