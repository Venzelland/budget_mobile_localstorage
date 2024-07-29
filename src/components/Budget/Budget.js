import React, { useState, useEffect } from 'react';
import './Budget.css';
import { calculateTotalAmounts, filterItems, sortItems } from './utils';
import BudgetForm from './BudgetForm';
import BudgetFilter from './BudgetFilter';
import BudgetList from './BudgetList';
import TotalAmounts from './TotalAmounts';
import { categories } from "./constants";

function Budget() {
    const [category, setCategory] = useState(categories[0]);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [budgetItems, setBudgetItems] = useState(() => {
        const savedItems = localStorage.getItem('budgetItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [filter, setFilter] = useState('custom');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
    const [totalAmounts, setTotalAmounts] = useState({ 'руб': 0, 'дол': 0, 'евро': 0 });

    useEffect(() => {
        localStorage.setItem('budgetItems', JSON.stringify(budgetItems));
        setTotalAmounts(calculateTotalAmounts(budgetItems));
    }, [budgetItems]);

    const handleAddItem = (e) => {
        e.preventDefault();
        if (amount) {
            const newItem = {
                description: category,
                amount: parseFloat(amount),
                date: new Date(date),
                currency: 'руб'
            };
            setBudgetItems([...budgetItems, newItem]);
            setAmount('');
            setDate(new Date().toISOString().split('T')[0]);
        }
    };

    const handleRemoveItem = (index) => {
        setBudgetItems(budgetItems.filter((_, i) => i !== index));
    };

    const filteredItems = filterItems(budgetItems, filter, startDate, endDate);
    const sortedItems = sortItems(filteredItems, sortConfig.key, sortConfig.direction);

    const handleSort = ({ key, direction }) => {
        setSortConfig({ key, direction });
    };

    return (
        <div className="container">
            <h1>Бюджетное Приложение</h1>
            <BudgetForm
                category={category}
                amount={amount}
                date={date}
                onCategoryChange={setCategory}
                onAmountChange={setAmount}
                onDateChange={setDate}
                onSubmit={handleAddItem}
            />
            <BudgetFilter
                filter={filter}
                startDate={startDate}
                endDate={endDate}
                onFilterChange={setFilter}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />
            <BudgetList
                items={sortedItems}
                onSort={handleSort}
                onRemoveItem={handleRemoveItem}
                sortConfig={sortConfig}
            />
            <TotalAmounts totals={totalAmounts} />
        </div>
    );
}

export default Budget;
