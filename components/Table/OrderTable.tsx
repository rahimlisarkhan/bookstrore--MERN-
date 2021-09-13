import { useState } from "react"
import { LoadingAdmin } from "../Loading/LoadingAdmin";
import { Modal } from "../Modal/Modal"

export const OrderTable = ({ tableHead, orderlist }) => {

    const [close, setClose] = useState(null)

    console.log(close);

    if (!orderlist) {
        return <LoadingAdmin opacity={true} />
    }

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
                    {tableHead && tableHead.map(head => <td>{head.title}</td>)}
                </tr>
            </thead>
            {orderlist && orderlist.result.data.orders.map(order => (
                <tbody >
                    <tr onClick={() => setClose(order._id)}>
                        <td>{order._id.slice(0, 6)}</td>
                        <td>{order.fullname}</td>
                        <td>{order.user_email}</td>
                        <td>{order.contact_phone}</td>
                        <td>{order.payment}</td>
                        <td>{order.total_summary} $</td>
                        <td>{order.created_order}</td>
                    </tr>

                    {close === order._id && <Modal setClose={() => setClose(null)} orderlist={order.orderlist} />}
                </tbody>
            ))}
        </table>
    )

}