import { Button, Col, Row, Table } from "antd";
import TopicSearch from "./TopicSearch";
import { CloudUploadOutlined, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const TopicTable = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'name',
            sorter: true
        },
        {
            title: 'Tên chủ đề (VI)',
            dataIndex: 'chinese',
            sorter: true,
        },
        {
            title: 'Tên chủ đề (EN)',
            dataIndex: 'math',
            sorter: true
        },
        {
            title: 'Khóa học',
            dataIndex: 'english',
            sorter: true
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Danh sách chủ đề</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                    >Xuất dữ liệu</Button>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                    >Thêm mới</Button>
                    <Button type='ghost'>
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
    }

    return (
        <Row gutter={[20, 20]}>
            <Col span={24}>
                <TopicSearch />
            </Col>
            <Col span={24}>
                <Table
                    title={renderHeader}
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
}
export default TopicTable;