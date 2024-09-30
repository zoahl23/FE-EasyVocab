import React, { useState } from 'react';
import {
    AppstoreOutlined,
    BookOutlined,
    DownOutlined,
    FileTextOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TagsOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, Space } from 'antd';
import './style.scss';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

const items = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <span>Manage Users</span>,
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to='/admin/user'>CRUD</Link>,
                key: 'crud',
                icon: <TeamOutlined />,
            },
            {
                label: 'Files1',
                key: 'file1',
                icon: <TeamOutlined />,
            }
        ]
    },
    {
        label: <Link to='/admin/course'>Manage Course</Link>,
        key: 'course',
        icon: < BookOutlined />
    },
    {
        label: <Link to='/admin/topic'>Manage Topic</Link>,
        key: 'topic',
        icon: < TagsOutlined />
    },
    {
        label: <Link to='/admin/vocab'>Manage Vocabulary</Link>,
        key: 'vocab',
        icon: <FileTextOutlined />
    },
];

const itemsDropdown = [
    {
        label: <label>Quản lý tài khoản</label>,
        key: 'account',
    },
    {
        label: <label>Đăng xuất</label>,
        key: 'logout',
    },
];

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false); // đóng mở của slidebar(sider)
    const [activeMenu, setActiveMenu] = useState('dashboard'); // đang ở menu nào
    const user = useSelector(state => state.account.user); // lấy tt user trong Redux

    return (
        <Layout
            style={{ minHeight: '100vh' }}
            className="layout-admin"
        >
            <Sider
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div style={{ height: 32, margin: 16, textAlign: 'center' }}>Admin</div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[activeMenu]}
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>
            <Layout>
                <Header className='admin-header'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 50,
                            height: 50,
                        }}
                    />
                    <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome {user?.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                <Content className='admin-content'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutAdmin;