import { Card, Col, Row } from 'antd';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import StatisticCard from './StatisticCard';

const Dashboard = () => {

    const dataCol = [
        { month: 'Tháng 1', users: 372 },
        { month: 'Tháng 2', users: 134 },
        { month: 'Tháng 3', users: 249 },
        { month: 'Tháng 4', users: 299 },
        { month: 'Tháng 5', users: 157 },
        { month: 'Tháng 6', users: 102 },
        { month: 'Tháng 7', users: 284 },
        { month: 'Tháng 8', users: 381 },
        { month: 'Tháng 9', users: 89 },
        { month: 'Tháng 10', users: 128 },
        { month: 'Tháng 11', users: 346 },
        { month: 'Tháng 12', users: 216 },
    ];

    const dataLine = [
        { date: '2024-01-01', value: 200, type: 'Premium' },
        { date: '2024-01-01', value: 50, type: 'Free' },
        { date: '2024-01-02', value: 180, type: 'Premium' },
        { date: '2024-01-02', value: 60, type: 'Free' },
        { date: '2024-01-03', value: 250, type: 'Premium' },
        { date: '2024-01-03', value: 70, type: 'Free' },
        { date: '2024-01-04', value: 300, type: 'Premium' },
        { date: '2024-01-04', value: 90, type: 'Free' },
        { date: '2024-01-05', value: 280, type: 'Premium' },
        { date: '2024-01-05', value: 80, type: 'Free' },
        { date: '2024-01-06', value: 320, type: 'Premium' },
        { date: '2024-01-06', value: 100, type: 'Free' },
        { date: '2024-01-07', value: 350, type: 'Premium' },
        { date: '2024-01-07', value: 120, type: 'Free' },
    ];

    const dataPie = [
        { type: '6 tháng', value: 27 },
        { type: '1 năm', value: 25 },
        { type: '3 năm', value: 18 },
        { type: 'không', value: 30 },
    ];

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <StatisticCard title="Tổng số người dùng" value={1500} />
                </Col>
                <Col span={6}>
                    <StatisticCard title="Tổng số khóa học" value={75} />
                </Col>
                <Col span={6}>
                    <StatisticCard title="Tổng số chủ đề" value={100} />
                </Col>
                <Col span={6}>
                    <StatisticCard title="Tổng số từ vựng" value={12000} />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={24}>
                    <Card title="Số lượng người dùng mới theo tháng">
                        <ColumnChart data={dataCol} xField="month" yField="users" />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Card title="Tỷ lệ người dùng theo loại gói đăng ký">
                        <PieChart data={dataPie} angleField="value" colorField="type" />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Số lượng người dùng hoạt động hàng ngày">
                        <LineChart data={dataLine} xField="date" yField="value" seriesField="type" />
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;