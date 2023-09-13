import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";
import Loading from "../components/Loading";

const SingleBooking = () => {
    
    const [booking, setBooking] = useState(null);
    const {id} = useParams();
    

    useEffect(()=> {
        axios.get(`/singleBooking/${id}`)
        .then(response => {
            const {data} = response;
            setBooking(data);
        });

    }, [id])

    if(!booking)
    {
        return <Loading/>
    }
    
    return(
        <div className="mt-4 pb-4 -mx-8 px-8 pt-8"> 
            <h1 className="text-3xl mb-2">{booking.place.title}</h1>

            <div className="flex items-center justify-between bg-gray-200 p-4 my-6 rounded-2xl">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information:</h2>
                    <BookingDates booking={booking}/>
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <h2>Total price</h2>
                    <p className="text-3xl">${booking.price}</p>
                </div>
            </div>
            
            <AddressLink> {booking.place.address} </AddressLink>
            <PlaceGallery place={booking.place} />
        </div>
    );
}

export default SingleBooking;