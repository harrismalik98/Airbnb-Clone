import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import Loading from "../components/Loading";

const Bookings = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(()=> {

        axios.get("/getBookings")
        .then(response => {
            const {data} = response;
            setBookings(data);
        });

    }, [])

    if(bookings.length === 0)
    {
        return <Loading/>
    }

    return(
        <>
            <AccountNav/>
            
            {bookings.length > 0 && bookings.map(booking => (
                <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden" key={booking._id}>
                    <div className="w-60">
                        <PlaceImg place={booking.place}/>
                    </div>
                    <div className="py-3 pr-3 grow" >
                        <h2 className="text-2xl pb-2">{booking.place.title}</h2>
                        <div className="flex gap-2 items-center border-t border-gray-400">
                            <BookingDates booking={booking}/>
                        </div>

                        <div className="flex gap-1 pt-2">
                                <p className="flex gap-2 items-center text-xl">
                                    <FontAwesomeIcon icon={faMoneyCheckDollar} />
                                    Total price: ${booking.price}
                                </p>
                        </div>
                        
                    </div>
                </Link>
            ))}
        </>
    );
}

export default Bookings;