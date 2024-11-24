import { Statistic, Card } from 'antd';

const StatisticCard = ({ title, value }) => (
    <Card title={title}>
        <Statistic value={value} />
    </Card>
);

export default StatisticCard;