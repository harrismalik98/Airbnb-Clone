const BookingWidget = ({place}) => {
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
                        <p className="text-2xl text-center">Price: ${place.price}/night</p>

                        <div className="border rounded-2xl mt-4">
                            <div className="flex justify-center">
                                <div className="py-3 px-4">
                                    <label>Check In:</label>
                                    <input type="date" />
                                </div>

                                <div className="py-3 px-4 border-l">
                                    <label>Check Out:</label>
                                    <input type="date" />
                                </div>
                            </div>
                            <div className="py-3 px-4 border-t">
                                <label>Number of guests:</label>
                                <input type="number"/>
                            </div>
                        </div>
                        

                        <button className="primary">Book this place</button>
                    </div>
    );
}

export default BookingWidget;