import { useState } from 'react';
import dynamic from 'next/dynamic';
const Donut = dynamic(() => import('react-apexcharts'), { ssr: false });

type Props = {
    productCount: number,
    orderCount: number,
    userCount: number,
}

export const ChartDonut = ({ userCount, orderCount, productCount }: Props) => {

    const [donutState, setDonutState] = useState<any>(
        {
            options: {},
            series: [productCount, orderCount, userCount],
            labels: ['PRODUCT', 'ORDER', 'USER']
        }
    )

    return (
        <Donut
            options={donutState.options}
            series={donutState.series}
            labels={donutState.labels}
            type="donut"
            width="450"
            height="300"
            className="ChartClass"

        />
    )
}
