import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
    const [email, setEmail]      = useState("");
    const [password, setPassword]  = useState("");
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);


    const loginUserHandler = async(event) => {
        event.preventDefault();

        try
        {
            const response = await axios.post("/login",{email, password});
            setUser(response.data);

            setEmail("");
            setPassword("");

            alert("Login Successfull");
            navigate("/");
        }
        catch(error)
        {
            alert("Login Failed");
        }
    }
    

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-48">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto">
                    <input type="email" placeholder="your@email.com" value={email}      onChange={(ev) => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="password"    value={password}   onChange={(ev) => setPassword(ev.target.value)}/>
                    <button className="primary" onClick={loginUserHandler}>Login</button>
                    <p className="text-center py-2 text-gray-500">
                        Don't have an account? <Link to="/register" className="underline text-black">Register now</Link>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default Login;