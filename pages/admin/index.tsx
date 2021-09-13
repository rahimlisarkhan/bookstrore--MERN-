import React, { useEffect, useState } from 'react'
import { LoadingAdmin } from '../../components/Loading/LoadingAdmin'
import AdminLogin from '../../src/admin/login/AdminLogin'

const AdminPage = () => {

    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)

    }, [])


    return (
        <>
            {loading && <LoadingAdmin opacity={true} />}
            < AdminLogin />
        </>
    )
}

export default AdminPage