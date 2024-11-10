import { Button, Col, message, notification, Popconfirm, Row, Table, Tag } from "antd";
import SubscriptionSearch from "./SubscriptionSearch";
import { DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { callDeleteSub, callFetchListUser } from "../../../services/api";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import SubscriptionViewDetail from "./SubscriptionViewDetail";
import * as XLSX from 'xlsx';
import SubModalUpdate from "./SubModalUpdate";

const SubscriptionTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-subscriptionEndDate");

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [current, pageSize, filter, sortQuery]);

    const fetchUser = async () => {
        setIsLoading(true);
        let query = `page=${current - 1}&size=${pageSize}`;
        if (filter) {
            query += `&${filter}`
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        const res = await callFetchListUser(query);
        //console.log("test", res)
        if (res && res.data) {
            setListUser(res.data.content);
            setTotal(res.data.page.totalElements);
        }
        setIsLoading(false)
    }

    const handleSearch = (query) => {
        setCurrent(1);
        setFilter(query);
    }

    const handleDeleteSub = async (userId) => {
        const res = await callDeleteSub(userId);
        if (res && res.data) {
            message.success('Xóa gói đăng ký thành công');
            fetchUser();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }
    };

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
                switch (subPlan) {
                    case '6_months':
                        color = 'green';
                        text = '6 tháng'
                        break;
                    case '1_year':
                        color = 'geekblue';
                        text = '1 năm'
                        break;
                    case '3_years':
                        color = 'volcano';
                        text = '3 năm'
                        break;
                    default:
                        color = 'default';
                        text = 'không'
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
                            title={"Xác nhận xóa gói đăng ký"}
                            description={"Bạn có chắc chắn muốn xóa gói đăng ký này ?"}
                            onConfirm={() => handleDeleteSub(record.userId)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer" }}
                            onClick={() => {
                                setOpenModalUpdate(true);
                                setDataUpdate(record);
                            }}
                        />
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
        // console.log('params', pagination, filters, sorter, extra);
        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q);
        }
    };

    const handleExportData = () => {
        if (listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportSubscriptionPlan.csv");
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
                    <Button
                        type='ghost'
                        onClick={() => {
                            setFilter("");
                            setSortQuery("");
                        }}
                    >
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
                    <SubscriptionSearch
                        handleSearch={handleSearch}
                        setFilter={setFilter}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        loading={isLoading}
                        columns={columns}
                        dataSource={listUser}
                        onChange={onChange}
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total,
                                showTotal: (total, range) => {
                                    return (
                                        <div>
                                            {range[0]} - {range[1]} trên {total} dòng
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

            <SubModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchUser={fetchUser}
            />
        </>
    );
}

export default SubscriptionTable;