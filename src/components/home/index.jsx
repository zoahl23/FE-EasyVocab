import { Row, Col } from 'antd';
import './style.scss';

const Home = () => {
    return (
        <div className="homepage-container" style={{ margin: '0 auto' }}>
            <Row>
                <Col md={5} sm={0} xs={0}>
                </Col>
                <Col md={14} sm={24} xs={24}>
                    home
                </Col>
                <Col md={5} sm={0} xs={0}>
                </Col>
            </Row>
        </div>
    )
}

export default Home