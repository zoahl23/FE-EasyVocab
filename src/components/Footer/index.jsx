import { FcAdvertising, FcComboChart, FcGraduationCap, FcRules } from 'react-icons/fc';
import './style.scss';

const Footer = () => {

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
        <div className='footer-container'>
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
    )
}

export default Footer;