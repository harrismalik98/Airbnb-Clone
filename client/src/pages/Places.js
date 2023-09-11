import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AccountNav from "../components/AccountNav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Places = () => {

    const [places, setPlaces] = useState([]);
    const {user} = useContext(UserContext);
    

    useEffect(()=>{

        const getAllPlaces = async() => {
            await axios.get("/getUserPlaces")
            .then(({data}) => {
                setPlaces(data);
            });
        }

        getAllPlaces();

    }, []);



    if(!user)
    {
        return <Navigate to="/login" />
    }

    return(
        <>
            <AccountNav />

            <div className="text-center">
                <Link className="inline-flex items-center gap-1 bg-primary text-white py-2 px-6 rounded-full" to="/account/places/new">
                    <FontAwesomeIcon icon={faPlus} />
                    Add new place
                </Link>
            </div>

            <section className="mt-4 ">
                {places.length > 0 && ( places.map(place =>(
                    <Link to={"/account/places/"+place._id} key={place._id} className="flex items-center gap-4 bg-gray-100 p-4 mt-6 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            {place.photos.length > 0 && (
                                <img className="object-cover" src={"http://localhost:5000/uploads/"+place.photos[0]} alt={place.title}/> 
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                        
                    </Link>
                ))
                )}
            </section>
        </>
        
    );
}

export default Places;