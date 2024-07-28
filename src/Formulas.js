import React, { useState } from 'react';
import styles from './Formulas.module.css';

function Formulas() {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [compoundings, setCompoundings] = useState('');
    const [periodicPayment, setPeriodicPayment] = useState('');
    const [futureValue, setFutureValue] = useState(null);

    const calculateFV = (P, r, n, t, PMT) => {
        const compoundInterest = P * Math.pow(1 + r / n, n * t);
        const annuity = PMT * (Math.pow(1 + r / n, n * t) - 1) / (r / n);
        return compoundInterest + annuity;
    }

    const handleCalculate = () => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const n = parseFloat(compoundings);
        const t = parseFloat(time);
        const PMT = parseFloat(periodicPayment);

        if (!isNaN(P) && !isNaN(r) && !isNaN(n) && !isNaN(t) && !isNaN(PMT)) {
            const FV = calculateFV(P, r, n, t, PMT);
            setFutureValue(FV.toFixed(2));
        } else {
            alert("Пожалуйста, заполните все поля корректно.");
        }
    }

    return (
        <div className={styles.container}>
            <h1>Формулы для расчета инвестиций</h1>
            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Стартовый капитал (P):</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="Введите стартовый капитал"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Годовая процентная ставка (r):</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="Введите процентную ставку"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Срок инвестирования в годах (t):</label>
                    <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="Введите срок инвестирования"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Число начислений в год (n):</label>
                    <input
                        type="number"
                        value={compoundings}
                        onChange={(e) => setCompoundings(e.target.value)}
                        placeholder="Введите число начислений в год"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Периодический взнос (PMT):</label>
                    <input
                        type="number"
                        value={periodicPayment}
                        onChange={(e) => setPeriodicPayment(e.target.value)}
                        placeholder="Введите размер периодического взноса"
                    />
                </div>
                <button onClick={handleCalculate} className={styles.button}>Рассчитать</button>
                {futureValue !== null && (
                    <div className={styles.result}>
                        <h2>Будущая стоимость (FV): {futureValue} руб.</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Formulas;
