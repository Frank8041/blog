import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                { /* left side */}
                <div className="flex-1">
                    <Link to="/" className=" font-bold dark:text-white text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r 
                        from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Lingua</span>
                        Blog
                    </Link>

                    <p className="text-sm mt-5">
                        Sign up with google or create an account.
                    </p>

                </div>
                { /* right side */}

                <div className="flex-2">
                    <form className="flex flex-col gap-4">
                        <div className="">
                            <Label value="Your username"/>
                            <TextInput 
                            type="text"
                            placeholder="username"
                            id="username"/>
                        </div>
                        <div className="">
                            <Label value="Your email"/>
                            <TextInput 
                            type="email"
                            placeholder="email@gmail.com"
                            id="email"/>
                        </div>
                        <div className="">
                            <Label value="Your password"/>
                            <TextInput 
                            type="password"
                            placeholder="password"
                            id="password"/>
                        </div>

                        <Button type="submit" 
                            gradientDuoTone="purpleToPink">
                            Sign Up
                        </Button>
                    </form>
                    <div className="text-sm mt-5 flex">
                        <span>Have an account?</span>
                        <Link to="/sign-in" className="text-blue-500 underline">
                            Sign In
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
