import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from "axios";
import Perks from "./Perks";

const Places = () => {
    const {action} = useParams();

    const [state, setState] = useState({
        title:"",
        address:"",
        photoLink:"",
        addedPhotos:[],
        description:"",
        perks:[],
        extraInfo:"",
        checkIn:"",
        checkOut:"",
        maxGuests:1
    });

    const preInput = (title,description) => {
        return(
            <>
                <h2 className="text-2xl mt-4">{title}</h2>
                <p className="text-gray-500 text-sm">{description}</p>
            </>
        );
    }

    const updateStateString = (stateName, stateValue) => {
        setState((prevState) => ({
            ...prevState,
            [stateName]: stateValue
        }));

        // console.log(stateName, stateValue);
    }

    const updateStateArray = (stateName, stateValue) => {
        setState((prevState) => ({
            ...prevState,
            [stateName]: [...prevState[stateName] , ...stateValue]
        }));
    }

    const addPhotoByLink = async(event) => {
        event.preventDefault();

        const {data:filename} = await axios.post("/uploadByLink", {link: state.photoLink});
        updateStateArray("addedPhotos",filename);

        updateStateString("photoLink","");
    }

    const uploadPhoto = (event) => {

        const files = event.target.files;
        const data = new FormData();

        for(let i=0; i<files.length; i++)
        {
            data.append("photos", files[i]);
        }

        try
        {
            axios.post("/uploadPhoto", data, {
                headers:{"Content-type": "multipart/form-data"}
            })
            .then(response => 
            {
                const {data:filenames} = response;
                updateStateArray("addedPhotos",filenames);
            });
        }
        catch(error)
        {
            console.log(error);
        }
    }


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

            {action === "new" && (
                <form>
                    {preInput("Title", "Title for your place, should be short and catchy as in advertisement")}
                    <input type="text" placeholder="title, for example: My lovely apartment" value={state.title} onChange={ev => updateStateString("title", ev.target.value)}/>

                    {preInput("Address", "Address to this place")}
                    <input type="text" placeholder="address"  value={state.address} onChange={ev => updateStateString("address", ev.target.value)}/>

                    {preInput("Photos", "More is better")}
                    <div className="flex gap-2">
                        <input type="text" placeholder="Add using a link ...jpg" value={state.photoLink} onChange={ev => updateStateString("photoLink", ev.target.value)}/>
                        <button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>Add&nbsp;photo</button>
                    </div>
                    <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {state.addedPhotos.length > 0 && state.addedPhotos.map((link, index) => {
                            return(
                                <div className="h-32 flex" key={index} >
                                    <img className="rounded-2xl w-full object-cover position-center" src={`http://localhost:5000/uploads/${link}`} alt=""/>
                                </div>
                            );
                        })}
                        <label className="h-32 cursor-pointer flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                            <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                            <FontAwesomeIcon icon={faArrowUpFromBracket} />
                            Upload
                        </label>
                    </div>

                    {preInput("Description", "Description of the place")}
                    <textarea  value={state.description} onChange={ev => updateStateString("desciption", ev.target.value)}/>

                    {preInput("Perks", "Select the perks of your place")}
                    <Perks selected={state.perks} onChange={setState}/>

                    {preInput("Extra Info", "House rules, etc")}
                    <textarea  value={state.extraInfo} onChange={ev => updateStateString("extraInfo", ev.target.value)}/>

                    {preInput("Check in&out Times", "Add check in and out times, remember to have some time window for cleaning the room between guests")}
                    <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3 className="mt-2 -mb-1">Check in time</h3>
                            <input type="text" placeholder="8:00"  value={state.checkIn} onChange={ev => updateStateString("checkIn", ev.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check out time</h3>
                            <input type="text" placeholder="18:00" value={state.checkOut} onChange={ev => updateStateString("checkOut", ev.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Max number of guests</h3>
                            <input type="number" value={state.maxGuests} onChange={ev => updateStateString("maxGuests", ev.target.value)}/>
                        </div>
                    </div>

                    <button className="primary my-4">Save</button>

                </form>
            )}
        </>
        
    );
}

export default Places;