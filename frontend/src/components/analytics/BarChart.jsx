import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
} from 'recharts';

function BarChartContainer(props) {
    return (
        <ResponsiveContainer
            width={1200}
            height={500}
            style={{ margin: 'auto' }}
            debounce={1}
        >
            <BarChart
                data={props.data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 30,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id">
                    <Label
                        value="Published Year"
                        offset={10}
                        position="bottom"
                    />
                </XAxis>
                <YAxis>
                    <Label
                        value="No. of books"
                        angle={-90}
                        offset={10}
                        position="left"
                    />
                </YAxis>
                <Tooltip />
                <Bar dataKey="count" fill="#3489ca" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartContainer;
