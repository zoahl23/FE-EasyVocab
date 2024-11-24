import { Column } from '@ant-design/charts';

const ColumnChart = ({ data, xField, yField }) => {
    const config = {
        data,
        xField,
        yField,
        height: 300,
    };
    return <Column {...config} />;
};

export default ColumnChart;