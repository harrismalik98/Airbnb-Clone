import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import { faSearch , faBars, faCircleUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { SearchContext } from '../context/SearchContext';

const Header = () => {
    const [searchBar, setSearchBar] = useState(false);
    const [searching, setSearching] = useState("");
    const {user} = useContext(UserContext);
    const {setSearchPlace} = useContext(SearchContext);

    useEffect(() => {

        setSearchPlace(searching);

    }, [searching, setSearchPlace]);



    const searchBarHandler = () => {
        setSearchBar(prevState => !prevState);
        setSearching("");
    }

    return(
        <header className="flex items-center justify-between">
            <Link to="/" className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faAirbnb} style={{ color: "#ff5a60" }}  size="2x"/>
            <span className="font-bold text-xl">Airbnb</span>
            </Link>


            <div className='flex items-center justify-center border border-gray-300 rounded-full py-2 px-4 gap-4 shadow-md shadow-gray-300'>
            {
                searchBar ? <input className="h-6 focus:outline-none" autoFocus type='text' placeholder='Search by address...' value={searching} onChange={ev => setSearching(ev.target.value)}/> :
                <>
                <div>Anywhere</div>
                <div className='border-l-2 h-6 border-gray-300'></div>
                <div>Any week</div>
                <div className='border-l-2 h-6 border-gray-300'></div>
                <div>Add guests</div>
                </>
            }
            <button className='flex items-center justify-center bg-primary w-7 h-7 text-white p-1 rounded-full' onClick={searchBarHandler}><FontAwesomeIcon icon={faSearch} size="xs"/></button>
            </div>

            <div className='flex items-center border border-gray-300 rounded-full py-2 px-4 gap-4'>
            <FontAwesomeIcon icon={faBars} style={{color: "#000000",}} />
            <Link to={user ? '/account' : '/login'}>
                <FontAwesomeIcon icon={faCircleUser} style={{color: "#7c7d7e"}} size='2x' />
            </Link>
            {user && (
                <p>{user.name}</p>
            )}
            
            </div>
        </header>
    );
}

export default Header;