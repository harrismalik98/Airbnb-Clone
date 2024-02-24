const PlaceImg = ({place, index=0}) => {

    if(!place.photos?.length)
    {
        return("");
    }

    return(
            <img className="object-cover" src={`${process.env.REACT_APP_API_BASE_URL}/uploads/`+place.photos[index]} alt={place.title}/> 
    );
}

export default PlaceImg;