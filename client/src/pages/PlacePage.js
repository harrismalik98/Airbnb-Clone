import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages , faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

const PlacePage = () => {

    const {id} = useParams();
    const [place, setPlace] = useState([]);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(()=>{

        axios.get("/places/"+id)
        .then(response => {
            const {data} = response;
            setPlace(data);
        })

    },[id]);



    if(showAllPhotos)
    {
        return(
            <div className="absolute inset-0 bg-black bg-opacity-30 min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl text-white mr-48">Places of {place.title}</h2>
                        <button className="fixed right-12 top-8 flex items-center gap-1 py-4 px-4 rounded-2xl shadow shadow-black bg-white text-black" onClick={()=> setShowAllPhotos(false)}><FontAwesomeIcon icon={faCircleXmark} /> Close photos</button>
                        
                    </div>
                    {place.photos.length > 0 && place.photos.map(place => (
                            <img className="w-screen object-cover" src={`http://localhost:5000/uploads/${place}`} alt=""/>
                        ))}
                </div>
            </div>
        );
    }

    return(
        // py-8 pb-4
        <div>
            <div className="mt-4 pb-4 bg-gray-100 -mx-8 px-8 pt-8"> 
                <h1 className="text-3xl mb-2">{place.title}</h1>
                <a target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${place.address}`} className="font-semibold underline my-3"><FontAwesomeIcon icon={faLocationDot} /> {place.address}</a>

                <div className="relative">
                    <div className="grid gap-2 grid-cols-[2fr_1fr] my-6 rounded-3xl overflow-hidden">
                        {/* <div> */}
                            {place.photos?.[0] && <img onClick={()=> setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`http://localhost:5000/uploads/${place.photos[0]}`} alt={place.title}/>}
                        {/* </div> */}
                        <div className="grid">
                            {place.photos?.[1] && <img onClick={()=> setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`http://localhost:5000/uploads/${place.photos[1]}`} alt={place.title}/>}
                            <div className="overflow-hidden">
                                {place.photos?.[2] && <img onClick={()=> setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2 " src={`http://localhost:5000/uploads/${place.photos[2]}`} alt={place.title}/>}
                            </div>
                        </div>
                    </div>
                    <button className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500" onClick={()=> setShowAllPhotos(true)}><FontAwesomeIcon icon={faImages} /> Show more photos</button>
                </div>

                

                <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="my-4">
                            <h2 className="font-semibold text-2xl">Description</h2>
                            <p>{place.description}</p>
                        </div>
                
                        <p>Check-In: {place.checkIn}</p>
                        <p>Check-Out: {place.checkOut}</p>
                        <p>Max number of guests: {place.maxGuests}</p>
                    </div>

                    <BookingWidget place={place}/>
                </div>

            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                    <p className="mb-4 mt-2 text-sm text-gray-800 leading-5">{place.extraInfo}</p>
            </div>

        </div>
    );
}

export default PlacePage;