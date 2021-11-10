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
import { Layout, Menu } from 'antd';

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
      address: '123 Street, NYC'
    },
    {
      id: 2,
      name: 'Dave',
      email: 'dave@gmail.com',
      address: '123 Street, LA'
    },
    {
      id: 3,
      name: 'Tom',
      email: 'tom@gmail.com',
      address: '123 Street, Boston'
    },
    {
      id: 4,
      name: 'Ann',
      email: 'ann@gmail.com',
      address: '123 Street, Toronto'
    }
  ])
  const { Header, Content, Footer } = Layout;

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id'
    },
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

  const onAddEmployee = () => {
    const id = generateId()
    setDataSource(prev => [{ ...creatingEmployee, id }].concat(prev))
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
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to='/analytics'>Analytics</Link></Menu.Item>
            <Menu.Item key="3">Deals</Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="App">
            <Switch>
              <Route path='/' exact>
                <header className="App-header">
                  <Button onClick={onCreateEmployee}>Creat a new Employee</Button>
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
                    <Input value={creatingEmployee?.name} onChange={e => setCreatingEmployee({ ...creatingEmployee, name: e.target.value })} />
                    <Input value={creatingEmployee?.email} onChange={e => setCreatingEmployee({ ...creatingEmployee, email: e.target.value })} />

                    <Input value={creatingEmployee?.address} onChange={e => setCreatingEmployee({ ...creatingEmployee, address: e.target.value })} />
                  </Modal>
                  <Modal
                    title='Edit Employee'
                    visible={isEditing}
                    okText='Save'
                    footer={null}
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
                    <div>
                      <Button onClick={resetEditing}>Cancel</Button>
                      <Button onClick={handleSubmit} type={'primary'} style={{ marginLeft: '1rem' }}>Save</Button>
                    </div>

                  </Modal>
                </header>
              </Route>
              <Route path='/analytics'>
                <Analytics />
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
