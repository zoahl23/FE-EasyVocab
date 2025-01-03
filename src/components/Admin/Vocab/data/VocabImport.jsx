import { Modal, notification, Table } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from "react";
import * as XLSX from 'xlsx';
import templateFile from './template.xlsx?url';
import { callBulkCreateVocab } from "../../../../services/api";

const { Dragger } = Upload;
const VocabImport = (props) => {
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
            const { status, originFileObj } = info.file;
            const MAX_SIZE_KB = 50;

            if (originFileObj && originFileObj.size > MAX_SIZE_KB * 1024) {
                message.error(`Tệp vượt quá kích thước tối đa (${MAX_SIZE_KB}KB).`);
                return;
            }

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
                            header: ["word", "meaning", "topicId"],
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
        const res = await callBulkCreateVocab(data);
        setLoading(false);
        if (res.statusCode === 201) {
            notification.success({
                description: `Thành công: ${res.data.countSuccess}, Thất bại: ${res.data.countError}`,
                message: "Nhập dữ liệu thành công",
            })
            setDataExcel([]);
            setOpenModalImport(false);
            props.fetchVocab();
        } else {
            notification.error({
                description: `${res.data.error.join(", ")} không hợp lệ hoặc đã tồn tại`,
                message: "Đã có lỗi xảy ra",
            })
        }
    }

    return (
        <>
            <Modal title="Nhập dữ liệu từ vựng"
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
                            { dataIndex: 'word', title: 'Từ vựng' },
                            { dataIndex: 'meaning', title: 'Nghĩa của từ' },
                            { dataIndex: 'topicId', title: 'Mã chủ đề' },
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}

export default VocabImport;