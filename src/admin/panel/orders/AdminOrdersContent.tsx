
import { OrderTable } from "./OrderTable";

type Props = {
    orderList?: any,
    tableList?: any,
    adminOrList?: any,
    handleOrderDeleted: (id: number | string) => void
}

const AdminOrdersContent = ({ tableList, orderList, handleOrderDeleted, adminOrList }: Props) => {

    return (
        <>
        <h1>All order list</h1>

        <OrderTable tableHead={tableList} 
                    handleOrderDeleted={handleOrderDeleted} 
                    adminOrList={adminOrList} 
                    orderlist={orderList} />
        </>
    )
}

export default AdminOrdersContent