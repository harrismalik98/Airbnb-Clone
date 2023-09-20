const { createContext, useState } = require("react");

export const SearchContext = createContext({
    searchPlace:"",
    setSearchPlace: () => {}
});

const SearchContextProvider = (props) => {
    const [searchPlace, setSearchPlace] = useState("");

    return(
        <SearchContext.Provider value={{searchPlace, setSearchPlace}}>
            {props.children}
        </SearchContext.Provider>
    );

}

export default SearchContextProvider;