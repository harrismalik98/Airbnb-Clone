import axios from "axios";
const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({});

const UserContextProvider = (props) => {
    const[user, setUser] = useState(null);

    useEffect(() => {
        if(!user)
        {
            const token = localStorage.getItem("airbnb-token");

            if(token)
            {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                axios.get("/profile")
                .then((response) => {
                    const data = response.data;
                    setUser(data.userData);
                });
            }
            else
            {
                axios.defaults.headers.common['Authorization'] = null;
            }
        }
    }, [user]);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;