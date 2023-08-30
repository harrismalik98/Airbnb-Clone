import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Layout from './components/Layout';
import Index from './pages/Index';
import Register from './pages/Register';
import axios from 'axios';
import UserContextProvider from './context/UserContext';
import Account from './pages/Account';

// axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/account/:subpage?" element={<Account/>} />
          
        </Route>

      </Routes>

      </UserContextProvider>
    
  );
}

export default App;
