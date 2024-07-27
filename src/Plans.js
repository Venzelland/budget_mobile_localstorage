import React, { useState, useEffect } from 'react';
import './App.css'; // Импортируйте файл стилей, если используете внешний CSS файл

function Plans() {
    const [plan, setPlan] = useState('');
    const [amount, setAmount] = useState('');
    const [savedAmount, setSavedAmount] = useState('');
    const [plans, setPlans] = useState(() => {
        const savedPlans = localStorage.getItem('plans');
        return savedPlans ? JSON.parse(savedPlans) : [];
    });

    useEffect(() => {
        localStorage.setItem('plans', JSON.stringify(plans));
    }, [plans]);

    const handleAddPlan = (e) => {
        e.preventDefault();
        if (plan && amount) {
            const newPlan = { plan, amount: parseFloat(amount), saved: parseFloat(savedAmount) || 0 };
            setPlans([...plans, newPlan]);
            setPlan('');
            setAmount('');
            setSavedAmount('');
        }
    };

    const handleSaveAmount = (index, amount) => {
        const newPlans = plans.map((p, i) => {
            if (i === index) {
                return { ...p, saved: p.saved + parseFloat(amount) };
            }
            return p;
        });
        setPlans(newPlans);
    };

    return (
        <div>
            <h1>Планы покупок</h1>
            <form onSubmit={handleAddPlan}>
                <input
                    type="text"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    placeholder="План"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Необходимая сумма"
                    required
                />
                <button type="submit">Добавить</button>
            </form>
            <div id="plans-list">
                {plans.map((p, index) => {
                    const progressPercentage = (p.saved / p.amount) * 100;
                    return (
                        <div key={index} className="plan-item">
                            <span>
                                {p.plan} - {p.amount.toFixed(2)} руб. (Накоплено: {p.saved.toFixed(2)} руб.)
                            </span>
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <input
                                type="number"
                                value={savedAmount}
                                onChange={(e) => setSavedAmount(e.target.value)}
                                placeholder="Сумма для добавления"
                            />
                            <button onClick={() => handleSaveAmount(index, savedAmount)}>Добавить</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Plans;
