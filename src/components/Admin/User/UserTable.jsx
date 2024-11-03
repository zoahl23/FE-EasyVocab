import { Button, Col, Row, Table, Tag } from "antd";
import UserSearch from "./UserSearch";
import { useEffect, useState } from "react";
import { callFetchListUser } from "../../../services/api";

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchUser();
    }, [current, pageSize]);

    const fetchUser = async () => {
        const query = `page=${current - 1}&size=${pageSize}`;
        const res = await callFetchListUser(query);
        console.log("test", res)
        if (res && res.data) {
            setListUser(res.data.content);
            setTotal(res.data.totalElements);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId',
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
            title: 'Phân loại',
            dataIndex: 'role',
            render: (role) => {
                let color = '';
                let displayText = role.replace("ROLE_", "");
                if (role === 'ROLE_ADMIN') {
                    color = 'geekblue';
                } else {
                    color = 'green';
                }
                return (
                    <Tag color={color} key={role}>
                        {displayText}
                    </Tag>
                );
            },
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
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Row gutter={[20, 20]}>
            <Col span={24}>
                <UserSearch />
            </Col>
            <Col span={24}>
                <Table
                    className='def'
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