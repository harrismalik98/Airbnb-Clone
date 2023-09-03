import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCarSide, faTv, faDoorOpen, faPaw, faKitchenSet} from '@fortawesome/free-solid-svg-icons';

const Perks = ({selected, onChange}) => {
    return(
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox"/>
                <span><FontAwesomeIcon icon={faWifi} /> Wifi</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox"/>
                <span><FontAwesomeIcon icon={faCarSide} /> Free parking on premises</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox"/>
                <span><FontAwesomeIcon icon={faTv} /> TV</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox"/>
                <span><FontAwesomeIcon icon={faPaw} /> Pets allowed</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox"/>
                <span><FontAwesomeIcon icon={faKitchenSet} /> Kitchen</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox"/>
                <span><FontAwesomeIcon icon={faDoorOpen} /> Private Entrance</span>
            </label>
        </div>
    );
}

export default Perks;