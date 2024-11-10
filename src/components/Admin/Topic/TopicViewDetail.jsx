import { Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import moment from 'moment';
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const TopicViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    useEffect(() => {
        fetchImage();
    }, [dataViewDetail]);

    const fetchImage = () => {
        let imgTopic = {
            uid: '-1',
            name: 'image.png',
            status: 'error',
            url: '',
        };

        if (dataViewDetail?.image) {
            imgTopic = {
                uid: uuidv4(),
                name: dataViewDetail.image.split('/').pop().split('?')[0],
                status: 'done',
                url: dataViewDetail.image,
            }
        }

        setFileList([imgTopic]);
    }

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    title="Thông tin chủ đề"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id" span={2}>{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên chủ đề (EN)" span={2}>{dataViewDetail?.topicName}</Descriptions.Item>
                    <Descriptions.Item label="Tên chủ đề (VI)" span={2}>{dataViewDetail?.description}</Descriptions.Item>
                    <Descriptions.Item label="Khóa học" span={2}>
                        {dataViewDetail?.course?.courseName || ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {moment(dataViewDetail?.createdAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">
                        {moment(dataViewDetail?.updatedAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                </Descriptions>
                <Divider orientation="left" > Ảnh chủ đề </Divider>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={
                        { showRemoveIcon: false }
                    }
                >
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Drawer>
        </>
    )
}

export default TopicViewDetail;