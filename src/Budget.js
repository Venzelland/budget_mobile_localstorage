import React, { useState, useEffect } from 'react';

function Budget() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(() => {
        // Устанавливаем дату сегодня по умолчанию
        const today = new Date().toISOString().split('T')[0];
        return today;
    });
    const [budgetItems, setBudgetItems] = useState(() => {
        const savedItems = localStorage.getItem('budgetItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [filter, setFilter] = useState('all'); // all, day, week, month

    useEffect(() => {
        localStorage.setItem('budgetItems', JSON.stringify(budgetItems));
    }, [budgetItems]);

    const handleAddItem = (e) => {
        e.preventDefault();
        if (description && amount) {
            const newItem = {
                description,
                amount: parseFloat(amount),
                date: new Date(date)
            };
            setBudgetItems([...budgetItems, newItem]);
            setDescription('');
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
            default:
                break;
        }

        return filteredItems;
    };

    const filteredItems = filterItems(budgetItems);
    const totalAmount = filteredItems.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div>
            <h1>Бюджетное Приложение</h1>
            <form onSubmit={handleAddItem}>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Сумма"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Добавить</button>
            </form>
            <div>
                <label>
                    Фильтр:
                    <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value="all">Все</option>
                        <option value="day">Сегодня</option>
                        <option value="week">Неделя</option>
                        <option value="month">Месяц</option>
                    </select>
                </label>
            </div>
            <div id="budget-list">
                {filteredItems.map((item, index) => (
                    <div key={index} className="budget-item">
                        <span>{item.description}</span>
                        <span>{item.amount.toFixed(2)} руб.</span>
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                        <button onClick={() => handleRemoveItem(index)}>Удалить</button>
                    </div>
                ))}
            </div>
            <div id="total-amount">Итог: {totalAmount.toFixed(2)} руб.</div>
        </div>
    );
}

export default Budget;
