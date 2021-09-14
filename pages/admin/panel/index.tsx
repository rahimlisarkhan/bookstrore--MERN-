import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { LoadingAdmin } from '../../../components/Loading/LoadingAdmin'
import { getAdminOrdersRequest, getAdminProductsRequest, getAdminUsersRequest } from '../../../services/admin'

import dynamic from 'next/dynamic';
const AdminPanelContent = dynamic(() => import('../../../src/admin/panel/AdminPanelContent'));
const AdminPanelContainer = dynamic(() => import('../../../src/admin/panel/container/AdminPanelContainer'));



const AdminPanelPage = () => {
    const [orders, setOrders] = useState<any | null>(null)
    const [users, setUsers] = useState<any | null>(null)
    const [products, setProduct] = useState<any | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const ordersData = await getAdminOrdersRequest()
                const usersData = await getAdminUsersRequest()

                const productsData = await getAdminProductsRequest()
                setOrders(ordersData.data.result.data)
                setUsers(usersData.data.result.data)
                setProduct(productsData.data.result.data)
            } catch (error) {
                toast.error('Error')
            }

        })()
    }, [])

    if (!users && !orders && !products)
        return <LoadingAdmin />

    return (
        <AdminPanelContainer>
            <AdminPanelContent orders={orders} users={users} products={products} />
        </AdminPanelContainer>
    )
}

export default AdminPanelPage