import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AccountNav from "../components/AccountNav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import Loading from "../components/Loading";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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

    if(places.length === 0)
    {
        return <Loading/>
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
                    <div key={place._id} className="flex items-center gap-4 bg-gray-100 p-4 mt-6 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            <PlaceImg place={place} />
                        </div>
                        <div className="grow-0 shrink">
                            <div className="flex items-center justify-between mr-8">
                                <h2 className="text-xl">{place.title}</h2>
                                <Link to={"/account/places/"+place._id} className="bg-primary py-1 px-4 text-white rounded-2xl"><FontAwesomeIcon icon={faPenToSquare} /> Edit</Link>
                            </div>
                            <p className="text-sm mt-2 mr-8">{place.description}</p>
                        </div>
                        
                    </div>
                ))
                )}
            </section>
        </>
        
    );
}

export default Places;