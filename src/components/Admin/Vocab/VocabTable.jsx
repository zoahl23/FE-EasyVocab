import { Button, Col, Row, Table } from "antd";
import VocabSearch from "./VocabSearch";
import { CloudUploadOutlined, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const VocabTable = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true
        },
        {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            sorter: true,
        },
        {
            title: 'Math Score',
            dataIndex: 'math',
            sorter: true
        },
        {
            title: 'English Score',
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
                <span>Table List Vocabs</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        style={{ backgroundColor: '#007BFF', borderColor: '#007BFF' }}
                    >Export</Button>
                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                        style={{ backgroundColor: '#28A745', borderColor: '#28A745' }}
                    >Import</Button>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        style={{ backgroundColor: '#FFA500', borderColor: '#FFA500' }}
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
                <VocabSearch />
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
export default VocabTable;