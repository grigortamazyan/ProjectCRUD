import 'antd/dist/antd.css'
import './App.css';
import { Table, Button, Modal, Input } from 'antd'
import { useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { generateId } from './helpers';
import {
  BrowserRouter as Router,
  Switch,
  Route, Link
} from "react-router-dom";
import Analytics from './Analytics';
import { Layout, Menu, PageHeader, Select } from 'antd';
import Deals from './Deals';
function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [creatingEmployee, setCreatingEmployee] = useState(null)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      address: '123 Street, NYC',
      salary: 5000,
      currency: 'USD'
    },
    {
      id: 2,
      name: 'Dave',
      email: 'dave@gmail.com',
      address: '123 Street, LA',
      salary: 4000,
      currency: 'EUR'
    },
    {
      id: 3,
      name: 'Tom',
      email: 'tom@gmail.com',
      address: '123 Street, Boston',
      salary: 3000,
      currency: 'CAD'
    },
    {
      id: 4,
      name: 'Ann',
      email: 'ann@gmail.com',
      address: '123 Street, Toronto',
      salary: 600000,
      currency: 'AMD'
    }
  ])
  const [sumOrders, setSumOrders] = useState(0);
  const { Header, Content, Footer } = Layout;
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
      title: 'Salary',
      dataIndex: 'salary'
    },
    {
      key: '6',
      title: 'Currency',
      dataIndex: 'currency'
    },
    {
      key: '7',
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

  const handleTotal = (total) => {
    setSumOrders(total)
  }


  const onAddEmployee = () => {
    const id = generateId()
    setDataSource(prev => [{ ...creatingEmployee, id }].concat(prev))
    console.log(dataSource)
    resetCreating()
  }
  const onDeleteEmployee = (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this employee?',
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
    setCreatingEmployee({})
  }

  const onEditEmployee = (record) => {
    setIsEditing(true);
    setEditingEmployee({ ...record })
  }
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEmployee(null)
  }
  const resetCreating = () => {
    setIsCreating(false);
    setCreatingEmployee(null)
  }
  const handleSubmit = () => {
    setDataSource(pre => pre.map(employee => employee.id === editingEmployee.id ? editingEmployee : employee))
    resetEditing()
  }
  return (
    <Layout>
      <Router>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" >
            <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to='/analytics'>Analytics</Link></Menu.Item>
            <Menu.Item key="3"><Link to='/deals'>Deals</Link></Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>

          <div className="App">
            <Switch>
              <Route path='/' exact>
                <header className="App-header">
                  <PageHeader
                    className="site-page-header"
                    title="Database of Employees"
                  />
                  <Button onClick={onCreateEmployee} style={{ marginBottom: 5 }}>Creat a new Employee</Button>
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                  ></Table>
                  <Modal
                    title='Add Employee'
                    okText='Save'
                    visible={isCreating}
                    onCancel={resetCreating}
                    onOk={onAddEmployee}
                  >
                    <Input placeholder={'Employee Name'} value={creatingEmployee?.name} onChange={e => setCreatingEmployee({ ...creatingEmployee, name: e.target.value })} />
                    <Input placeholder={'Email'} value={creatingEmployee?.email} onChange={e => setCreatingEmployee({ ...creatingEmployee, email: e.target.value })} />
                    <Input placeholder={'Address'} value={creatingEmployee?.address} onChange={e => setCreatingEmployee({ ...creatingEmployee, address: e.target.value })} />
                    <Input placeholder={'Salary'} value={creatingEmployee?.salary} onChange={e => setCreatingEmployee({ ...creatingEmployee, salary: parseInt(e.target.value) })} />
                    <Select style={{ display: 'block' }} placeholder='Select currency' value={creatingEmployee?.currency} onChange={value => setCreatingEmployee({ ...creatingEmployee, currency: value })} >
                      <Option value="USD">USD</Option>
                      <Option value="AMD">AMD</Option>
                      <Option value="CAD">CAD</Option>
                      <Option value="EUR">EUR</Option>
                    </Select>
                  </Modal>
                  <Modal
                    title='Edit Employee'
                    visible={isEditing}
                    okText='Save'
                    onOk={handleSubmit}
                    onCancel={resetEditing}
                  >
                    <Input value={editingEmployee?.name} onChange={(e) => {
                      setEditingEmployee(pre => {
                        return { ...pre, name: e.target.value }
                      })
                    }} />
                    <Input value={editingEmployee?.email} onChange={(e) => {
                      setEditingEmployee(pre => {
                        return { ...pre, email: e.target.value }
                      })
                    }} />
                    <Input value={editingEmployee?.address} onChange={(e) => {
                      setEditingEmployee(pre => {
                        return { ...pre, address: e.target.value }
                      })
                    }} />
                    <Input value={editingEmployee?.salary} onChange={(e) => {
                      setEditingEmployee(pre => {
                        return { ...pre, salary: e.target.value }
                      })
                    }} />
                    <Input value={editingEmployee?.currency} onChange={(e) => {
                      setEditingEmployee(pre => {
                        return { ...pre, currency: e.target.value }
                      })
                    }} />

                  </Modal>
                </header>
              </Route>
              <Route path='/analytics'>
                <Analytics revenue={sumOrders} salaryData={dataSource} />
              </Route>
              <Route path='/deals'>
                <Deals parentCallback={handleTotal} />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Crud 2021 Armenia</Footer>
      </Router>
    </Layout>
  );
}

export default App;
