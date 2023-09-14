import axios from "axios";
import { useState } from "react";
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
    
            navigate("/login");
            alert("Registration successfull, Now you can log in");
        }
        catch(error)
        {
            alert("Registration failed, Please try again later");
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