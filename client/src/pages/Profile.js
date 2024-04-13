import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import toast from "react-hot-toast";

const Profile = () => {

    const [redirect, setRedirect] = useState(null);
    const {user,setUser} = useContext(UserContext);

    const logoutHandler = async() => {
        const {data} = await axios.get("/logout");

        localStorage.removeItem("airbnb-token");
        setUser(null);
        toast.success(data.message);

        setRedirect("/");
    }

    if(!user)
    {
        return <Navigate to="/login" />
    }

    if(redirect)
    {
        return <Navigate to={redirect} />
    }

    return(
        <>
            <AccountNav/>
            <div className="text-center max-w-lg mx-auto">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <button className="primary max-w-sm mt-2" onClick={logoutHandler}>Logout</button>
            </div>
        </>
    );
}

export default Profile;