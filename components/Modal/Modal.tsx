import { AiOutlineClose } from 'react-icons/ai'


export const Modal = ({ orderlist, setClose }) => {

    const tableHead = [
        { id: 1, title: 'ID' },
        { id: 1, title: 'Author' },
        { id: 1, title: 'Title' },
        { id: 1, title: 'Description' },
        { id: 1, title: 'Price' },
        { id: 1, title: 'Count' },
        { id: 1, title: 'Summary' },
    ]


    return (
        <div className="modalComp">
            <div className="modalComp__overlay"
                onClick={setClose}
            >
                <AiOutlineClose />
            </div>
            <div className="modalComp__content">
                <table className="light-table dark-table ">
                    <thead>
                        <tr>
                            {tableHead && tableHead.map(head => <td>{head.title}</td>)}
                        </tr>
                    </thead>
                    {orderlist.map(order => (
                        <tbody>
                            <tr>
                                <td>{order._id.slice(0, 6)}</td>
                                <td>{order.author}</td>
                                <td>{order.title}</td>
                                <td>{order.description}</td>
                                <td>{order.price}</td>
                                <td>{order.count} $</td>
                                <td>{order.summary}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}