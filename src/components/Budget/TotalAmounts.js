import React from 'react';
import { formatAmount} from './utils';
import {currencySymbols} from "./constants";

const TotalAmounts = ({ totals }) => (
    <div className="total-amount">
        <h2>Итоговые суммы:</h2>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around' }} >
            {Object.keys(totals).map(currency => (
                <div key={currency} style={{ display: 'flex'}}>
                    {currencySymbols[currency]}: {formatAmount(Math.round(totals[currency]))}
                </div>
            ))}
        </div>
    </div>
);

export default TotalAmounts;
