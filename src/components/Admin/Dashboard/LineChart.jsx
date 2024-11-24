import { Line } from '@ant-design/charts';

const LineChart = ({ data, xField, yField }) => {
    const config = {
        data,
        xField,
        yField,
        height: 300,
    };
    return <Line {...config} />;
};

export default LineChart;