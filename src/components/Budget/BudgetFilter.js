import React from 'react';

const BudgetFilter = ({filter, startDate, endDate, onFilterChange, onStartDateChange, onEndDateChange}) => (
    <div>
        <label className={"filter-select"}>
            Фильтр:
            <select onChange={(e) => onFilterChange(e.target.value)} value={filter} className="select">
                <option value="all">Все</option>
                <option value="day">Сегодня</option>
                <option value="week">Неделя</option>
                <option value="month">Месяц</option>
                <option value="custom">Диапазон дат</option>
            </select>
        </label>
        {filter === 'custom' && (
            <div className="date-range">
                <label>
                    Начальная дата:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="input"
                    />
                </label>
                <label>
                    Конечная дата:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="input"
                    />
                </label>
            </div>
        )}
    </div>
);

export default BudgetFilter;
