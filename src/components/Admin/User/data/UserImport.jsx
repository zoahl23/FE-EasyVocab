import { Modal, Table } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from "react";
import * as XLSX from 'xlsx';

const { Dragger } = Upload;
const UserImport = (props) => {
    const { setOpenModalImport, openModalImport } = props;
    const [dataExcel, setDataExcel] = useState([])

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
        onChange(info) {
            const { status } = info.file;
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
                            header: ["fullName", "email", "phone"],
                            range: 1 //skip header row
                        });
                        if (json && json.length > 0) setDataExcel(json)
                    }
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <Modal title="Import data user"
                width={"50vw"}
                open={openModalImport}
                onOk={() => setOpenModalImport(false)}
                onCancel={() => setOpenModalImport(false)}
                okText="Import data"
                okButtonProps={{
                    disabled: true
                }}
                //do not close when click outside
                maskClosable={false}
            >
                <Dragger {...propsUpload} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx
                    </p>
                </Dragger>
                <div style={{ paddingTop: 20 }}>
                    <Table
                        dataSource={dataExcel}
                        title={() => <span>Dữ liệu upload:</span>}
                        columns={[
                            { dataIndex: 'fullName', title: 'Tên hiển thị' },
                            { dataIndex: 'email', title: 'Email' },
                            { dataIndex: 'phone', title: 'Số điện thoại' },
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}

export default UserImport;
