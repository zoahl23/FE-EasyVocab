import { Descriptions, Drawer } from "antd";
import moment from 'moment';
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";

const VocabViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
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
                    title="Thông tin từ vựng"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id" span={2}>{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Từ vựng">{dataViewDetail?.word}</Descriptions.Item>
                    <Descriptions.Item label="Nghĩa của từ">{dataViewDetail?.meaning}</Descriptions.Item>
                    <Descriptions.Item label="Định nghĩa" span={2}>{dataViewDetail?.exampleSentence}</Descriptions.Item>
                    <Descriptions.Item label="Phiên âm" span={2}>{dataViewDetail?.pronunciation}</Descriptions.Item>
                    <Descriptions.Item label="Phát âm" span={2}>
                        {dataViewDetail?.audio ? (
                            <audio controls>
                                <source src={dataViewDetail?.audio} type="audio/mpeg" />
                                Trình duyệt của bạn không hỗ trợ phát âm thanh.
                            </audio>
                        ) : (
                            "Không có âm thanh"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Chủ đề" span={2}>{dataViewDetail?.topic?.topicName || ""}</Descriptions.Item>
                    <Descriptions.Item label="Khóa học" span={2}>{dataViewDetail?.topic?.course?.courseName || ""}</Descriptions.Item>
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

export default VocabViewDetail;