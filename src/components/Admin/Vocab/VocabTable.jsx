import { Button, Col, Row, Table } from "antd";
import VocabSearch from "./VocabSearch";
import { CloudUploadOutlined, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const VocabTable = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'name',
        },
        {
            title: 'Từ vựng',
            dataIndex: 'chinese',
            sorter: true,
        },
        {
            title: 'Nghĩa tiếng việt',
            dataIndex: 'math',
            sorter: true
        },
        {
            title: 'Chủ đề',
            dataIndex: 'english',
        },
        {
            title: 'Khóa học',
            dataIndex: 'english',
        },
        {
            title: 'Hành động',
            render: (text, record, index) => {
                return (
                    <>
                        <Button>Delete</Button>
                    </>)
            }
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Danh sách từ vựng</span>
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
                <VocabSearch />
            </Col>
            <Col span={24}>
                <Table
                    title={renderHeader}
                    columns={columns}
                    //dataSource={data}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
}

export default VocabTable;