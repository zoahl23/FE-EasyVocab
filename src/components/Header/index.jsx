import './style.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import { FcAdvertising, FcComboChart, FcGraduationCap, FcReading, FcRules, } from "react-icons/fc";
import '../../styles/reset.scss';
import imgGuest from '../../assets/imgGuest.png';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const user = useSelector((state) => state.account.user);
    const navigate = useNavigate();

    const items = [
        {
            label: <label>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    const navbarItems = [
        {
            title: 'Ôn tập',
            link: '/review',
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
                        src='https://learn.mochidemy.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVocabLogo.da46507f.webp&w=640&q=75'
                        alt="logo"
                        width="190px"
                        height="50px"
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
                        <img src={imgGuest} height='25px' width='auto' />
                    </div>
                ) : (
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <div className="user-say-hi">
                                <Space>
                                    Xin chào, {user?.fullName.trim().split(' ').pop()}
                                    <div className='iconSet'>
                                        <FcReading />
                                    </div>
                                </Space>
                            </div>
                            <div className="user-mobile">
                                <FcReading />
                            </div>
                        </a>
                    </Dropdown>
                )}
            </div>
        </div>
    )
}

export default Header;