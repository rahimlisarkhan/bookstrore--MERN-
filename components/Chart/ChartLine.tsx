import { useState } from 'react';
import dynamic from 'next/dynamic';
const LineChart = dynamic(() => import('react-apexcharts'), { ssr: false });



export const ChartLine = ({ total }) => {

    const [donutState, setDonutState] = useState<any>(
        {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: ["Jun", "Aug", "Sep"]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [140, 80, total]
                }
            ]
        }
    )

    return (
        <LineChart
            options={donutState.options}
            series={donutState.series}
            type="line"
            width="500"
            height="320"
            className="ChartClass"

        />
    )
}
