import React, {useState} from 'react';
import ItemStyles from "./expenses-item.module.scss"

const ExpensesItem = ({bg, day, value, height}) => {

    const applyStyles = {
        backgroundColor: bg,
        height: `${height}%`
    }

    return (
       <li className={ItemStyles.item__wrap} style={{height: applyStyles.height}}>
               <div className={ItemStyles.expenses__amount}><span>$</span>{value}</div>
               <div className={ItemStyles.item} style={{backgroundColor: applyStyles.backgroundColor}}></div>
               <div className={ItemStyles.day}>{day}</div>
       </li>
    );
};

export default ExpensesItem;