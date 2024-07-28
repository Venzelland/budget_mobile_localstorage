import React from 'react';
import {categories} from "./constants";

const BudgetForm = ({ category, amount, date, onCategoryChange, onAmountChange, onDateChange, onSubmit }) => (
    <form onSubmit={onSubmit} className="form">
        <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
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
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Сумма"
            required
            className="input"
        />
        <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            required
            className="input"
        />
        <button type="submit" className="button">Добавить</button>
    </form>
);

export default BudgetForm;
