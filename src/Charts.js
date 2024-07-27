import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Legend as LineLegend, ResponsiveContainer } from 'recharts';

// Helper function to get the month's days data
const getDaysInMonthData = (data, year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysData = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        amount: 0
    }));

    data.forEach(item => {
        const date = new Date(item.date);
        if (date.getFullYear() === year && date.getMonth() === month) {
            const day = date.getDate() - 1; // Days are 0-indexed
            daysData[day].amount += item.amount;
        }
    });

    return daysData;
};

function Charts() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const data = JSON.parse(localStorage.getItem('budgetItems')) || [];

    // Grouped data for Pie Chart
    const groupedData = data.reduce((acc, item) => {
        const existing = acc.find(i => i.name === item.description);
        if (existing) {
            existing.value += item.amount;
        } else {
            acc.push({ name: item.description, value: item.amount });
        }
        return acc;
    }, []);

    // Data for Line Chart
    const daysData = getDaysInMonthData(data, selectedYear, selectedMonth);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Generate month options for the selector
    const monthOptions = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(0, i);
        return {
            value: i,
            label: date.toLocaleString('default', { month: 'long' })
        };
    });

    // Generate year options for the selector
    const yearOptions = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);

    return (
        <div className="charts-container">
            <h1>Графики по видам трат</h1>



            <div className="chart-wrapper">
                <div className="recharts-wrapper">
                    <PieChart width={410} height={400}>
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
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                    </PieChart>
                </div>
            </div>
            <h2>Траты по дням в месяце</h2>
            {/* Select month and year */}
            <div className="select-container">
                <label>
                    Месяц:
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                        {monthOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Год:
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="chart-wrapper">

                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={daysData}
                        margin={{top: 20, right: 30, left: 20, bottom: 10}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="day"/>
                        <YAxis/>
                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#8884d8"
                            dot={false}
                        />
                        <LineTooltip/>
                        <LineLegend/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Charts;
