import { Card, Col, Row } from 'antd';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import StatisticCard from './StatisticCard';
import { useEffect, useState } from 'react';
import { callDataPieChart, callTotalCourse, callTotalTopic, callTotalUser, callTotalVocab } from '../../../services/api';
import Loading from '../../Loading';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [totalUser, setTotalUser] = useState(0);
    const [totalCourse, setTotalCourse] = useState(0);
    const [totalTopic, setTotalTopic] = useState(0);
    const [totalVocab, setTotalVocab] = useState(0);
    const [dataPie, setDataPie] = useState([]);

    const dataCol = [
        { month: 'Tháng 1', users: 32 },
        { month: 'Tháng 2', users: 14 },
        { month: 'Tháng 3', users: 39 },
        { month: 'Tháng 4', users: 29 },
        { month: 'Tháng 5', users: 17 },
        { month: 'Tháng 6', users: 62 },
        { month: 'Tháng 7', users: 24 },
        { month: 'Tháng 8', users: 31 },
        { month: 'Tháng 9', users: 89 },
        { month: 'Tháng 10', users: 18 },
        { month: 'Tháng 11', users: 36 },
        { month: 'Tháng 12', users: 26 },
    ];

    const dataLine = [
        { date: '2024-01-01', value: 20, type: 'Premium' },
        { date: '2024-01-01', value: 32, type: 'Free' },
        { date: '2024-01-02', value: 50, type: 'Premium' },
        { date: '2024-01-02', value: 60, type: 'Free' },
        { date: '2024-01-03', value: 58, type: 'Premium' },
        { date: '2024-01-03', value: 70, type: 'Free' },
        { date: '2024-01-04', value: 67, type: 'Premium' },
        { date: '2024-01-04', value: 54, type: 'Free' },
        { date: '2024-01-05', value: 72, type: 'Premium' },
        { date: '2024-01-05', value: 80, type: 'Free' },
        { date: '2024-01-06', value: 33, type: 'Premium' },
        { date: '2024-01-06', value: 45, type: 'Free' },
        { date: '2024-01-07', value: 88, type: 'Premium' },
        { date: '2024-01-07', value: 54, type: 'Free' },
    ];

    const transformData = (apiData) => {
        const mapping = {
            "6_months": "6 tháng",
            "3_years": "3 năm",
            "1_year": "1 năm",
            "none": "không"
        };

        return Object.keys(apiData.data).map((key) => ({
            type: mapping[key] || key, // Đổi tên key theo mapping
            value: apiData.data[key],  // Giá trị từ API
        }));
    };

    useEffect(() => {
        handleData();
    }, [])

    const handleData = async () => {
        setIsLoading(true);
        const resU = await callTotalUser();
        const resC = await callTotalCourse();
        const resT = await callTotalTopic();
        const resV = await callTotalVocab();
        const resPie = await callDataPieChart();

        if (resU && resU.data) {
            setTotalUser(resU.data);
        }
        if (resC && resC.data) {
            setTotalCourse(resC.data);
        }
        if (resT && resT.data) {
            setTotalTopic(resT.data);
        }
        if (resV && resV.data) {
            setTotalVocab(resV.data);
        }
        if (resPie && resPie.data) {
            const dataP = transformData(resPie);
            setDataPie(dataP);
        }
        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        <Col span={5}>
                            <StatisticCard title="Tổng doanh thu" value={totalTopic} />
                        </Col>
                        <Col span={5}>
                            <StatisticCard title="Tổng số người dùng" value={totalUser} />
                        </Col >
                        <Col span={5}>
                            <StatisticCard title="Số người dùng VIP" value={totalUser} />
                        </Col >
                        <Col span={5}>
                            <StatisticCard title="Số khóa học" value={totalCourse} />
                        </Col>
                        <Col span={4}>
                            <StatisticCard title="Số từ vựng" value={totalVocab} />
                        </Col>
                    </Row >
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
            )}
        </>
    );
}

export default Dashboard;