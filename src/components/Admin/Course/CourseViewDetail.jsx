import { Descriptions, Drawer } from "antd";
import moment from 'moment';
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";

const CourseViewDetail = (props) => {
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
                    title="Thông tin khoá học"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id" span={2}>{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên khóa học" span={2}>{dataViewDetail?.courseName}</Descriptions.Item>
                    <Descriptions.Item label="Mục tiêu" span={2}>{dataViewDetail?.courseTarget}</Descriptions.Item>
                    <Descriptions.Item label="Nội dung" span={2}>{dataViewDetail?.description}</Descriptions.Item>
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

export default CourseViewDetail;