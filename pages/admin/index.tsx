import React, { useEffect, useState } from 'react'
import { LoadingAdmin } from '../../components/Loading/LoadingAdmin'


import dynamic from 'next/dynamic';
const AdminLogin = dynamic(() => import('../../src/admin/login/AdminLogin'),{ loading: () => <LoadingAdmin /> });


const AdminPage = () => {

    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [loading])

    if (loading) {
        return <LoadingAdmin />
    }

    return (
        < AdminLogin />
    )
}

export default AdminPage