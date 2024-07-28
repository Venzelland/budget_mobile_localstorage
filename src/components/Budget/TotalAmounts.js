import React from 'react';
import { formatAmount} from './utils';
import {currencySymbols} from "./constants";

const TotalAmounts = ({ totals }) => (
    <div className="total-amount">
        <h2>Итоговые суммы:</h2>
        {Object.keys(totals).map(currency => (
            <div key={currency}>
                {currencySymbols[currency]}: {formatAmount(Math.round(totals[currency]))}
            </div>
        ))}
    </div>
);

export default TotalAmounts;
