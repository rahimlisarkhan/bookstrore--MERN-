import { useEffect, useState } from "react"
import { ChartColumn } from "../../../components/Chart/ChartColumn"
import { ChartLine } from "../../../components/Chart/ChartLine"
import { ChartDonut } from "../../../components/Chart/ChatDonut"


type Props = {
    orders: {
        total_summary: string;
        orders: object[]
    },
    users: {
        users: object[]
    },
    products: object[]
}

const AdminPanelContent = ({ orders, users, products }: Props) => {

    return (
        <div className="chart-content">
            <ChartColumn
                productCount={products && products.length}
                userCount={users && users.users.length}
                orderCount={orders && orders.orders.length}
            />
            <ChartDonut
                productCount={products && products.length}
                userCount={users && users.users.length}
                orderCount={orders && orders.orders.length} />
            <ChartLine total={orders && orders.total_summary} />
        </div>
    )


}

export default AdminPanelContent