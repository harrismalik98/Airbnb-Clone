import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Layout from './components/Layout';
import Index from './pages/Index';
import Register from './pages/Register';
import axios from 'axios';
import UserContextProvider from './context/UserContext';
import Profile from './pages/Profile';
import Places from './pages/Places';
import AddPlacesForm from './pages/AddPlacesForm';
import PlacePage from './pages/PlacePage';
import Bookings from './pages/Bookings';
import SingleBooking from './pages/SingleBooking';
import { Toaster } from 'react-hot-toast';
import SearchContextProvider from './context/SearchContext';

// axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <SearchContextProvider>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />}/>
            <Route path='/login'                element={<Login />}         />
            <Route path='/register'             element={<Register />}      />
            <Route path="/account"              element={<Profile />}       />
            <Route path="/account/places"       element={<Places/>}         />
            <Route path="/account/places/new"   element={<AddPlacesForm/>}  />
            <Route path="/account/places/:id"   element={<AddPlacesForm/>}  />
            <Route path="/place/:id"            element={<PlacePage/>}      />
            <Route path="/account/bookings"     element={<Bookings/>}       />
            <Route path="/account/bookings/:id" element={<SingleBooking/>}  />
          </Route>

        </Routes>

      </SearchContextProvider>
    </UserContextProvider>
    
  );
}

export default App;
