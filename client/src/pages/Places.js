import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AccountNav from "../components/AccountNav";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Places = () => {

    const {user} = useContext(UserContext);

    if(!user)
    {
        return <Navigate to="/login" />
    }

    return(
        <>
            <AccountNav />
            <div className="text-center">
                <p>List of all added places</p>
                <Link className="inline-flex items-center gap-1 bg-primary text-white py-2 px-6 rounded-full" to="/account/places/new">
                    <FontAwesomeIcon icon={faPlus} />
                    Add new places
                </Link>
            </div>
        </>
        
    );
}

export default Places;