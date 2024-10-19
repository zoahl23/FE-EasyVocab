import { Button, Col, Row, Table } from "antd";
import UserSearch from "./UserSearch";
import { useEffect, useState } from "react";
import { callFetchListUser } from "../../../services/api";
import { CloudUploadOutlined, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchUser();
    }, [current, pageSize]);

    const fetchUser = async () => {
        const query = `current=${current}&pageSize=${pageSize}`;
        const res = await callFetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total)
        }
    }



    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <>
                        <Button>Delete</Button>
                    </>)
            }
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
        console.log('params', pagination, filters, sorter, extra);
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
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
                <UserSearch />
            </Col>
            <Col span={24}>
                <Table
                    title={renderHeader}
                    columns={columns}
                    dataSource={listUser}
                    onChange={onChange}
                    rowKey="_id"
                    pagination={
                        {
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                        }
                    }
                />
            </Col>
        </Row>
    );
}

export default UserTable;