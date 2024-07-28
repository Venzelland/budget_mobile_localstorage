import React, { useState, useEffect } from 'react';
import styles from './Plans.module.css'; // Импортируйте файл CSS-модуля

const Plans = () => {
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

    const handleDeletePlan = (index) => {
        const newPlans = plans.filter((_, i) => i !== index);
        setPlans(newPlans);
    };

    return (
        <div>
            <h1>Планы покупок</h1>
            <form onSubmit={handleAddPlan} className={styles.form}>
                <input
                    type="text"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    placeholder="План"
                    required
                    className={styles.input}
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Необходимая сумма"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Добавить</button>
            </form>
            <div className={styles.plansList}>
                {plans.map((p, index) => {
                    const progressPercentage = (p.saved / p.amount) * 100;
                    return (
                        <div key={index} className={styles.planItem}>
              <span>
                {p.plan} - {p.amount.toFixed(2)} руб. (Накоплено: {p.saved.toFixed(2)} руб.)
              </span>
                            <div className={styles.progressContainer}>
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <input
                                type="number"
                                value={savedAmount}
                                onChange={(e) => setSavedAmount(e.target.value)}
                                placeholder="Сумма для добавления"
                                className={styles.input}
                            />
                            <button onClick={() => handleSaveAmount(index, savedAmount)} className={styles.button}>Добавить</button>
                            <button onClick={() => handleDeletePlan(index)} className={styles.button}>Удалить</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Plans;
