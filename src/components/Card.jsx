import React, {useEffect, useLayoutEffect, useState} from 'react';
import cardStyles from './card.module.scss'
import balanceStyles from './balance.module.scss'
import spendingStyles from './spending.module.scss'
import ExpensesItem from "./ExpensesItem"
import totalStyles from "./total.module.scss"
import globalStyles from './global.module.scss'
import logo from "./logo.svg"


const getTotal = (list) => {
   return list.map((el) => {
        return el.amount
    }).reduce((acc, el) => acc + el)
}

const getHeight = (value, maxValue) => {

    if (value === maxValue) {
        return "100"
    }
    return value * 100 / maxValue;
}

const Card = () => {

    const initialState = {
        data: [],

        maxExpenses: null,
        totalAmount: null
    }

    const [expensesData, setExpensesData] = useState(initialState);

    useEffect(() => {
        fetch('/data/data.json')
            .then((res) => res.json())
            .then((data) => {
               setExpensesData({...expensesData, data, totalAmount: getTotal(data)})
            })

    }, []);

    const getMaxValue = () => {
        return Math.max(...expensesData.data.map((el) => el.amount));
    }

    console.log('expensesData', expensesData);

    return (
        <div className={globalStyles.card__wrap}>
            <div className={cardStyles.layout}>
                <div className={balanceStyles.section__balance}>
                    <div>
                        <h1 className={balanceStyles.heading}>My balance</h1>
                        <div className={balanceStyles.amount__wrap}>
                            <div className={balanceStyles.currency}>$</div>
                            <div className={balanceStyles.amount}>921.48</div>
                        </div>
                    </div>
                    <a href="#">
                        <figure className={balanceStyles.logo}>
                            <img src={logo} alt="logo"/>
                        </figure>
                    </a>
                </div>
                <div className={spendingStyles.section__spending}>
                    <div className={spendingStyles.section__spending__inner}>
                        <h1 className={spendingStyles.heading}>Spending - Last <span>7</span>days</h1>
                        <ul className={spendingStyles.expenses__list}>
                            {expensesData.data.map((el) =>
                                <ExpensesItem
                                    bg={el.amount === getMaxValue(el.amount) ? "#B4E0E5" : "#EC755D"}
                                    day={el.day}
                                    value={el.amount}
                                    height={getHeight(el.amount, getMaxValue(el.amount))}
                                />
                            )}
                        </ul>
                    </div>
                </div>
                <div className={totalStyles.section__total}>
                    <h1 className={totalStyles.heading}>Total this month</h1>
                    <div className={totalStyles.total__amount__wrap}>
                       <div className={totalStyles.current__month}>
                           <div className={totalStyles.currency}>$</div>
                           <div className={totalStyles.amount}>{
                               expensesData.totalAmount
                                }</div>
                       </div>
                        <div className={totalStyles.previous__month}>
                            <div className={totalStyles.percent__wrap}>
                                <div className={totalStyles.percent__number}>+2.4</div>
                                <div className={totalStyles.percent}>%</div>
                            </div>
                            <div className={totalStyles.previous__text}>from last month</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;