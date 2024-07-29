import React from 'react';
import {formatAmount} from "./utils";
import {currencySymbols} from "./constants";

const BudgetList = ({items, onSort, onRemoveItem, sortConfig}) => {
    const handleSort = (key) => {
        const direction = (sortConfig.key === key && sortConfig.direction === 'ascending') ? 'descending' : 'ascending';
        onSort({key, direction});
    };

    return (
        <div id="budget-list" className="budget-list">
            <div className="budget-item header">
                <div className="item-container">
                    <span
                        className="item-description"
                        onClick={() => handleSort('description')}
                    >
                        Описание {sortConfig.key === 'description' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                    </span>
                    <span
                        className="header-item"
                        onClick={() => handleSort('amount')}
                    >
                        Сумма {sortConfig.key === 'amount' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                    </span>
                    <span
                        className="header-item"
                        onClick={() => handleSort('date')}
                    >
                        Дата {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                    </span>
                </div>
                <button className="hidden-button">Удалить</button>
            </div>
            {items.map((item, index) => (
                <div key={index} className="budget-item">

                    <span className="item-description">{item.description}</span>
                    <div className="item-container">
                        <span className="item-amount">
                            {formatAmount(Math.round(item.amount))} {currencySymbols[item.currency]}
                        </span>
                        <span className="item-date">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <button onClick={() => onRemoveItem(index)} className="button">Удалить</button>
                </div>
            ))}
        </div>
    );
};

export default BudgetList;
