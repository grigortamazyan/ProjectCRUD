import React from 'react'
import { Card, PageHeader } from 'antd';
import './App.css'

function Analytics({ salaryData, orderData }) {

    const salaryInDollars = salaryData.map((el) => {
        if (el.currency === 'EUR') {
            return Math.floor(el.salary * 1.15)
        }
        if (el.currency === 'AMD') {
            return Math.floor(el.salary * 0.0021)
        }
        if (el.currency === 'AUD') {
            return Math.floor(el.salary * 0.73)
        }
        else if (el.currency === 'CAD') {
            return Math.floor(el.salary * 0.80)
        }
        return el.salary
    })

    const totalExpensies = salaryInDollars.reduce(function (previousValue, currentValue) { return previousValue + currentValue }, 0);

    const ordersInDollars = orderData.map((el) => {
        if (el.currency === 'EUR') {
            return { quantity: el.quantity, price: Math.floor(el.price * 1.15) }
        }
        if (el.currency === 'AMD') {
            return { quantity: el.quantity, price: Math.floor(el.price * 0.0021) }
        }
        if (el.currency === 'AUD') {
            return { quantity: el.quantity, price: Math.floor(el.price * 0.73) }
        }
        else if (el.currency === 'CAD') {
            return { quantity: el.quantity, price: Math.floor(el.price * 0.80) }
        }
        return { quantity: el.quantity, price: el.price }
    })

    const totalRevenues = ordersInDollars.reduce(function (previousValue, currentValue) { return previousValue + currentValue.price * currentValue.quantity }, 0);


    return (
        <div className='App App-header'>
            <PageHeader
                className="site-page-header"
                title="Company Finances"
            />
            <div style={{ display: 'flex' }}>
                <Card title="Revenues" style={{ width: 300, }}>

                    <p>{`Revenues: ${totalRevenues}`}</p>
                    <p>{`Net Income: ${totalRevenues - totalExpensies}`}</p>
                </Card>
                <Card title="Expences" style={{ width: 300 }}>
                    <p>{`total expansis are: ${totalExpensies} USD`}</p>

                </Card>
            </div>

        </div>
    )
}

export default Analytics
