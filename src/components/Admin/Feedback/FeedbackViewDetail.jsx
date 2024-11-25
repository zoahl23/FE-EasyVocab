import { Badge, Descriptions, Drawer } from "antd";
import moment from 'moment';
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";

const FeedbackViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    const typeMap = {
        0: { text: "Audio", color: "magenta" },
        1: { text: "Từ tiếng Anh", color: "geekblue" },
        2: { text: "Nghĩa tiếng Việt", color: "gold" },
        3: { text: "Phiên âm", color: "purple" },
        4: { text: "Câu ví dụ tiếng Anh", color: "cyan" },
        5: { text: "Câu ví dụ tiếng Việt", color: "lime" },
        6: { text: "Vấn đề khác", color: "volcano" },
    };

    const statusMap = {
        0: { text: "Chờ xử lý", color: "warning" },
        1: { text: "Đang xử lý", color: "processing" },
        2: { text: "Đã xử lý", color: "success" },
        3: { text: "Từ chối", color: "error" },
    };

    return (
        <>
            <Drawer
                title="Thông tin chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    title="Thông tin phản hồi"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id" span={2}>{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={2}>{dataViewDetail?.user.email}</Descriptions.Item>
                    <Descriptions.Item label="Loại phản hồi">
                        {typeMap[dataViewDetail?.formType] ? (
                            <Badge
                                color={typeMap[dataViewDetail?.formType]?.color}
                                text={typeMap[dataViewDetail?.formType]?.text}
                            />
                        ) : (
                            "Không xác định"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {statusMap[dataViewDetail?.status] ? (
                            <Badge
                                status={statusMap[dataViewDetail?.status]?.color}
                                text={statusMap[dataViewDetail?.status]?.text}
                            />
                        ) : (
                            "Không xác định"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nội dung" span={2}>{dataViewDetail?.content}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {moment(dataViewDetail?.createdAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">
                        {moment(dataViewDetail?.updatedAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default FeedbackViewDetail;