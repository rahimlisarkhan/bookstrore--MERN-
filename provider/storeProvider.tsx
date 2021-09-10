import React, { createContext, useState, useContext, useEffect } from 'react'


const storeContext = createContext<any>({})


export const StoreProvider = ({ children }) => {

    //setter
    const [auth, setAuth] = useState(false)


    //getter

    const contextAPI = {
        auth,
        setAuth
    }

    //return context api
    return (
        <storeContext.Provider value={contextAPI}>
            {children}
        </storeContext.Provider>
    )
}

//return store
export const store = () => useContext(storeContext)

