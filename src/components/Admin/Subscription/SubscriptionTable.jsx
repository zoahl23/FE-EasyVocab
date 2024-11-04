import { Button, Col, Row, Table } from "antd";
import SubscriptionSearch from "./SubscriptionSearch";
import { ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const SubscriptionTable = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId'
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Gói đăng ký',
            dataIndex: 'subscriptionPlan'
        },
        {
            title: 'Ngày hết hạn gói',
            dataIndex: 'subscriptionEndDate',
            sorter: true
        },
        {
            title: 'Hành động',
            render: (text, record, index) => {
                return (
                    <>
                        <Button>Nâng cấp</Button>
                    </>)
            }
        }
    ];

    const data = [
        {
            userId: '1',
            fullName: 'John',
            email: 'john@example.com',
            subscriptionPlan: '6 tháng',
            subscriptionEndDate: '2024-11-01T10:08:13.000+00:00'
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Danh sách người dùng theo gói dịch vụ</span>
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
                <SubscriptionSearch />
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

export default SubscriptionTable;