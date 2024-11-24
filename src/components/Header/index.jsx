import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, message, Space } from 'antd';
import { FcAdvertising, FcComboChart, FcGraduationCap, FcReadingEbook, FcRules, } from "react-icons/fc";
import '../../styles/reset.scss';
import imgGuest from '../../assets/imgGuest.png';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { useEffect, useState } from 'react';
import AccountModal from '../AccountModal/AccountModal';


const Header = () => {
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const user = useSelector((state) => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleLogout = () => {
        dispatch(doLogoutAction());
        message.success('Đăng xuất thành công');
        navigate("/");
    }


    let items = [
        {
            label: <div
                style={{ cursor: 'pointer' }}
                onClick={() => setIsModalVisible(true)}
            >Quản lý tài khoản</div>,
            key: 'account',
        },
        {
            label: <div
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</div>,
            key: 'logout',
        },
    ];

    if (user?.role === 'ROLE_ADMIN') {
        items.unshift({
            label: <a href='/admin'>Trang quản trị</a>,
            key: 'admin',
        })
    }

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

    const [selectedItem, setSelectedItem] = useState(
        navbarItems.findIndex(item => window.location.pathname.startsWith(item.link))
    );

    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentIndex = navbarItems.findIndex(item => currentPath.startsWith(item.link));
        setSelectedItem(currentIndex);
    }, [window.location.pathname]);

    return (
        <div className='header-container'>
            <div className="page-header__logo">
                <Link to='/review' style={{ textDecoration: 'none' }}>
                    <div className="logo-text">EasyVocab</div>
                </Link>
            </div>
            <div className="page-header__navbar">
                {navbarItems.map((item, index) => (
                    <div
                        className={`navbar-item ${selectedItem === index ? 'selected' : ''}`}
                        key={index}
                        onClick={
                            () => {
                                setSelectedItem(index);
                                navigate(item.link);
                            }
                        }
                    >
                        <div className="navbar-item__icon">
                            {item.icon}
                        </div>
                        <div className="navbar-item__title">{item.title}</div>
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
                        <span onClick={(e) => e.preventDefault()}>
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
                        </span>
                    </Dropdown>
                )}
            </div>

            {/* Modal quản lý tài khoản */}
            <AccountModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                userData={user}
            />
        </div>
    )
}

export default Header;