import { Link, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faList, faBuilding } from '@fortawesome/free-solid-svg-icons';

const AccountNav = () => {
    const {pathname} = useLocation();
    
    let subpage = pathname.split("/")?.[2];

    if(subpage === undefined)
    {
        subpage = "profile"
    }
    const linkClasses = (type=null) => {
        let classes = "inline-flex gap-1 items-center py-2 px-6 rounded-full ";
        if(type === subpage)
        {
            classes += "bg-primary text-white"
        }
        else
        {
            classes += " bg-gray-200"
        }
        return classes;
    }

    return(
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses("profile")} to="/account"><FontAwesomeIcon icon={faUser} />My profile</Link>
            <Link className={linkClasses("bookings")} to="/account/bookings"><FontAwesomeIcon icon={faList} />My bookings</Link>
            <Link className={linkClasses("places")} to="/account/places"><FontAwesomeIcon icon={faBuilding} />My places</Link>
        </nav>
    );
}

export default AccountNav;
