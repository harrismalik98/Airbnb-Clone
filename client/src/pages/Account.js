import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const Account = () => {
    const [redirect, setRedirect] = useState(null);
    const {user,setUser} = useContext(UserContext);
    let {subpage} = useParams();
    // if(subpage === undefined)
    // {
    //     subpage = "profile"
    // }
    

    const linkClasses = (type=null) => {
        let classes = "py-2 px-6 ";
        if(type === subpage || (subpage === undefined && type === "profile" ))
        {
            classes += "bg-primary text-white rounded-full"
        }
        return classes;
    }

    const logoutHandler = async() => {
        await axios.post("/logout");

        setRedirect("/");
        setUser(null);
    }

    if(redirect)
    {
        return <Navigate to={redirect} />
    }

    return(
        <>
            {!user && <h1>Loading...</h1>}
            {user && (
                <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                    <Link className={linkClasses("profile")} to="/account">My profile</Link>
                    <Link className={linkClasses("bookings")} to="/account/bookings">My bookings</Link>
                    <Link className={linkClasses("places")} to="/account/places">My places</Link>
                </nav>
            )}

            {subpage === undefined && (
                <div className="text-center max-w-lg mx-auto">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <button className="primary max-w-sm mt-2" onClick={logoutHandler}>Logout</button>
                </div>
            )}
            
        </>
    );

}

export default Account;