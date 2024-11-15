import { FcAdvertising, FcComboChart, FcGraduationCap, FcRules } from 'react-icons/fc';
import './style.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

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
        <div className='footer-container'>
            {navbarItems.map((item, index) => (
                <div className={`navbar-item ${selectedItem === index ? 'selected' : ''}`}
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
    )
}

export default Footer;