import { useContext, useEffect, useState } from "react";
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const BookingWidget = ({place}) => {

    const [checkIn, setCheckIn]               = useState("");
    const [checkOut, setCheckOut]             = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState("");
    const [name, setName]                     = useState("");
    const [phone, setPhone]                   = useState("");

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    let numberOfNights = 0;
    if(checkIn && checkOut)
    {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }



    useEffect(()=> {
        if(user)
        {
            setName(user.name);
        }
    }, [user]);



    const bookingHandler = async() => {
        if(user)
        {
            const booking = {
                place: place._id,
                checkIn, checkOut, numberOfGuests, name, phone,
                price: numberOfNights * place.price
            }
    
            const {data} = await axios.post("/addbooking", booking);
    
            setCheckIn("");
            setCheckOut("");
            setNumberOfGuests("");
            setName("");
            setPhone("");
    
            navigate(`/account/bookings/${data._id}`);
        }
        else
        {
            navigate("/login");
        }
        
    }

    

    return(
        <div className="bg-white shadow p-4 rounded-2xl">
            <p className="text-2xl text-center">Price: ${place.price}/night</p>

            <div className="border rounded-2xl mt-4">
                <div className="flex justify-center">
                    <div className="py-3 px-4">
                        <label>Check In:</label>
                        <input type="date" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
                    </div>

                    <div className="py-3 px-4 border-l">
                        <label>Check Out:</label>
                        <input type="date" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input type="number" value={numberOfGuests} onChange={(ev) => setNumberOfGuests(ev.target.value)}/>
                </div>

                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(ev) => setName(ev.target.value)}/>
                        <label>Phone number:</label>
                        <input type="tel" value={phone} onChange={(ev) => setPhone(ev.target.value)}/>
                    </div>
                )}

            </div>

            <button onClick={bookingHandler} className="primary">Book this place
                {numberOfNights > 0 && (
                    <span>: ${numberOfNights * place.price}</span>
                )}
            </button>

        </div>
    );
}

export default BookingWidget;