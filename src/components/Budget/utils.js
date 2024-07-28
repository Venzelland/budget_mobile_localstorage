import {exchangeRates} from "./constants";

export const formatAmount = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const calculateTotalAmounts = (items) => {
    const totals = { 'руб': 0, 'дол': 0, 'евро': 0 };

    items.forEach(item => {
        totals[item.currency] += item.amount;
    });

    Object.keys(totals).forEach(currency => {
        if (currency !== 'руб') {
            totals[currency] = totals['руб'] * exchangeRates[currency];
        }
    });

    return totals;
};

export const filterItems = (items, filter, startDate, endDate) => {
    const now = new Date();
    let filteredItems = items;

    switch (filter) {
        case 'day':
            filteredItems = items.filter(item => new Date(item.date).toDateString() === now.toDateString());
            break;
        case 'week':
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            filteredItems = items.filter(item => new Date(item.date) >= startOfWeek && new Date(item.date) <= now);
            break;
        case 'month':
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            filteredItems = items.filter(item => new Date(item.date) >= startOfMonth && new Date(item.date) <= now);
            break;
        case 'custom':
            filteredItems = items.filter(item => new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate));
            break;
        default:
            break;
    }

    return filteredItems;
};

export const sortItems = (items, key, direction) => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
        if (key === 'date') {
            return direction === 'ascending' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        }
        if (key === 'amount') {
            return direction === 'ascending' ? a.amount - b.amount : b.amount - a.amount;
        }
        if (key === 'description') {
            return direction === 'ascending' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
        }
        return 0;
    });
    return sortedItems;
};
