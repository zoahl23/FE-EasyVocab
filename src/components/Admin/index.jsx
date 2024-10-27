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
import { Button, Dropdown, Layout, Menu, message, Space } from 'antd';
import './style.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';

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

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false); // đóng mở của slidebar(sider)
    const [activeMenu, setActiveMenu] = useState('dashboard'); // đang ở menu nào
    const user = useSelector(state => state.account.user); // lấy tt user trong Redux


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }


    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

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