import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const PlaceGallery = ({place}) => {

    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if(showAllPhotos)
    {
        return(
            <div className="absolute inset-0 bg-black bg-opacity-30 min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl text-white mr-48">Places of {place.title}</h2>
                        <button className="fixed right-12 top-8 flex items-center gap-1 py-4 px-4 rounded-2xl shadow shadow-black bg-white text-black" onClick={()=> setShowAllPhotos(false)}><FontAwesomeIcon icon={faCircleXmark} /> Close photos</button>
                        
                    </div>
                    {place.photos.length > 0 && place.photos.map(place => (
                            <img className="w-screen object-cover" src={`http://localhost:5000/uploads/${place}`} alt=""/>
                        ))}
                </div>
            </div>
        );
    }



    return(
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] my-6 rounded-3xl overflow-hidden">
                {place.photos?.[0] && <img onClick={()=> setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`http://localhost:5000/uploads/${place.photos[0]}`} alt={place.title}/>}
                <div className="grid">
                    {place.photos?.[1] && <img onClick={()=> setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`http://localhost:5000/uploads/${place.photos[1]}`} alt={place.title}/>}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && <img onClick={()=> setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2 " src={`http://localhost:5000/uploads/${place.photos[2]}`} alt={place.title}/>}
                    </div>
                </div>
            </div>
            <button className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500" onClick={()=> setShowAllPhotos(true)}><FontAwesomeIcon icon={faImages} /> Show more photos</button>
        </div>
    );
}

export default PlaceGallery;