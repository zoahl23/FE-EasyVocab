import { Badge, Descriptions, Drawer } from "antd";
import moment from 'moment';
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import { useEffect, useState } from "react";

const SubscriptionViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
    const [colorSub, setColorSub] = useState("");
    const [textSub, setTextSub] = useState(dataViewDetail?.subscriptionPlan);

    useEffect(() => {
        translate();
    }, [dataViewDetail]);

    const translate = () => {
        switch (dataViewDetail?.subscriptionPlan) {
            case '6_months':
                setColorSub('success');
                setTextSub('6 tháng');
                break;
            case '1_year':
                setColorSub('processing');
                setTextSub('1 năm')
                break;
            case '3_years':
                setColorSub('warning');
                setTextSub('3 năm')
                break;
            default:
                setColorSub('default');
                setTextSub('không')
        }
    }

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    return (
        <>
            <Drawer
                title="Thông tin chi tiết"
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
                        <Badge status={colorSub} text={textSub} />
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