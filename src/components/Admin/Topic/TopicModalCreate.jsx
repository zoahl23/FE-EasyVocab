import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Input, message, Modal, notification, Row, Select, Upload } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { callCreateATopic, callFetchAllCourse, callUploadTopicImg } from "../../../services/api";

const TopicModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [listCourse, setListCourse] = useState([]);

    const [loading, setLoading] = useState(false);

    const [dataImgTopic, setDataImgTopic] = useState();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');


    const [form] = Form.useForm();

    useEffect(() => {
        const fetchCourse = async () => {
            const res = await callFetchAllCourse();
            if (res && res.data) {
                const courses = res.data.map(item => {
                    return { label: item.courseName, value: item.id }
                })
                setListCourse(courses);
            }
        }
        fetchCourse();
    }, []);

    const onFinish = async (values) => {
        const { topicName, description, courseId } = values;

        setIsSubmit(true)

        const res = await callCreateATopic(topicName, description, courseId);
        // console.log(">>> check res topic", res);
        if (res && res.data) {
            if (dataImgTopic) {
                UploadImg(res.data.id, dataImgTopic);
            }
            else {
                message.success('Tạo mới chủ đề thành công');
                form.resetFields();
                setDataImgTopic();
                setOpenModalCreate(false);
                await props.fetchTopic();
            }
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false);
    };

    const UploadImg = async (id, file) => {
        const res = await callUploadTopicImg(id, file);
        if (res && res.data) {
            message.success('Tạo mới chủ đề thành công');
            form.resetFields();
            setDataImgTopic();
            setOpenModalCreate(false);
            await props.fetchTopic();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra với ảnh của bạn',
                description: res.message
            })
        }
    }

    // đọc và chuyển file thành base 64 để có thể xem trước
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    // phải là file ảnh và có kích thước < 2MB
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Chỉ cho phép tải lên các tệp có định dạng JPG hoặc PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Hình ảnh phải có kích thước nhỏ hơn 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };


    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
            });
        }
    };

    const handleUploadFile = ({ file, onSuccess }) => {
        setTimeout(() => {
            setDataImgTopic(file);
            onSuccess("ok");
        }, 1000);
    };

    const handlePreview = async (file) => {
        getBase64(file.originFileObj, (url) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };


    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD") // Tách các dấu khỏi ký tự
            .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
            .replace(/đ/g, "d").replace(/Đ/g, "D"); // Chuyển 'đ' thành 'd'
    };

    return (
        <>
            <Modal
                title="Thêm mới chủ đề"
                open={openModalCreate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    form.resetFields();
                    setOpenModalCreate(false);
                }}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
                width={"50vw"}
                maskClosable={false}
            >
                <Divider />
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tên chủ đề (EN)"
                                name="topicName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên chủ đề!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tên chủ đề (VI)"
                                name="description"
                                rules={[{ required: true, message: 'Vui lòng nhập tên chủ đề!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Chọn khóa học áp dụng"
                                name="courseId"
                            >
                                <Select
                                    defaultValue={null} // ko chọn giá trị nào
                                    showSearch // search
                                    allowClear // clear
                                    options={listCourse}
                                    filterOption={(input, option) =>
                                        removeVietnameseTones(option?.label ?? '')
                                            .toLowerCase()
                                            .includes(removeVietnameseTones(input.toLowerCase()))
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh chủ đề"
                                name="image"
                            >
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleUploadFile}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onRemove={() => setDataImgTopic()}
                                    onPreview={handlePreview}
                                    accept="image/jpeg, image/png"
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Tải lên</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
}

export default TopicModalCreate;