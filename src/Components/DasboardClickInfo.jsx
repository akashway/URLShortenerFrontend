import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LabelList } from 'recharts';

const DasboardClickInfo = (props) => {

    let chartDataDayWise = 0
    let chartDataDeviceWise = 0

    if (props.totalClicks.length > 0) {
        chartDataDayWise = props.dayWiseClicks.map(entry => ({
            date: entry._id,
            clicks: entry.count,
            percentage: ((entry.count / props.totalClicks[0].total) * 100)
        }))

        chartDataDeviceWise = props.deviceWiseClicks.map(entry => ({
            device: entry._id,
            clicks: entry.count,
            percentage: ((entry.count / props.totalClicks[0].total) * 100)
        }))
    }


    return (
        <div>
            <h1>Total Clicks {props.totalClicks.length > 0 ? props.totalClicks[0].total : "0"}</h1>

            <div style={{display:"flex"}}>
                <BarChart
                    layout="vertical"
                    width={600}
                    height={300}
                    data={chartDataDayWise}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <YAxis type="category" dataKey="date" axisLine={false} />
                    <XAxis type="number" domain={[0, 'auto']} hide={true} />
                    <Tooltip />
                    <Bar dataKey="clicks">
                        {props.dayWiseClicks.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="#8884d8" />
                        ))}
                        <LabelList dataKey="clicks" position="right" />
                    </Bar>
                </BarChart>

                <BarChart
                    layout="vertical"
                    width={600}
                    height={300}
                    data={chartDataDeviceWise}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <YAxis type="category" dataKey="device" axisLine={false} />
                    <XAxis type="number" domain={[0, 'auto']} hide={true} />
                    <Tooltip />
                    <Bar dataKey="clicks">
                        {props.deviceWiseClicks.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="#8884d8" />
                        ))}
                        <LabelList dataKey="clicks" position="right" />
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

export default DasboardClickInfo
