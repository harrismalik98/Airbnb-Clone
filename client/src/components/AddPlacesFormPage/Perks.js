import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCarSide, faTv, faDoorOpen, faPaw, faKitchenSet} from '@fortawesome/free-solid-svg-icons';

const Perks = ({selected, onChange}) => {

    const cbHandler = (event) => {
        const {checked, name} = event.target;

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
                <input type="checkbox" checked={selected.includes('wifi')} name='wifi' onChange={cbHandler} />
                <span><FontAwesomeIcon icon={faWifi} /> Wifi</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" checked={selected.includes('free parking')} name='free parking' onChange={cbHandler} />
                <span><FontAwesomeIcon icon={faCarSide} /> Free parking on premises</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" checked={selected.includes('tv')} name='tv' onChange={cbHandler} />
                <span><FontAwesomeIcon icon={faTv} /> TV</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" checked={selected.includes("pets")} name="pets" onChange={cbHandler} />
                <span><FontAwesomeIcon icon={faPaw} /> Pets allowed</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" checked={selected.includes('kitchen')} name='kitchen' onChange={cbHandler} />
                <span><FontAwesomeIcon icon={faKitchenSet} /> Kitchen</span>
            </label>
            <label className="border p-4 flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type="checkbox" checked={selected.includes('private entrance')} name='private entrance' onChange={cbHandler} />
                <span><FontAwesomeIcon icon={faDoorOpen} /> Private Entrance</span>
            </label>
        </div>
    );
}

export default Perks;