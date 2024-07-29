import React, { useState } from 'react';
import styles from './Formulas.module.css';

function Formulas() {
    const [goal, setGoal] = useState('');
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [reinvest, setReinvest] = useState('yearly');
    const [periodicPayment, setPeriodicPayment] = useState('');
    const [paymentFrequency, setPaymentFrequency] = useState('monthly');
    const [years, setYears] = useState(null);
    const [detailedTime, setDetailedTime] = useState(null);

    const calculateYears = (FV, P, r, n, PMT) => {
        const ratePerPeriod = r / n;
        const totalPeriods = Math.log((FV * ratePerPeriod + PMT) / (P * ratePerPeriod + PMT)) / Math.log(1 + ratePerPeriod);
        return totalPeriods / n;
    };

    const handleCalculate = () => {
        const FV = parseFloat(goal);
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const n = reinvest === 'yearly' ? 1 : 12;
        const PMT = parseFloat(periodicPayment);
        const periodsPerYear = paymentFrequency === 'monthly' ? 12 : 1;

        if (!isNaN(FV) && !isNaN(P) && !isNaN(r) && !isNaN(n) && !isNaN(PMT)) {
            const totalYears = calculateYears(FV, P, r, n * periodsPerYear, PMT);
            setYears(totalYears.toFixed(2));
            const detailedTime = convertToYearsMonthsDays(totalYears);
            setDetailedTime(detailedTime);
        } else {
            alert("Пожалуйста, заполните все поля корректно.");
        }
    };

    const convertToYearsMonthsDays = (totalYears) => {
        const years = Math.floor(totalYears);
        const remainingMonths = (totalYears - years) * 12;
        const months = Math.floor(remainingMonths);
        const remainingDays = (remainingMonths - months) * 30.44;
        const days = Math.floor(remainingDays);

        return { years, months, days };
    };

    const getCorrectForm = (value, forms) => {
        const lastDigit = value % 10;
        const lastTwoDigits = value % 100;

        if (lastTwoDigits > 10 && lastTwoDigits < 20) {
            return forms[2];
        }
        if (lastDigit > 1 && lastDigit < 5) {
            return forms[1];
        }
        if (lastDigit === 1) {
            return forms[0];
        }
        return forms[2];
    };

    return (
        <div className={styles.container}>
            <h1>Срок достижения цели</h1>
            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Ваша цель:</label>
                    <input
                        type="number"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="Введите сумму цели"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Стартовый капитал:</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="Введите стартовый капитал"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Ставка (% годовых):</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="Введите процентную ставку"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Реинвестировать доход:</label>
                    <select value={reinvest} onChange={(e) => setReinvest(e.target.value)}>
                        <option value="yearly">Раз в год</option>
                        <option value="monthly">Ежемесячно</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Дополнительные вложения:</label>
                    <input
                        type="number"
                        value={periodicPayment}
                        onChange={(e) => setPeriodicPayment(e.target.value)}
                        placeholder="Введите размер вложений"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Периодичность вложений:</label>
                    <select value={paymentFrequency} onChange={(e) => setPaymentFrequency(e.target.value)}>
                        <option value="monthly">Раз в месяц</option>
                        <option value="yearly">Раз в год</option>
                    </select>
                </div>
                <button onClick={handleCalculate} className={styles.button}>Рассчитать</button>
                {years !== null && detailedTime !== null && (
                    <div className={styles.result}>
                        <h2>Срок достижения цели: {Math.round(years)} {getCorrectForm(Math.round(years), ['год', 'года', 'лет'])}</h2>
                        <h2>Точная дата: {detailedTime.years} {getCorrectForm(detailedTime.years, ['год', 'года', 'лет'])}, {detailedTime.months} {getCorrectForm(detailedTime.months, ['месяц', 'месяца', 'месяцев'])} и {detailedTime.days} {getCorrectForm(detailedTime.days, ['день', 'дня', 'дней'])}</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Formulas;
