import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { LoadingAdmin } from '../../../components/Loading/LoadingAdmin'
import { store } from '../../../provider/storeProvider'
import AdminPanelContent from '../../../src/admin/panel/AdminPanelContent'
import AdminPanelContainer from '../../../src/admin/panel/container/AdminPanelContainer'
import { getAdminUser } from '../../../utils/const-util'
import { ROUTER } from '../../../utils/router-util'


const AdminPanelPage = () => {
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
            <AdminPanelContainer>
                <AdminPanelContent />
            </AdminPanelContainer>
        </>
    )
}

export default AdminPanelPage