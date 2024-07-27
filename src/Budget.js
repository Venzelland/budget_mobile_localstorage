import React, { useState, useEffect } from 'react';

// Список предопределенных категорий трат
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

function Budget() {
    const [category, setCategory] = useState(categories[0]); // Устанавливаем первую категорию по умолчанию
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(() => {
        // Устанавливаем дату сегодня по умолчанию
        const today = new Date().toISOString().split('T')[0];
        return today;
    });
    const [startDate, setStartDate] = useState(() => {
        // Устанавливаем начальную дату фильтра по умолчанию (начало месяца)
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState(() => {
        // Устанавливаем конечную дату фильтра по умолчанию (сегодня)
        const today = new Date().toISOString().split('T')[0];
        return today;
    });
    const [budgetItems, setBudgetItems] = useState(() => {
        const savedItems = localStorage.getItem('budgetItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [filter, setFilter] = useState('custom'); // all, day, week, month, custom

    useEffect(() => {
        localStorage.setItem('budgetItems', JSON.stringify(budgetItems));
    }, [budgetItems]);

    const handleAddItem = (e) => {
        e.preventDefault();
        if (amount) {
            const newItem = {
                description: category,
                amount: parseFloat(amount),
                date: new Date(date)
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

    const filteredItems = filterItems(budgetItems);
    const totalAmount = filteredItems.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div>
            <h1>Бюджетное Приложение</h1>
            <form onSubmit={handleAddItem}>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
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
                        <option value="custom">Диапазон дат</option>
                    </select>
                </label>
            </div>
            {filter === 'custom' && (
                <div>
                    <label>
                        Начальная дата:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Конечная дата:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                </div>
            )}
            <div id="budget-list" className="budget-list">
                {filteredItems.map((item, index) => (
                    <div key={index} className="budget-item">
                        <span className="item-description">{item.description}</span>
                        <span className="item-amount">{item.amount.toFixed(2)} руб.</span>
                        <span className="item-date">{new Date(item.date).toLocaleDateString()}</span>
                        <button onClick={() => handleRemoveItem(index)}>Удалить</button>
                    </div>
                ))}
            </div>
            <div id="total-amount">Итог: {totalAmount.toFixed(2)} руб.</div>
        </div>
    );
}

export default Budget;
