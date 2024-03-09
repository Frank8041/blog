import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import {
    signInStart,
    signInSuccess,
    signInFailure
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
    const [ formData, setFormData ] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error: errorMessage } = useSelector(state => state.user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( !formData.email || !formData.password) {
            return dispatch(signInFailure("Please fill out all fields!"));
        }
        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            // duplicates
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            }
            
            // then navigate to homepage /
            if(res.ok) {
                dispatch(signInSuccess(data));
                navigate ("/");
            }

        } catch (error) {
            dispatch(signInFailure(error.message));          
        }
    }
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
                        Sign in with google or create an account.
                    </p>

                </div>
                { /* right side */}

                <div className="flex-2">
                    <form 
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                    >
                        <div className="">
                            <Label value="Your email"/>
                            <TextInput 
                            type="email"
                            placeholder="email@gmail.com"
                            id="email"
                            onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <Label value="Your password"/>
                            <TextInput 
                            type="password"
                            placeholder="**************"
                            id="password"
                            onChange={handleChange}
                            />
                        </div>

                        <Button 
                            type="submit" 
                            gradientDuoTone="purpleToPink"
                            disabled={loading}>
                            {
                                loading ? (
                                    <>
                                    <Spinner size="small" />
                                    <span className="pl-3">Loading...</span>                                    
                                    </>
                                ) : "Sign In"
                            }
                        </Button>

                        <OAuth />
                    </form>
                    <div className="text-sm mt-5 flex">
                        <span>Dont have an account?</span>
                        <Link to="/sign-up" className="text-blue-500 underline">
                            Sign Up
                        </Link>
                    </div>

                    {
                        errorMessage && (
                            <Alert className="mt-5 " color="failure">
                                { errorMessage }
                            </Alert>
                        )
                    }

                </div>
            </div>
        </div>
    );
}
