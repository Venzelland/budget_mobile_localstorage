import React, { useState, useEffect } from 'react';
import './Budget.css'; // Импортируем файл CSS

const categories = [
    'Еда',
    'Транспорт',
    'Развлечения',
    'Одежда',
    'Жилье',
    'Медицина',
    'Образование',
    'Связь'
];

const currencySymbols = {
    'руб': '₽',
    'дол': '$',
    'евро': '€'
};
const exchangeRates = {
    'руб': 1,
    'дол': 0.013,
    'евро': 0.012
};

function Budget() {
    const [category, setCategory] = useState(categories[0]);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(() => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    });
    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState(() => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    });
    const [budgetItems, setBudgetItems] = useState(() => {
        const savedItems = localStorage.getItem('budgetItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [filter, setFilter] = useState('custom');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
    const [totalAmounts, setTotalAmounts] = useState({ 'руб': 0, 'дол': 0, 'евро': 0 });

    useEffect(() => {
        localStorage.setItem('budgetItems', JSON.stringify(budgetItems));
        calculateTotalAmounts(budgetItems);
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
            setDate(() => {
                const today = new Date().toISOString().split('T')[0];
                return today;
            });
        }
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

    const formatAmount = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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
        <div className="container">
            <h1>Бюджетное Приложение</h1>
            <form onSubmit={handleAddItem} className="form">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="select"
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Сумма"
                    required
                    className="input"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="input"
                />
                <button type="submit" className="button">Добавить</button>
            </form>
            <div>
                <label>
                    Фильтр:
                    <select onChange={(e) => setFilter(e.target.value)} value={filter} className="select">
                        <option value="all">Все</option>
                        <option value="day">Сегодня</option>
                        <option value="week">Неделя</option>
                        <option value="month">Месяц</option>
                        <option value="custom">Диапазон дат</option>
                    </select>
                </label>
            </div>
            {filter === 'custom' && (
                <div className="date-range">
                    <label>
                        Начальная дата:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="input"
                        />
                    </label>
                    <label>
                        Конечная дата:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="input"
                        />
                    </label>
                </div>
            )}
            <div id="budget-list" className="budget-list">
                <div className="budget-item header">
                    <span className="item-description" onClick={() => handleSort('description')}>
                        Описание {sortConfig.key === 'description' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                    </span>
                    <span className="header-item" onClick={() => handleSort('amount')}>
                        Сумма {sortConfig.key === 'amount' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                    </span>
                    <span className="header-item" onClick={() => handleSort('date')}>
                        Дата {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                    </span>
                    <button className="hidden-button">Удалить</button>
                </div>
                {sortedItems.map((item, index) => (
                    <div key={index} className="budget-item">
                        <span className="item-description">{item.description}</span>
                        <span className="item-amount">{formatAmount(Math.round(item.amount))} {currencySymbols[item.currency]}</span>
                        <span className="item-date">{new Date(item.date).toLocaleDateString()}</span>
                        <button onClick={() => handleRemoveItem(index)} className="button">Удалить</button>
                    </div>
                ))}
            </div>
            <div className="total-amount">
                <h2>Итоговые суммы:</h2>
                {Object.keys(totalAmounts).map(currency => (
                    <div key={currency}>
                        {currencySymbols[currency]}: {formatAmount(Math.round(totalAmounts[currency]))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Budget;
