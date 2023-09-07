import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddPlacesForm from "./AddPlacesForm";

const Places = () => {
    const {action} = useParams();

    return(
        <>
            {action !== "new" && (
                <div className="text-center">
                    <Link className="inline-flex items-center gap-1 bg-primary text-white py-2 px-6 rounded-full" to="/account/places/new">
                        <FontAwesomeIcon icon={faPlus} />
                        Add new places
                    </Link>
                </div>
            )}

            {action === "new" && <AddPlacesForm />}
        </>
        
    );
}

export default Places;