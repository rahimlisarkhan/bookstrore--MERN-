import { useEffect, useState } from "react"
import { LoadingAdmin } from "../../../components/Loading/LoadingAdmin"
import { AdminOrdersRequest } from "../../../services/admin"
import AdminOrdersContent from "../../../src/admin/panel/orders/AdminOrdersContent"
import AdminPanelContainer from "../../../src/admin/panel/container/AdminPanelContainer"
import { Modal } from "../../../components/Modal/Modal"


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

    useEffect(() => {
        (async () => {
            const { data } = await AdminOrdersRequest()

            setOrders(data)
        })()
    }, [])

    console.log(orders);

    return (
        <AdminPanelContainer>
            {!orders && <LoadingAdmin opacity={true} />}
            <AdminOrdersContent tableList={tableList} orderList={orders} />
        </AdminPanelContainer>
    )
}

export default AdminOrdersPage