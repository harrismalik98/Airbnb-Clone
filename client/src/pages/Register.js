import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName]         = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerUserHandler = async(event) => {
        event.preventDefault();

        try
        {
            await axios.post("/register",{
                name, email, password
            });
    
            setName("");
            setEmail("");
            setPassword("");
    
            toast.success("Registration successfull, Now you can log in");

            navigate("/login");
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

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-48">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUserHandler}>
                    <input type="text" placeholder="Enter your name" value={name}       onChange={ev => setName(ev.target.value)}       required />
                    <input type="email" placeholder="your@email.com" value={email}      onChange={ev => setEmail(ev.target.value)}      required />
                    <input type="password" placeholder="password"    value={password}   onChange={ev => setPassword(ev.target.value)}   required />
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