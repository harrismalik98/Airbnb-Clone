const PlaceImg = ({place, index=0}) => {

    if(!place.photos?.length)
    {
        return("");
    }

    return(
            <img className="object-cover" src={"http://localhost:5000/uploads/"+place.photos[index]} alt={place.title}/> 
    );
}

export default PlaceImg;