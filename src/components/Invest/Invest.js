import React, { useState, useEffect } from 'react';
import '../../styles.css'; // Импортируйте общий файл CSS

const Invest = () => {
    const [investmentName, setInvestmentName] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [price, setPrice] = useState('');
    const [investments, setInvestments] = useState(() => {
        const savedInvestments = localStorage.getItem('investments');
        return savedInvestments ? JSON.parse(savedInvestments) : [];
    });

    useEffect(() => {
        localStorage.setItem('investments', JSON.stringify(investments));
    }, [investments]);

    const handleAddInvestment = (e) => {
        e.preventDefault();
        if (investmentName && quantity && price) {
            const newInvestment = {
                name: investmentName,
                quantity: parseFloat(quantity),
                price: parseFloat(price)
            };
            setInvestments([...investments, newInvestment]);
            setInvestmentName('');
            setQuantity('1');
            setPrice('');
        }
    };

    const handleDeleteInvestment = (index) => {
        const newInvestments = investments.filter((_, i) => i !== index);
        setInvestments(newInvestments);
    };

    const totalInvestmentValue = investments.reduce((total, investment) => {
        return total + (investment.quantity * investment.price);
    }, 0);

    return (
        <div className="container">
            <h2>Инвестирование</h2>
            <form onSubmit={handleAddInvestment}>
                <input
                    type="text"
                    value={investmentName}
                    onChange={(e) => setInvestmentName(e.target.value)}
                    placeholder="Название инвестиции"
                    required
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Количество"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Цена"
                    required
                />
                <button type="submit">Добавить</button>
            </form>
            <div id="investments-list" className="investments-list">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Общая стоимость</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {investments.map((investment, index) => (
                        <tr key={index}>
                            <td>{investment.name}</td>
                            <td>{investment.quantity}</td>
                            <td>{investment.price.toFixed(2)} руб.</td>
                            <td>{(investment.quantity * investment.price).toFixed(2)} руб.</td>
                            <td>
                                <button onClick={() => handleDeleteInvestment(index)}>
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <h2 className="total-investment-value">
                    Общая стоимость всех инвестиций: {totalInvestmentValue.toFixed(2)} руб.
                </h2>
            </div>
        </div>
    );
};

export default Invest;
