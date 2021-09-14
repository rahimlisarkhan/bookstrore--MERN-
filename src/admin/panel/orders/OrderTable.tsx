import { useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Alert } from "../../../../components/Alert/Alert";
import { LoadingAdmin } from "../../../../components/Loading/LoadingAdmin";
import { Modal } from "../../../../components/Modal/Modal"
import OrdersProductTable from "./OrdersProductTable";

export const OrderTable = ({ tableHead, orderlist,adminOrList, handleOrderDeleted }) => {

    const [close, setClose] = useState(null)
    const [alertClose, setAlertClose] = useState(null)

    if (!orderlist) {
        return <LoadingAdmin />
    }

    console.log(alertClose);
    
    return (
        <table className="light-table">
            <thead>
                <tr>
                    <td>
                        Total summary:
                    </td>

                    <td>
                        {orderlist && orderlist.result.data.total_summary} $
                    </td>
                </tr>
            </thead>
            <thead>
                <tr>
                    {tableHead && tableHead.map((head, index) => <td key={index}>{head.title}</td>)}
                </tr>
            </thead>
            {adminOrList && adminOrList.map((order, index) => (
                <tbody key={index} className={alertClose === order.id ? "deleteOrderAnimation" : ""}>
                    <tr onClick={() => setClose(order._id)}>
                        <td>{order._id.slice(0, 6)}</td>
                        <td>{order.fullname}</td>
                        <td>{order.user_email}</td>
                        <td>{order.contact_phone}</td>
                        <td>{order.payment}</td>
                        <td>{order.total_summary} $</td>
                        <td>{order.created_order}</td>
                    </tr>

                    <button onClick={() => setAlertClose(order._id)} className='tableDel'>
                        <RiDeleteBin6Line />
                    </button>

                    {/* Delete Order Alert */}

                    {alertClose === order._id && (
                        <Alert id={order._id} setAlertClose={setAlertClose}
                            title="Are you sure you want to delete it?"
                            alertRequest={handleOrderDeleted}
                        />
                    )}
                    {/* Show Order Modal */}
                    {close === order._id && (
                        <Modal setClose={setClose}>
                            <OrdersProductTable orderlist={order.orderlist} />
                        </Modal>
                    )}
                </tbody>
            ))}
        </table>
    )

}