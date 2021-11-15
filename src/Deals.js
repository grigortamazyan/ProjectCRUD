import 'antd/dist/antd.css'
import './App.css';
import { Table, Button, Modal, Input } from 'antd'
import { useState, useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { generateId } from './helpers';
import { PageHeader, Select } from 'antd';

function Deals({ parentCallback }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [creatingOrder, setCreatingOrder] = useState(null)
    const [editingOrder, setEditingOrder] = useState(null)
    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            name: 'Epam Systems',
            email: 'order@epam.com',
            address: '123 Street, NYC',
            price: 5000,
            currency: 'USD',
            quantity: 12
        },
        {
            id: 2,
            name: 'Google LLC',
            email: 'order@google.com',
            address: '123 Street, San Francisco',
            price: 4000,
            currency: 'EUR',
            quantity: 8
        },
        {
            id: 3,
            name: 'Facebook LLC',
            email: 'order@fb.com',
            address: '852 Street, Boston',
            price: 3000,
            currency: 'CAD',
            quantity: 2
        },
        {
            id: 4,
            name: 'Picsart LLC',
            email: 'order@airbus.com',
            address: '123 Street, Toronto',
            price: 600000,
            currency: 'AMD',
            quantity: 6
        }
    ])
    const { Option } = Select;
    const columns = [
        {
            key: '2',
            title: 'Name',
            dataIndex: 'name'
        },
        {
            key: '3',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: '4',
            title: 'Address',
            dataIndex: 'address'
        },
        {
            key: '5',
            title: 'Price',
            dataIndex: 'price'
        },
        {
            key: '6',
            title: 'Currency',
            dataIndex: 'currency'
        },
        {
            key: '7',
            title: 'Quantity',
            dataIndex: 'quantity'
        },
        {
            key: '8',
            title: 'Actions',
            render: (record) => {
                return <>
                    <EditOutlined onClick={() => {
                        onEditEmployee(record)
                    }} />
                    <DeleteOutlined onClick={() => {
                        onDeleteEmployee(record)
                    }} style={{ color: "red", marginLeft: 12 }} />
                </>
            }
        }
    ]

    const ordersInDollars = dataSource.map((el) => {
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

    const total = ordersInDollars.reduce(function (previousValue, currentValue) { return previousValue + currentValue.price * currentValue.quantity }, 0);
    //console.log(total);

    useEffect(() => {
        parentCallback(total);
    }, [total])

    function onAddEmployee() {
        const id = generateId();
        setDataSource(prev => [{ ...creatingOrder, id }].concat(prev));
        console.log(dataSource);
        resetCreating();
    }
    const onDeleteEmployee = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this order?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                setDataSource(pre => {
                    return pre.filter(employee => employee.id !== record.id)
                })
            }
        })

    }
    const onCreateEmployee = () => {
        setIsCreating(true);
        setCreatingOrder({})
    }

    const onEditEmployee = (record) => {
        setIsEditing(true);
        setEditingOrder({ ...record })
    }
    const resetEditing = () => {
        setIsEditing(false);
        setEditingOrder(null)
    }
    const resetCreating = () => {
        setIsCreating(false);
        setCreatingOrder(null)
    }
    const handleSubmit = () => {
        setDataSource(pre => pre.map(employee => employee.id === editingOrder.id ? editingOrder : employee))
        resetEditing()
    }
    return (
        <div className="App">
            <header className="App-header">
                <PageHeader
                    className="site-page-header"
                    title="Database of Orders"
                />
                <Button onClick={onCreateEmployee} style={{ marginBottom: 5 }}>Add an order</Button>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                ></Table>
                <Modal
                    title='Add Order'
                    okText='Save'
                    visible={isCreating}
                    onCancel={resetCreating}
                    onOk={onAddEmployee}
                >
                    <Input placeholder={'Company Name'} value={creatingOrder?.name} onChange={e => setCreatingOrder({ ...creatingOrder, name: e.target.value })} />
                    <Input placeholder={'Email'} value={creatingOrder?.email} onChange={e => setCreatingOrder({ ...creatingOrder, email: e.target.value })} />
                    <Input placeholder={'Address'} value={creatingOrder?.address} onChange={e => setCreatingOrder({ ...creatingOrder, address: e.target.value })} />
                    <Input placeholder={'Price'} value={creatingOrder?.price} onChange={e => setCreatingOrder({ ...creatingOrder, price: parseInt(e.target.value) })} />
                    <Select style={{ display: 'block' }} placeholder='Select currency' value={creatingOrder?.currency} onChange={value => setCreatingOrder({ ...creatingOrder, currency: value })} >
                        <Option value="USD">USD</Option>
                        <Option value="AMD">AMD</Option>
                        <Option value="CAD">CAD</Option>
                        <Option value="EUR">EUR</Option>
                    </Select>
                    <Input placeholder={'Quantity'} value={creatingOrder?.quantity} onChange={e => setCreatingOrder({ ...creatingOrder, quantity: parseInt(e.target.value) })} />
                </Modal>
                <Modal
                    title='Edit Order'
                    visible={isEditing}
                    okText='Save'
                    onOk={handleSubmit}
                    onCancel={resetEditing}
                >
                    <Input value={editingOrder?.name} onChange={(e) => {
                        setEditingOrder(pre => {
                            return { ...pre, name: e.target.value }
                        })
                    }} />
                    <Input value={editingOrder?.email} onChange={(e) => {
                        setEditingOrder(pre => {
                            return { ...pre, email: e.target.value }
                        })
                    }} />
                    <Input value={editingOrder?.address} onChange={(e) => {
                        setEditingOrder(pre => {
                            return { ...pre, address: e.target.value }
                        })
                    }} />
                    <Input value={editingOrder?.price} onChange={(e) => {
                        setEditingOrder(pre => {
                            return { ...pre, price: e.target.value }
                        })
                    }} />
                    <Input value={editingOrder?.currency} onChange={(e) => {
                        setEditingOrder(pre => {
                            return { ...pre, currency: e.target.value }
                        })
                    }} />
                    <Input value={editingOrder?.quantity} onChange={(e) => {
                        setEditingOrder(pre => {
                            return { ...pre, quantity: e.target.value }
                        })
                    }} />

                </Modal>
            </header>
        </div>
    );
}


export default Deals