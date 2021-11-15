import React from 'react'
import { Card, PageHeader } from 'antd';
import './App.css'

function Analytics({ revenue, salaryData }) {

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
    console.log(salaryInDollars)

    const total = salaryInDollars.reduce(function (previousValue, currentValue) { return previousValue + currentValue }, 0);
    return (
        <div className='App App-header'>
            <PageHeader
                className="site-page-header"
                title="Company Finances"
            />
            <div style={{ display: 'flex' }}>
                <Card title="Revenues" style={{ width: 300, }}>

                    <p>{`Revenues: ${revenue}`}</p>
                    <p>{`Net Income: ${revenue - total}`}</p>
                </Card>
                <Card title="Expences" style={{ width: 300 }}>
                    <p>{`total expansis are: ${total} USD`}</p>

                </Card>
            </div>

        </div>
    )
}

export default Analytics
