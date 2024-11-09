import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Input, message, Modal, notification, Row, Select, Upload } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { callFetchAllCourse } from "../../../services/api";

const TopicModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [listCourse, setListCourse] = useState([]);

    const [loading, setLoading] = useState(false);

    const [imageUrl, setImageUrl] = useState("");

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

    // const onFinish = async (values) => {
    //     const { fullName, password, email, phone } = values;
    //     setIsSubmit(true)
    //     const res = await callCreateAUser(fullName, password, email, phone);
    //     if (res && res.data) {
    //         message.success('Tạo mới user thành công');
    //         form.resetFields();
    //         setOpenModalCreate(false);
    //         await props.fetchBook()
    //     } else {
    //         notification.error({
    //             message: 'Đã có lỗi xảy ra',
    //             description: res.message
    //         })
    //     }
    //     setIsSubmit(false)
    // };

    const onFinish = () => {
        console.log('hello');
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
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
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
                setImageUrl(url);
            });
        }
    };


    const handleUploadFile = ({ file, onSuccess, onError }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
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
                onCancel={() => setOpenModalCreate(false)}
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
                                name="courses"
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
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}

export default TopicModalCreate;