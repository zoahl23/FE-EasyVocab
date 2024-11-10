import { useState } from 'react';
import {
    AppstoreOutlined,
    BookOutlined,
    CommentOutlined,
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
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';


const { Header, Sider, Content } = Layout;

const items = [
    {
        label: <Link to='/admin'>Báo cáo thống kê</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <span>Quản lý người dùng</span>,
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to='/admin/user'>Vai trò</Link>,
                key: 'user',
                icon: <TeamOutlined />,
            },
            {
                label: <Link to='/admin/subscription'>Gói đăng ký</Link>,
                key: 'subscription',
                icon: <TeamOutlined />,
            }
        ]
    },
    {
        label: <Link to='/admin/course'>Quản lý khóa học</Link>,
        key: 'course',
        icon: < BookOutlined />
    },
    {
        label: <Link to='/admin/topic'>Quản lý chủ đề</Link>,
        key: 'topic',
        icon: < TagsOutlined />
    },
    {
        label: <Link to='/admin/vocab'>Quản lý từ vựng</Link>,
        key: 'vocab',
        icon: <FileTextOutlined />
    },
    {
        label: <Link to='/admin/feedback'>Quản lý phản hồi</Link>,
        key: 'feedback',
        icon: <CommentOutlined />
    },
];


const LayoutAdmin = () => {

    const [collapsed, setCollapsed] = useState(false); // đóng mở của slidebar(sider)
    const user = useSelector(state => state.account.user); // lấy tt user trong Redux

    const location = useLocation();
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

    // Lấy phần thứ hai của pathname để xác định mục menu nào đang hoạt động
    const selectedKey = location.pathname.split("/")[2] || "dashboard";

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
                width={230}
            >
                <div className="logo-text">EasyVocab</div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={items}
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
                                Chào mừng, {user?.fullName}
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