import { Pie } from '@ant-design/charts';

const PieChart = ({ data, angleField, colorField }) => {
    const config = {
        data,
        angleField,
        colorField,
        height: 300,
    };
    return <Pie {...config} />;
};

export default PieChart;