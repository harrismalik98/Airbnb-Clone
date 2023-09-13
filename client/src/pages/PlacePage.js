import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import Loading from "../components/Loading";

const PlacePage = () => {

    const {id} = useParams();
    const [place, setPlace] = useState([]);

    useEffect(()=>{

        axios.get("/places/"+id)
        .then(response => {
            const {data} = response;
            setPlace(data);
        })

    },[id]);

    if(place.length === 0)
    {
        return <Loading/>
    }


    return(
        <div>
            <div className="mt-4 pb-4 bg-gray-100 -mx-8 px-8 pt-8"> 
                <h1 className="text-3xl mb-2">{place.title}</h1>
                
                <AddressLink> {place.address} </AddressLink>
                <PlaceGallery place={place} />

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