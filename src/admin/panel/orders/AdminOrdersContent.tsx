
import { OrderTable } from "../../../../components/Table/OrderTable";


type Props = {
    orderList?: any,
    tableList?: any,
}

const AdminOrdersContent = ({ tableList, orderList }: Props) => {

    console.log(orderList);


    return (
            <OrderTable tableHead={tableList} orderlist={orderList} />
    )
}

export default AdminOrdersContent