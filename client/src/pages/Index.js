import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { SearchContext } from "../context/SearchContext";
import toast from "react-hot-toast";

const Index = () => {
    const [page, setPage] = useState(1);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    const loadPlacesCalled = useRef(false);


    const {searchPlace} = useContext(SearchContext);

    useEffect(() => {

        if(searchPlace === null || searchPlace === "")
        {
            if(!loadPlacesCalled.current)
            {
                loadPlaces();
                setHasMore(true);
                loadPlacesCalled.current = true;
            }
        }
        else
        {
            setHasMore(false);

            const debounceTimeout = setTimeout(()=>{

                axios.get(`/getSearchedPlace/?search=${searchPlace}`)
                .then(response => {
                    const {data} = response;
                    setPlaces(data);
                    setPage(1);
                    loadPlacesCalled.current = false;
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
        }
    }, [searchPlace]);



    const loadPlaces = async() => {
        if(loading)
        {
            return;
        }
        setLoading(true);

        try
        {
            const {data} = await axios.get(`/getAllPlaces/?page=${page}`);

            if(data.length === 0)
            {
                setHasMore(false);
                setPage(page-1); // If data is empty then page represents current page number
                return;
            }

            if(data.length < 8)
            {
                setHasMore(false);
                setPlaces((prevState) => [...prevState, ...data]);
                return;
            }

            if(page === 1)
            {
                setPlaces(data);
            }
            else
            {
                setPlaces((prevState) => [...prevState, ...data]);
            }
            setPage(page+1);
        }
        catch(err)
        {
            console.error(err);
        }
        finally
        {
            setLoading(false);
        }
    };



    const loadMoreHandler = () => {
        loadPlaces();
    }



    if(places.length === 0)
    {
        return <Loading/>
    }


    
    return(
        <>
            <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {places.length > 0 && places.map((place, index) => (
                    <Link to={`/place/${place._id}`} key={index}>
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

            {hasMore && (
                <button className="mt-10 mb-2 m-auto px-4 py-2 bg-primary rounded-full text-white" onClick={loadMoreHandler} disabled={loading}>{loading ? "Loading..." : "Load More Places"}</button>
            )}
            
        </>
    );
    
}

export default Index;