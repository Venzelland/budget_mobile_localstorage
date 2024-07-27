import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function Charts() {
    const data = JSON.parse(localStorage.getItem('budgetItems')) || [];

    const groupedData = data.reduce((acc, item) => {
        const existing = acc.find(i => i.name === item.description);
        if (existing) {
            existing.value += item.amount;
        } else {
            acc.push({ name: item.description, value: item.amount });
        }
        return acc;
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h1>Графики по видам трат</h1>
            <PieChart width={400} height={400}>
                <Pie
                    data={groupedData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                >
                    {groupedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}

export default Charts;
