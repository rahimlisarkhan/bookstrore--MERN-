import { useRouter } from 'next/dist/client/router'
import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { getAdminUser } from '../utils/const-util'


const storeContext = createContext<any>({})


export const StoreProvider = ({ children }) => {

    const { push, back, asPath } = useRouter()

    //setter
    const [auth, setAuth] = useState(null)
    const [adminUser, setAdminUser] = useState(null)

    useEffect(() => {
        adminUserLoad()
    }, [])


    //handleFunctions
    const adminUserLoad = async () => {
        const userCookie = getAdminUser()
        if (userCookie && asPath.includes('/admin')) {
            const adminUserInfo = await JSON.parse(userCookie)

            setAdminUser(adminUserInfo)
            asPath === "/admin" && push('/admin/panel')
        }
        if (!userCookie && asPath.includes('/admin')) {
            push('/admin')
        }
    }

    const adminLogout = () => {
        setAdminUser(null)
        push('/admin')
        Cookies.remove('admin-session')
    }

    const adminLogin = async (data) => {
        setAdminUser(data)
        Cookies.set('admin-session', JSON.stringify(data))
    }


    //Props
    const contextAPI = {
        auth,
        setAuth,
        setAdminUser,
        adminUser,
        adminLogout,
        adminLogin
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

