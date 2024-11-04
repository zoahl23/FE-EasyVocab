import { Button, Col, Row, Table } from "antd";
import CourseSearch from "./CourseSearch";
import { CloudUploadOutlined, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const CourseTable = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'name',
            sorter: true
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'chinese',
            sorter: true,
        },
        {
            title: 'Mục tiêu',
            dataIndex: 'math',
            sorter: true
        },
        {
            title: 'Nội dung',
            dataIndex: 'english',
            sorter: true
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

    const data = [
        {
            key: '1',
            name: '1',
            chinese: '1000 từ vựng cơ bản',
            math: 'Củng cố từ vựng tiếng anh',
            english: 'từ vựng nền tảng',
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Danh sách khóa học</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                    >Xuất dữ liệu</Button>
                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                    >Nhập dữ liệu</Button>
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
                <CourseSearch />
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

export default CourseTable;