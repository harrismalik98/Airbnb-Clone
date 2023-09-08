import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCarSide, faTv, faDoorOpen, faPaw, faKitchenSet} from '@fortawesome/free-solid-svg-icons';

const Perks = ({selected, onChange}) => {

    const cbHandler = (event) => {
        const {checked, name} = event.target;
        // console.log(checked, name);

        if(checked)
        {
            onChange((prevState) => ({
                ...prevState,
                perks: [...selected, name]
            }))
        }
        else
        {
            onChange((prevState) => ({
                ...prevState,
                perks: [...selected.filter(selectedName => selectedName !== name)]
            }))
        }
    }

    return(
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" name='wifi' onClick={cbHandler} />
                <span><FontAwesomeIcon icon={faWifi} /> Wifi</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" name='free parking' onClick={cbHandler} />
                <span><FontAwesomeIcon icon={faCarSide} /> Free parking on premises</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" name='tv' onClick={cbHandler} />
                <span><FontAwesomeIcon icon={faTv} /> TV</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" name="pets" onClick={cbHandler} />
                <span><FontAwesomeIcon icon={faPaw} /> Pets allowed</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" name='kitchen' onClick={cbHandler} />
                <span><FontAwesomeIcon icon={faKitchenSet} /> Kitchen</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" name='private entrance' onClick={cbHandler} />
                <span><FontAwesomeIcon icon={faDoorOpen} /> Private Entrance</span>
            </label>
        </div>
    );
}

export default Perks;