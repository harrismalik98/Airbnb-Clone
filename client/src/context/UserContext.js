import axios from "axios";
const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({});

const UserContextProvider = (props) => {
    const[user, setUser] = useState(null);

    useEffect(() => {
        if(!user)
        {
            axios.get("/profile")
            .then((response) => {
                const data = response.data;
                setUser(data);
            });
        }
    }, [user]);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;