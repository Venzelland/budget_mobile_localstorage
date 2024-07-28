import React from 'react';
import {formatAmount} from "./utils";
import {currencySymbols} from "./constants";

const BudgetList = ({ items, onSort, onRemoveItem, sortConfig }) => (
    <div id="budget-list" className="budget-list">
        <div className="budget-item header">
            <span className="item-description" onClick={() => onSort({ key: 'description', direction: sortConfig.direction })}>
                Описание {sortConfig.key === 'description' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </span>
            <span className="header-item" onClick={() => onSort({ key: 'amount', direction: sortConfig.direction })}>
                Сумма {sortConfig.key === 'amount' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </span>
            <span className="header-item" onClick={() => onSort({ key: 'date', direction: sortConfig.direction })}>
                Дата {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </span>
            <button className="hidden-button">Удалить</button>
        </div>
        {items.map((item, index) => (
            <div key={index} className="budget-item">
                <span className="item-description">{item.description}</span>
                <span className="item-amount">{formatAmount(Math.round(item.amount))} {currencySymbols[item.currency]}</span>
                <span className="item-date">{new Date(item.date).toLocaleDateString()}</span>
                <button onClick={() => onRemoveItem(index)} className="button">Удалить</button>
            </div>
        ))}
    </div>
);

export default BudgetList;
