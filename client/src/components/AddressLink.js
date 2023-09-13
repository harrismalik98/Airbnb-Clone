import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';

const AddressLink = ({children}) => {

    return(
        <a target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${children}`} className="font-semibold underline my-3"><FontAwesomeIcon icon={faLocationDot} /> {children} </a>
    );
}

export default AddressLink;