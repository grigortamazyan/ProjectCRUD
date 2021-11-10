import React from 'react'
import { Card, PageHeader } from 'antd';
import './App.css'

function Analytics() {
    return (
        <div className='App App-header'>
            <PageHeader
                className="site-page-header"
                title="Calculator of Salaries"
            />
            <div style={{ display: 'flex' }}>
                <Card title="Revenues" style={{ width: 300, }}>
                    <p></p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card title="Expences" style={{ width: 300 }}>
                    <p></p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>

        </div>
    )
}

export default Analytics
