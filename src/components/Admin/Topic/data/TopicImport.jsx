import { Modal, notification, Table } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from "react";
import * as XLSX from 'xlsx';
import templateFile from './template.xlsx?url';
import { callBulkCreateTopic } from "../../../../services/api";

const { Dragger } = Upload;
const TopicImport = (props) => {
    const { setOpenModalImport, openModalImport } = props;
    const [dataExcel, setDataExcel] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        customRequest: dummyRequest,
        fileList: fileList,
        onChange(info) {
            const { status } = info.file;
            setFileList(info.fileList);

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function (e) {
                        const data = new Uint8Array(reader.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheet = workbook.Sheets[workbook.SheetNames[0]];
                        // const json = XLSX.utils.sheet_to_json(sheet);
                        const json = XLSX.utils.sheet_to_json(sheet, {
                            header: ["topicName", "description", "courseId"],
                            range: 1 //skip header row
                        });
                        if (json && json.length > 0) setDataExcel(json)
                    }
                }
                message.success(`${info.file.name} đã tải lên thành công.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} tải lên thất bại.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleSubmit = async () => {
        setLoading(true);
        const data = dataExcel.map(item => {
            return item;
        })
        const res = await callBulkCreateTopic(data);
        setLoading(false);
        if (res.statusCode === 201) {
            notification.success({
                description: `Thành công: ${res.data.countSuccess}, Thất bại: ${res.data.countError}`,
                message: "Nhập dữ liệu thành công",
            })
            setDataExcel([]);
            setOpenModalImport(false);
            props.fetchTopic();
        } else {
            notification.error({
                description: `${res.data.error.join(", ")} không hợp lệ hoặc đã tồn tại`,
                message: "Đã có lỗi xảy ra",
            })
        }
    }

    return (
        <>
            <Modal title="Nhập dữ liệu chủ đề"
                width={"50vw"}
                open={openModalImport}
                onOk={() => handleSubmit()}
                onCancel={() => {
                    setOpenModalImport(false);
                    setDataExcel([]);
                    setFileList([]);
                }}
                okText="Nhập dữ liệu"
                cancelText="Hủy"
                okButtonProps={{
                    disabled: dataExcel.length < 1,
                    loading: loading
                }}
                //do not close when click outside
                maskClosable={false}
            >
                <Dragger {...propsUpload} showUploadList={dataExcel.length > 0}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Nhấp hoặc kéo tệp vào đây để tải lên</p>
                    <p className="ant-upload-hint">
                        Hệ thống chỉ hỗ trợ tải lên một tệp duy nhất với định dạng .csv, .xls, .xlsx.
                        &nbsp;  <a onClick={e => e.stopPropagation()} href={templateFile} download>Tải xuống tệp mẫu</a>
                    </p>
                </Dragger>
                <div style={{ paddingTop: 20 }}>
                    <Table
                        dataSource={dataExcel}
                        title={() => <span>Dữ liệu tải lên: </span>}
                        columns={[
                            { dataIndex: 'topicName', title: 'Tên chủ đề (EN)' },
                            { dataIndex: 'description', title: 'Tên chủ đề (VI)' },
                            { dataIndex: 'courseId', title: 'Mã khóa học' },
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}

export default TopicImport;