import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputElement from "../components/UI/InputElement";
import SignupPasswordElement from "../components/UI/SignupPasswordElement";

const Register = () => {
    const navigate = useNavigate();

    const formRefs = {
        name:      useRef(),
        email:     useRef(),
        password:  useRef(),
    }


    const [passwordValidIcon, setPasswordValidIcon] = useState(false);
    const resetPassword = useRef();

    const passwordValidHandler = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const isPasswordValid = (
            password.length >=8 &&
            hasUpperCase    &&
            hasLowerCase    &&
            hasNumber       &&
            hasSpecialChar
        );

        setPasswordValidIcon(isPasswordValid);

        if(isPasswordValid)
        {
            formRefs.password.current = password;
        }
    }
    
    

    const registerUserHandler = async(event) => {
        event.preventDefault();

        if(passwordValidIcon)
        {
            // console.log(formRefs);

            const formData = {};

            for(const key in formRefs)
            {
                formData[key] = typeof formRefs[key].current === 'object'
                ? formRefs[key].current.value
                : formRefs[key].current;
            }

            // console.log(formData);
            
            try
            {
                await axios.post("/register",formData);
                toast.success("Registration successfull, Now you can log in");
                navigate("/login");

                // FOR CLEARING FORM
                for(const key in formRefs)
                {
                    if(typeof formRefs[key].current === 'object')
                    {
                        formRefs[key].current.value = "";
                    }
                    else
                    {
                        formRefs[key].current = "";
                    }
                }
                resetPassword.current.reset();
            }
            catch(error)
            {
                if(error.response)
                {
                    const errorMessage = error.response.data.error || "Registration Failed";
                    toast.error(errorMessage);
                }
                else
                {
                    toast.error("Registration failed due to some error. Please try again!");
                }
            }
        }
        else
        {
            toast.error("Please enter valid password");
        }   
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-48">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUserHandler}>
                    <InputElement       type="text"    id="name"        placeholder="Name"              required        ref={formRefs.name}     minLength="2"   maxLength="30" />
                    <InputElement       type="email"   id="email"       placeholder="Email Address"     required        ref={formRefs.email} />
                    <SignupPasswordElement             id="password"    passwordValidIcon={passwordValidIcon}       passwordValidHandler={passwordValidHandler}     ref={resetPassword}/>
                    <button className="primary" type="submit" >Register</button>
                    <p className="text-center py-2 text-gray-500">
                        Already a member? <Link to="/login" className="underline text-black">Login</Link>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default Register;