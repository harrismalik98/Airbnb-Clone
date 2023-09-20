import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { SearchContext } from "../context/SearchContext";
import toast from "react-hot-toast";

const Index = () => {
    const [places, setPlaces] = useState([]);

    const {searchPlace} = useContext(SearchContext);

    useEffect(() => {

        const debounceTimeout = setTimeout(()=>{

            axios.get(`/getSearchedPlace/?search=${searchPlace}`)
            .then(response => {
                const {data} = response;
                setPlaces(data);
            })
            .catch(error => {
                if (error.response)
                {
                    const errorMessage = error.response.data.error;
                    
                    toast.error(errorMessage, {
                        position: "top-right"
                    });
                }
                else
                {
                    toast.error("Searching failed due to some error. Please try again!");
                }
            })

        },1000)

        return () => {
            clearInterval(debounceTimeout);
        }

    }, [searchPlace]);



    useEffect(()=> {
        axios.get("/getAllPlaces")
        .then(response => {
            const {data} = response
            setPlaces(data);
        });
    },[])



    if(places.length === 0)
    {
        return <Loading/>
    }


    
    return(
        <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link to={`/place/${place._id}`} key={place._id}>
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
                </Link>
            ))}
            
        </div>
    );
    
}

export default Index;