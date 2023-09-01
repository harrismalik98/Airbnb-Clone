import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Profile from "../components/AccountPage/Profile";
import Places from "../components/AccountPage/Places";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faList, faBuilding } from '@fortawesome/free-solid-svg-icons';


const Account = () => {
    const [redirect, setRedirect] = useState(null);
    const {user,setUser} = useContext(UserContext);
    let {subpage} = useParams();
    // if(subpage === undefined)
    // {
    //     subpage = "profile"
    // }
    

    const linkClasses = (type=null) => {
        let classes = "inline-flex gap-1 items-center py-2 px-6 rounded-full ";
        if(type === subpage || (subpage === undefined && type === "profile" ))
        {
            classes += "bg-primary text-white"
        }
        else
        {
            classes += " bg-gray-200"
        }
        return classes;
    }

    // const logoutHandler = async() => {
    //     await axios.post("/logout");

    //     setRedirect("/");
    //     setUser(null);
    // }

    // if(redirect)
    // {
    //     return <Navigate to={redirect} />
    // }

    return(
        <>
            {!user && <h1>Loading...</h1>}
            {user && (
                <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                    <Link className={linkClasses("profile")} to="/account"><FontAwesomeIcon icon={faUser} />My profile</Link>
                    <Link className={linkClasses("bookings")} to="/account/bookings"><FontAwesomeIcon icon={faList} />My bookings</Link>
                    <Link className={linkClasses("places")} to="/account/places"><FontAwesomeIcon icon={faBuilding} />My places</Link>
                </nav>
            )}

            {subpage === undefined && <Profile />}

            {subpage === "places" && <Places />}
            
        </>
    );

}

export default Account;