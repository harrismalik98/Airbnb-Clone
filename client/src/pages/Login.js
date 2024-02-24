import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import PasswordElement from "../components/UI/PasswordElement";
import InputElement from "../components/UI/InputElement";

const Login = () => {
    const formRefs = {
        email:     useRef(),
        password:  useRef(),
    }

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    useEffect(()=> {
        if(user)
        {
            navigate("/account");
        }
    },[navigate, user])


    const loginUserHandler = async(event) => {

        event.preventDefault();

        const formData = {};

        for(const key in formRefs)
        {
            formData[key] = formRefs[key].current.value;
        }
        // console.log(formData);

        try
        {
            const response = await axios.post("/login", formData);
            setUser(response.data);

            // FOR CLEARING THE FORM
            for(const key in formRefs)
            {
                formRefs[key].current.value = "";
            }

            toast.success("Login Successfull");
            navigate("/");
        }
        catch(error)
        {
            if (error.response)
            {
                const errorMessage = error.response.data.error || "Login Failed";
                toast.error(errorMessage);
            }
            else
            {
                toast.error("Login failed due to some error. Please try again!");
            }
        }   
    }
    

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-48 w-2/3">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="flex flex-col justify-between gap-2 max-w-md mx-auto" onSubmit={loginUserHandler}>
                    <InputElement       type="email"    id="email"      placeholder="Email Address"     required        ref={formRefs.email}/>
                    <PasswordElement    id="password"   ref={formRefs.password}        />
                    <button className="primary" type="submit">Login</button>
                    <p className="text-center py-2 text-gray-500">
                        Don't have an account? <Link to="/register" className="underline text-black">Register now</Link>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default Login;