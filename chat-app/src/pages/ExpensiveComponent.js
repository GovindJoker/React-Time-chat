import React, {memo, useMemo, useState} from 'react'



const ExpensiveComponent = ({ items, filter }) => {
    // Expensive computation: filtering items based on the filter
    const filteredItems = useMemo(() => {
        console.log('Filtering items...');
        return items.filter(item => item.includes(filter));
    }, [items, filter]); // Recalculate only when items or filter change
    console.log('check')
    return (
        <div>
            <h2>Filtered Items:</h2>
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default memo(ExpensiveComponent)