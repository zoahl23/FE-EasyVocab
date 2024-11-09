import { Button, Col, message, notification, Popconfirm, Row, Table } from "antd";
import CourseSearch from "./CourseSearch";
import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import { callDeleteCourse, callFetchListCourse } from "../../../services/api";
import CourseModalCreate from "./CourseModalCreate";
import CourseViewDetail from "./CourseViewDetail";
import CourseImport from "./data/CourseImport";
import * as XLSX from 'xlsx';
import CourseModalUpdate from "./courseModalUpdate";

const CourseTable = () => {
    const [listCourse, setListCourse] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [openModalCreate, setOpenModalCreate] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    const [openModalImport, setOpenModalImport] = useState(false);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {
        fetchCourse();
    }, [current, pageSize, filter, sortQuery]);

    const fetchCourse = async () => {
        setIsLoading(true);
        let query = `page=${current - 1}&size=${pageSize}`;
        if (filter) {
            query += `&${filter}`
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        const res = await callFetchListCourse(query);
        //console.log("test", res)
        if (res && res.data) {
            setListCourse(res.data.content);
            setTotal(res.data.page.totalElements);
        }
        setIsLoading(false)
    }

    const handleSearch = (query) => {
        setCurrent(1);
        setFilter(query);
    }

    const handleDeleteCourse = async (id) => {
        const res = await callDeleteCourse(id);
        if (res && res.data) {
            message.success('Xóa khóa học thành công!');
            fetchCourse();
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
            dataIndex: 'id',
            render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);
                    }}>{record.id}</a>
                )
            }
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
                            title={"Xác nhận xóa khóa học"}
                            description={"Bạn có chắc chắn muốn xóa khóa học này ?"}
                            onConfirm={() => handleDeleteCourse(record.id)}
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
        if (listCourse.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listCourse);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportCourse.csv");
        }
    }

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Danh sách khóa học</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={() => handleExportData()}
                    >Xuất dữ liệu</Button>
                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                        onClick={() => setOpenModalImport(true)}
                    >Nhập dữ liệu</Button>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setOpenModalCreate(true)}
                    >Thêm mới</Button>
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
                    <CourseSearch
                        handleSearch={handleSearch}
                        setFilter={setFilter}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        loading={isLoading}
                        columns={columns}
                        dataSource={listCourse}
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

            <CourseImport
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                fetchCourse={fetchCourse}
            />

            <CourseModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchCourse={fetchCourse}
            />
        </>
    );
}

export default CourseTable;