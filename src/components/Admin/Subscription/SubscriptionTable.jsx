import { Button, Col, Popconfirm, Row, Table, Tag } from "antd";
import SubscriptionSearch from "./SubscriptionSearch";
import { DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { callFetchListUser } from "../../../services/api";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import SubscriptionViewDetail from "./SubscriptionViewDetail";
import * as XLSX from 'xlsx';

const SubscriptionTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [current, pageSize]);

    const fetchUser = async () => {
        const query = `page=${current - 1}&size=${pageSize}`;
        const res = await callFetchListUser(query);
        //console.log("test", res)
        if (res && res.data) {
            setListUser(res.data.content);
            setTotal(res.data.page.totalElements);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId',
            render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);
                    }}>{record.userId}</a>
                )
            }
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
            width: 130,
            render: (text, record, index) => {
                return (
                    <>
                        <EyeTwoTone
                            twoToneColor="#1890ff"
                            onClick={() => {
                                setDataViewDetail(record);
                                setOpenViewDetail(true);
                            }}
                        />

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

    const handleExportData = () => {
        if (listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportUser.csv");
        }
    }

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Danh sách người dùng theo gói dịch vụ</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={() => handleExportData()}
                    >Xuất dữ liệu</Button>
                    <Button type='ghost'>
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
    }

    return (
        <>
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
                                            {range[0]} - {range[1]} trên {total} hàng
                                        </div>
                                    );
                                }
                            }
                        }
                    />
                </Col>
            </Row>

            <SubscriptionViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
        </>
    );
}

export default SubscriptionTable;