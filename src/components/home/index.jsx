import { Row, Col } from 'antd';
import './style.scss';
import CustomFlipCard from '../FlipCard/customFlipCard';
const Home = () => {

  return (
    <div className='homepage-container' style={{ margin: '0 auto' }}>
      <Row>
        <Col md={5} sm={0} xs={0}></Col>
        <Col
          md={14}
          sm={24}
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          <CustomFlipCard
            width={300}
            height={500}
            imageSrc="https://learn.mochidemy.com/_next/image?url=https%3A%2F%2Fmochien3.1-api.mochidemy.com%2Fpublic%2Fimages%2Fquestion%2FProject_toeic.png&w=256&q=75"
            flat1Content="They were receiving a government grant for their agricultural project to develop local economics."
            flat2Content={{
              title: 'project',
              description: 'Đề án, dự án, kế hoạch (n)',
            }}
            // flipInterval={5000} 
          />
        </Col>
        <Col md={5} sm={0} xs={0}></Col>
      </Row>
    </div>
  );
};
export default Home;
