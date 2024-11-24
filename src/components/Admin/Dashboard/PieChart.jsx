import { Pie } from '@ant-design/charts';

const PieChart = ({ data, angleField, colorField }) => {
    const config = {
        data,
        angleField,
        colorField,
        radius: 1, // bán kính toàn phần
        innerRadius: 0.5, // bán kính bên trong
        height: 300,
    };
    return <Pie {...config} />;
};

export default PieChart;