import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown, message, Space } from 'antd';
import { FcAdvertising, FcComboChart, FcGraduationCap, FcReadingEbook, FcRules, } from "react-icons/fc";
import '../../styles/reset.scss';
import imgGuest from '../../assets/imgGuest.png';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { callLogout } from '../../services/api';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const user = useSelector((state) => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }


    const items = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];

    const navbarItems = [
        {
            title: 'Ôn tập',
            link: '/',
            icon: <FcComboChart />
        },
        {
            title: 'Học từ mới',
            link: '/learn',
            icon: <FcGraduationCap />
        },
        {
            title: 'Sổ tay',
            link: '/notebook',
            icon: <FcRules />
        },
        {
            title: 'Sự kiện',
            link: '/events',
            icon: <FcAdvertising />
        },
    ];


    return (
        <div className='header-container'>
            <div className="page-header__logo">
                <a href='/' style={{ marginLeft: '10%' }}>
                    <img
                        src='/public/nameWeb.png'
                        alt="logo"
                        width="190px"
                        height="35px"
                        style={{ marginTop: 5 }}
                    />
                </a>
            </div>
            <div className="page-header__navbar">
                {navbarItems.map((item, index) => (
                    <div className="navbar-item" key={index}>
                        <a href={item.link} style={{ textDecoration: 'none' }}>
                            <div className="navbar-item__icon">
                                {item.icon}
                            </div>
                            <div className="navbar-item__title">{item.title}</div>
                        </a>
                    </div>
                ))}
            </div>
            <div className="page-header__user">
                {!isAuthenticated ? (
                    <div className='guest' onClick={() => navigate('/login')}>
                        <img src={imgGuest} height='22px' width='auto' />
                    </div>
                ) : (
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <div className="user-say-hi">
                                <Space>
                                    Xin chào, {user?.fullName.trim().split(' ').pop()}
                                    <div className='iconSet'>
                                        <FcReadingEbook />
                                    </div>
                                </Space>
                            </div>
                            <div className="user-mobile">
                                <FcReadingEbook />
                            </div>
                        </a>
                    </Dropdown>
                )}
            </div>
        </div>
    )
}

export default Header