import { Badge, Descriptions, Drawer } from "antd";
import moment from 'moment';
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";

const SubscriptionViewDetail = (props) => {
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
                    title="Thông tin user"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.userId}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataViewDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={2}>{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Gói đăng ký" span={2}>
                        <Badge status="processing" text={dataViewDetail?.subscriptionPlan} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày đăng ký">
                        {moment(dataViewDetail?.subscriptionStartDate).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày hết hạn">
                        {moment(dataViewDetail?.subscriptionEndDate).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default SubscriptionViewDetail;