import React, { useState, useEffect } from 'react';
import styles from './Invest.module.css'; // Импортируйте файл CSS-модуля

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
        <div>
            <h1>Инвестирование</h1>
            <form onSubmit={handleAddInvestment} className={styles.form}>
                <input
                    type="text"
                    value={investmentName}
                    onChange={(e) => setInvestmentName(e.target.value)}
                    placeholder="Название инвестиции"
                    required
                    className={styles.input}
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Количество"
                    required
                    className={styles.input}
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Цена"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Добавить</button>
            </form>
            <div id="investments-list" className={styles.investmentsList}>
                <table className={styles.table}>
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
                                <button
                                    onClick={() => handleDeleteInvestment(index)}
                                    className={styles.tdButton}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <h2 className={styles.totalInvestmentValue}>
                    Общая стоимость всех инвестиций: {totalInvestmentValue.toFixed(2)} руб.
                </h2>
            </div>
        </div>
    );
};

export default Invest;
