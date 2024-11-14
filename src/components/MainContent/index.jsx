import './style.scss';

const MainContent = (props) => {
    const { children } = props;

    return (
        <div className="homepage-container" style={{ margin: '0 auto' }}>
            <div className="sidebar"></div>
            <div className="main-content">
                {children}
            </div>
            <div className="sidebar"></div>
        </div >
    )
}

export default MainContent;