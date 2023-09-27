import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faTrashCan, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as outlinedStar } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import Perks from "../components/AddPlacesFormPage/Perks";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../context/UserContext";

const AddPlacesForm = () => {

    const {id} = useParams();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const initialState = {
        title: "",
        address: "",
        photoLink: "",
        addedPhotos: [],
        description: "",
        perks: [],
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        maxGuests: 1,
        price:100
      };
    const [state, setState] = useState(initialState);



    const updateStateString = (stateName, stateValue) => {
        setState((prevState) => ({
            ...prevState,
            [stateName]: stateValue
        }));
    }



    const updateStateArray = (stateName, stateValue, shouldSpread = true, edit = false) => {
        if(edit === false)
        {
            setState((prevState) => ({
                ...prevState,
                [stateName]: shouldSpread
                  ? [...prevState[stateName], ...stateValue]     // For adding multiple photos at once
                  : [...prevState[stateName], stateValue]       // For adding photos by link
              }));
        }
        else
        {
            setState((prevState) => ({
                ...prevState,
                [stateName]:stateValue
            }))
        }
        
      };



    useEffect(()=>{
        if(id)
        {
            axios.get("/places/"+id)
            .then(response => {
                const {data} = response;

                updateStateString("title", data.title);
                updateStateString("address", data.address);
                updateStateArray("addedPhotos", data.photos, false, true);
                updateStateString("description", data.description);
                updateStateArray("perks", data.perks, true, true);
                updateStateString("extraInfo", data.extraInfo);
                updateStateString("checkIn", data.checkIn);
                updateStateString("checkOut", data.checkOut);
                updateStateString("maxGuests", data.maxGuests);
                updateStateString("price", data.price);
            });   
        }
    },[id])

    if(!user)
    {
        return <Navigate to="/login" />
    }



    const preInput = (title,description) => {
        return(
            <>
                <h2 className="text-2xl mt-4">{title}</h2>
                <p className="text-gray-500 text-sm">{description}</p>
            </>
        );
    }



    const addPhotoByLink = async(event) => {
        event.preventDefault();

        const {data:filename} = await axios.post("/uploadByLink", {link: state.photoLink});
        updateStateArray("addedPhotos",filename, false);

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



    const removePhoto = async(link) => {
        setState(prevState => ({
            ...prevState,
            addedPhotos: prevState.addedPhotos.filter(addedPhoto => addedPhoto !== link)
        }));
    }
    


    const selectedAsMainPhoto = async(link) => {    
        setState(prevState => ({
            ...prevState,
            addedPhotos: [link, ...prevState.addedPhotos.filter(addedPhoto => addedPhoto !== link)]
        }));
    }


    const savePlace = async(event) => {
        event.preventDefault();

        const placeData = {
            title:       state.title, 
            address:     state.address, 
            photoLink:   state.photoLink,
            addedPhotos: state.addedPhotos, 
            description: state.description, 
            perks:       state.perks,
            extraInfo:   state.extraInfo, 
            checkIn:     state.checkIn, 
            checkOut:    state.checkOut, 
            maxGuests:   state.maxGuests,
            price:       state.price
        }

        if(!id)
        {
            // Adding New Place
            await axios.post("/addNewPlace", placeData);
        }
        else
        {
            // Editing Existing Place
            await axios.put("/editPlace", {id, ...placeData});
        }

        setState(initialState);
        
        navigate("/account/places");
    }



    return(
        <>
            <AccountNav/>
            <form className="w-4/5 mx-auto" onSubmit={savePlace}>
                {preInput("Title", "Title for your place, should be short and catchy as in advertisement")}
                <input type="text" placeholder="title, for example: My lovely apartment" value={state.title} onChange={ev => updateStateString("title", ev.target.value)} required />

                {preInput("Address", "Address to this place")}
                <input type="text" placeholder="address"  value={state.address} onChange={ev => updateStateString("address", ev.target.value)} required />

                {preInput("Photos", "More is better")}
                <div className="flex gap-2">
                    <input type="text" placeholder="Add using a link ...jpg" value={state.photoLink} onChange={ev => updateStateString("photoLink", ev.target.value)}/>
                    <button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>Add&nbsp;photo</button>
                </div>
                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {state.addedPhotos.length > 0 && state.addedPhotos.map((link, index) => {
                        return(
                            <div className="h-32 flex relative" key={index} >
                                <img className="rounded-2xl w-full object-cover position-center" src={`http://localhost:5000/uploads/${link}`} alt=""/>
                                <FontAwesomeIcon className="absolute bottom-1 right-1 text-white cursor-pointer bg-black bg-opacity-50 rounded-xl p-2" onClick={() => removePhoto(link)} icon={faTrashCan} />
                                {
                                    link === state.addedPhotos[0] 
                                    ? <FontAwesomeIcon className="absolute bottom-1 left-1 fill-none text-white cursor-pointer bg-black bg-opacity-50 rounded-xl p-2" onClick={() => selectedAsMainPhoto(link)} icon={solidStar} />
                                    : <FontAwesomeIcon className="absolute bottom-1 left-1 fill-none text-white cursor-pointer bg-black bg-opacity-50 rounded-xl p-2" onClick={() => selectedAsMainPhoto(link)} icon={outlinedStar} />
                                }
                                      
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
                <textarea  value={state.description} onChange={ev => updateStateString("description", ev.target.value)} required />

                {preInput("Perks", "Select the perks of your place")}
                <Perks selected={state.perks} onChange={setState}/>

                {preInput("Extra Info", "House rules, etc")}
                <textarea  value={state.extraInfo} onChange={ev => updateStateString("extraInfo", ev.target.value)} />

                {preInput("Check in&out Times", "Add check in and out times, remember to have some time window for cleaning the room between guests")}
                <div className="grid gap-2 grid-cols-2 md-grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" placeholder="8:00"  value={state.checkIn} onChange={ev => updateStateString("checkIn", ev.target.value)} required />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" placeholder="18:00" value={state.checkOut} onChange={ev => updateStateString("checkOut", ev.target.value)} required />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number" value={state.maxGuests} onChange={ev => updateStateString("maxGuests", ev.target.value)}/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night($)</h3>
                        <input type="number" value={state.price} onChange={ev => updateStateString("price", ev.target.value)} required />
                    </div>
                </div>

                <button className="primary my-4" type="submit">Save</button>

            </form>
        </>
    );
}

export default AddPlacesForm;