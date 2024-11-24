import { Line } from '@ant-design/charts';

const LineChart = ({ data, xField, yField, seriesField }) => {
    const config = {
        data,
        xField,
        yField,
        seriesField,
        colorField: seriesField,
        height: 300,
    };
    return <Line {...config} />;
};

export default LineChart;