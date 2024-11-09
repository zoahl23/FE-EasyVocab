import { Button, Col, message, notification, Popconfirm, Row, Table } from "antd";
import TopicSearch from "./TopicSearch";
import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { callDeleteTopic, callDeleteTopicImg, callFetchListTopic } from "../../../services/api";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import TopicViewDetail from "./TopicViewDetail";
import TopicModalCreate from "./TopicModalCreate";
import TopicImport from "./data/TopicImport";
import * as XLSX from 'xlsx';
import TopicModalUpdate from "./TopicModalUpdate";

const TopicTable = () => {
    const [listTopic, setListTopic] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");

    const [openModalCreate, setOpenModalCreate] = useState(false);

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    const [openModalImport, setOpenModalImport] = useState(false);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {
        fetchTopic();
    }, [current, pageSize, filter, sortQuery]);

    const fetchTopic = async () => {
        setIsLoading(true);
        let query = `page=${current - 1}&size=${pageSize}`;
        if (filter) {
            query += `&${filter}`
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        const res = await callFetchListTopic(query);
        // console.log("test", res)
        if (res && res.data) {
            setListTopic(res.data.content);
            setTotal(res.data.page.totalElements);
        }
        setIsLoading(false);
    }

    const handleSearch = (query) => {
        setCurrent(1);
        setFilter(query);
    }

    const handleDeleteImage = async (id) => {
        const res = await callDeleteTopicImg(id);
        if (res && res.data) {
            handleDeleteTopic(id);
        } else {
            notification.error({
                message: 'Có lỗi xảy ra khi xóa ảnh',
                description: res.message
            });
        }
    }

    const handleDeleteTopic = async (id) => {
        const res = await callDeleteTopic(id);
        if (res && res.data) {
            message.success('Xóa chủ đề thành công');
            fetchTopic();
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
            title: 'Tên chủ đề (EN)',
            dataIndex: 'topicName',
            sorter: true
        },
        {
            title: 'Tên chủ đề (VI)',
            dataIndex: 'description',
            sorter: true,
        },
        {
            title: 'Khóa học',
            dataIndex: 'course',
            render: (text, record) => {
                return record.course ? record.course.courseName : "---";
            }
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
                            title={"Xác nhận xóa chủ đề"}
                            description={"Bạn có chắc chắn muốn xóa chủ đề này ?"}
                            onConfirm={() => handleDeleteImage(record.id)}
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
        // console.log('params', pagination, filters, sorter, extra);
        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q);
        }
    };

    const handleExportData = () => {
        if (listTopic.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listTopic);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportTopic.csv");
        }
    }

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Danh sách chủ đề</span>
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
                    <Button type='ghost' onClick={() => {
                        setFilter("");
                        setSortQuery("");
                    }}>
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
                    <TopicSearch
                        handleSearch={handleSearch}
                        setFilter={setFilter}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        loading={isLoading}
                        columns={columns}
                        dataSource={listTopic}
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

            <TopicViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />

            <TopicModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchTopic={fetchTopic}
            />

            <TopicImport
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                fetchTopic={fetchTopic}
            />

            <TopicModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchTopic={fetchTopic}
            />
        </>
    );
}
export default TopicTable;