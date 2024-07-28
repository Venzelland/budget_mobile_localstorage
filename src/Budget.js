import React, { useState, useEffect } from 'react';
import BudgetForm from './BudgetForm';
import BudgetFilter from './BudgetFilter';
import BudgetList from './BudgetList';
import TotalAmount from './TotalAmount';
import styles from './Budget.module.css';

const exchangeRates = {
    'руб': 1,
    'дол': 0.013,
    'евро': 0.012
};

function Budget() {
    const [budgetItems, setBudgetItems] = useState(() => {
        const savedItems = localStorage.getItem('budgetItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [filter, setFilter] = useState('custom');
    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState(() => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    });
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
    const [totalAmounts, setTotalAmounts] = useState({ 'руб': 0, 'дол': 0, 'евро': 0 });

    useEffect(() => {
        localStorage.setItem('budgetItems', JSON.stringify(budgetItems));
        calculateTotalAmounts(budgetItems);
    }, [budgetItems]);

    const handleAddItem = (newItem) => {
        setBudgetItems([...budgetItems, newItem]);
    };

    const handleRemoveItem = (index) => {
        const newBudgetItems = budgetItems.filter((_, i) => i !== index);
        setBudgetItems(newBudgetItems);
    };

    const filterItems = (items) => {
        const now = new Date();
        let filteredItems = items;

        switch (filter) {
            case 'day':
                filteredItems = items.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate.toDateString() === now.toDateString();
                });
                break;
            case 'week':
                const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                filteredItems = items.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= startOfWeek && itemDate <= now;
                });
                break;
            case 'month':
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                filteredItems = items.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= startOfMonth && itemDate <= now;
                });
                break;
            case 'custom':
                filteredItems = items.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
                });
                break;
            default:
                break;
        }

        return filteredItems;
    };

    const sortItems = (items, key, direction) => {
        const sortedItems = [...items];
        sortedItems.sort((a, b) => {
            if (key === 'date') {
                return direction === 'ascending'
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }
            if (key === 'amount') {
                return direction === 'ascending'
                    ? a.amount - b.amount
                    : b.amount - a.amount;
            }
            if (key === 'description') {
                return direction === 'ascending'
                    ? a.description.localeCompare(b.description)
                    : b.description.localeCompare(a.description);
            }
            return 0;
        });
        return sortedItems;
    };

    const handleSort = (key) => {
        const direction = (sortConfig.key === key && sortConfig.direction === 'ascending') ? 'descending' : 'ascending';
        setSortConfig({ key, direction });
    };

    const calculateTotalAmounts = (items) => {
        const totals = { 'руб': 0, 'дол': 0, 'евро': 0 };

        items.forEach(item => {
            totals[item.currency] += item.amount;
        });

        Object.keys(totals).forEach(currency => {
            if (currency !== 'руб') {
                totals[currency] = totals['руб'] * exchangeRates[currency];
            }
        });

        setTotalAmounts(totals);
    };

    const filteredItems = filterItems(budgetItems);
    const sortedItems = sortItems(filteredItems, sortConfig.key, sortConfig.direction);

    return (
        <div>
            <h1>Бюджетное Приложение</h1>
            <BudgetForm onAddItem={handleAddItem} />
            <BudgetFilter filter={filter} setFilter={setFilter} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            <BudgetList items={sortedItems} onRemove={handleRemoveItem} onSort={handleSort} sortConfig={sortConfig} />
            <TotalAmount totalAmounts={totalAmounts} />
        </div>
    );
}

export default Budget;
