import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useParams } from "react-router-dom";

const Account = () => {
    const {user} = useContext(UserContext);
    const {subpage} = useParams();
    

    const linkClasses = (type=null) => {
        let classes = "py-2 px-6 ";
        if(type === subpage || (subpage === undefined && type === "profile" ))
        {
            classes += "bg-primary text-white rounded-full"
        }
        return classes;
    }

    return(
        <>
            {!user && <h1>Loading...</h1>}
            {user && (
                <nav className="w-full flex justify-center mt-8 gap-2">
                    <Link className={linkClasses("profile")} to="/account">My profile</Link>
                    <Link className={linkClasses("bookings")} to="/account/bookings">My bookings</Link>
                    <Link className={linkClasses("places")} to="/account/places">My places</Link>
                </nav>
            )}
            
        </>
    );

}

export default Account;