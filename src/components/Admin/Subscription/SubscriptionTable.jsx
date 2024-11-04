import { Button, Col, Popconfirm, Row, Table, Tag } from "antd";
import SubscriptionSearch from "./SubscriptionSearch";
import { DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { callFetchListUser } from "../../../services/api";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";

const SubscriptionTable = () => {
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
        //console.log("test", res)
        if (res && res.data) {
            setListUser(res.data.content);
            setTotal(res.data.totalElements);
        }
    }

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
            dataIndex: 'subscriptionPlan',
            render: (subPlan) => {
                let color = '';
                let text = subPlan;
                if (subPlan === 'none') {
                    color = 'geekblue';
                } else {
                    color = 'green';
                    text = 'null';
                }
                return (
                    <Tag color={color} key={subPlan}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: 'Ngày hết hạn gói',
            dataIndex: 'subscriptionEndDate',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>{moment(record.subscriptionEndDate).format(FORMAT_DATE_DISPLAY)}</>
                )
            }
        },
        {
            title: 'Hành động',
            render: (text, record, index) => {
                return (
                    <>
                        <EyeTwoTone twoToneColor="#1890ff" />

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone twoToneColor="#f57800" />
                    </>
                )
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
                    dataSource={listUser}
                    onChange={onChange}
                    rowKey="_id"
                    pagination={
                        {
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total, range) => {
                                return (
                                    <div>
                                        {range[0]} - {range[1]} trên {total} rows
                                    </div>
                                );
                            }
                        }
                    }
                />
            </Col>
        </Row>
    );
}

export default SubscriptionTable;