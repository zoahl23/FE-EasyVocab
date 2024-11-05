import { Button, Col, Row, Table } from "antd";
import CourseSearch from "./CourseSearch";
import { CloudUploadOutlined, ExportOutlined, EyeTwoTone, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import { callFetchListCourse } from "../../../services/api";
import CourseModalCreate from "./CourseModalCreate";
import CourseViewDetail from "./CourseViewDetail";

const CourseTable = () => {
    const [listCourse, setListCourse] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [openModalCreate, setOpenModalCreate] = useState(false);

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    useEffect(() => {
        fetchCourse();
    }, [current, pageSize]);

    const fetchCourse = async () => {
        const query = `page=${current - 1}&size=${pageSize}`;
        const res = await callFetchListCourse(query);
        //console.log("test", res)
        if (res && res.data) {
            setListCourse(res.data.content);
            setTotal(res.data.totalElements);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'courseName',
            sorter: true,
        },
        {
            title: 'Mục tiêu',
            dataIndex: 'courseTarget',
            sorter: true,
        },
        {
            title: 'Nội dung',
            dataIndex: 'description',
            sorter: true,
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>{moment(record.updatedAt).format(FORMAT_DATE_DISPLAY)}</>
                )
            }
        },
        {
            title: 'Hành động',
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
                        onClick={() => setOpenModalCreate(true)}
                    >Thêm mới</Button>
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
                    <CourseSearch />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        columns={columns}
                        dataSource={listCourse}
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

            <CourseModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchCourse={fetchCourse}
            />

            <CourseViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
        </>
    );
}

export default CourseTable;