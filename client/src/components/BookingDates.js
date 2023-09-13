import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import format from 'date-fns/format';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faMoon } from "@fortawesome/free-solid-svg-icons";

const BookingDates = ({booking}) => {

    return(
        <div className="flex gap-4 mb-2 mt-3 text-lg">
            <p className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faMoon} />
                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}
            </p>
            <p className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faCalendarDays} />
                {format(new Date(booking.checkIn), 'dd-MM-yyyy') }
            </p>
            <p className="flex gap-1 items-center">
                &rarr;
            </p>
            <p className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faCalendarDays} />
                {format(new Date(booking.checkOut), 'dd-MM-yyyy') }
            </p>
        </div>
    )
}

export default BookingDates;