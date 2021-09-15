import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { LoadingAdmin } from '../../../components/Loading/LoadingAdmin'
import { getAdminProductsRequest, getAdminUsersRequest } from '../../../services/admin'
import AdminPanelContainer from '../../../src/admin/panel/container/AdminPanelContainer'
import AdminEditContent from '../../../src/admin/panel/edit/AdminEditContent'


const AdminEditPage = () => {


    const [users, setUsers] = useState<any | null>(null)
    const [products, setProduct] = useState<any | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const usersData = await getAdminUsersRequest()
                const productsData = await getAdminProductsRequest()

                setUsers(usersData.data.result.data)
                setProduct(productsData.data.result.data)
            } catch (error) {
                toast.error('Error')
            }

        })()
    }, [])

    if (!users && !products)
        return <LoadingAdmin />

    return (
        <AdminPanelContainer>
            <AdminEditContent users={users} products={products}  />
        </AdminPanelContainer>
    )
}

export default AdminEditPage