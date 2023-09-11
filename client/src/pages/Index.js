import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {
    const [places, setPlaces] = useState([]);

    useEffect(()=> {
        axios.get("/getAllPlaces")
        .then(response => {
            const {data} = response
            // console.log(data);
            setPlaces(data);
            // setPlaces([...response.data, ...response.data, ...response.data]);
        });
    },[])

    return(
        <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <div key={place._id}>
                    <div className="flex bg-gray-500 rounded-2xl mb-2">
                        {place.photos[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={`http://localhost:5000/uploads/${place.photos[0]}`} alt={place.title}/>
                        )}
                    </div>
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-gray-500 text-sm">{place.title}</h3>
                    <p className="mt-1">
                        <span className="font-bold">${place.price}</span> per night
                    </p>
                </div>
            ))}
            
            
        </div>
    );
    
}

export default Index;