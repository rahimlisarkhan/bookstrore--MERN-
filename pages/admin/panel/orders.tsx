import { useEffect, useState } from "react"
import { LoadingAdmin } from "../../../components/Loading/LoadingAdmin"
import { getAdminOrdersRequest, removeAdminOrdersRequest } from "../../../services/admin"
import AdminPanelContainer from "../../../src/admin/panel/container/AdminPanelContainer"
import dynamic from 'next/dynamic';
import { toast } from "react-toastify";
const AdminOrdersContent = dynamic(() => import('../../../src/admin/panel/orders/AdminOrdersContent'));

const AdminOrdersPage = () => {

    const tableList = [
        { id: 1, title: 'ID' },
        { id: 2, title: 'Customer' },
        { id: 3, title: 'Email' },
        { id: 4, title: 'Phone' },
        { id: 5, title: 'Payment' },
        { id: 6, title: 'Summary' },
        { id: 7, title: 'Created' },
    ]

    const [orders, setOrders] = useState<any | null>(null)
    const [adminOrderList, setOrderList] = useState<any | null>(null)


    console.log(orders);


    useEffect(() => {
        (async () => {
            const { data } = await getAdminOrdersRequest()
            setOrderList(data.result.data.orders)
            setOrders(data)
        })()
    }, [])

    const handleOrderDeleted = async (id: number | string) => {

        try {
            const { status, data: { messages } } = await removeAdminOrdersRequest(id)
            if (status === 200) {
                let newData = adminOrderList.filter(order => order._id !== id)

                setOrderList(newData)
                toast.success(messages)

            }

        } catch (err) {
            toast.error('Server Error')
        }
    }


    if (!orders)
        return <LoadingAdmin />

    return (
        <AdminPanelContainer>
            {!orders && <LoadingAdmin />}
            <AdminOrdersContent tableList={tableList} orderList={orders} adminOrList={adminOrderList} handleOrderDeleted={handleOrderDeleted} />
        </AdminPanelContainer>
    )
}

export default AdminOrdersPage