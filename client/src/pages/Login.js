import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail]      = useState("");
    const [password, setPassword]  = useState("");
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

        try
        {
            const response = await axios.post("/login",{email, password});
            setUser(response.data);

            setEmail("");
            setPassword("");

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
            <div className="mb-48">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginUserHandler}>
                    <input type="email" placeholder="your@email.com" value={email}      onChange={(ev) => setEmail(ev.target.value)}       required />
                    <input type="password" placeholder="password"    value={password}   onChange={(ev) => setPassword(ev.target.value)}    required />
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