import { Modal, Select, Button, message, Radio } from "antd";
import { useEffect, useState } from "react";
import { callUpdateFeedback, callRejectedFeedback } from "../../../services/api";

const FeedbackModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(null);

    const handleUpdate = async () => {
        if (!action) {
            message.warning("Vui lòng chọn một hành động trước khi xác nhận!");
            return;
        }
        setLoading(true);
        let res;
        if (action === "accept") {
            res = await callUpdateFeedback(dataUpdate.id);
        } else if (action === "reject") {
            res = await callRejectedFeedback(dataUpdate.id);
        }

        if (res && res.data) {
            message.success("Cập nhật trạng thái thành công!");
            setAction(null);
            setOpenModalUpdate(false);
            await props.fetchFeedback();
        } else {
            message.error(res.message || "Không thể cập nhật trạng thái!");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!openModalUpdate) {
            setAction(null);
        }
    }, [openModalUpdate])

    return (
        <Modal
            title="Cập nhật"
            open={openModalUpdate}
            onCancel={() => setOpenModalUpdate(false)}
            onOk={() => {
                handleUpdate();
            }}
            okText={"Xác nhận"}
            cancelText={"Hủy"}
            confirmLoading={loading}
            maskClosable={false}
            width={210}
            centered
            closeIcon={false}
        >
            <Radio.Group
                onChange={(e) => setAction(e.target.value)}
                value={action}
                style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: 20, marginBottom: 20, gap: "10px" }}
            >
                {dataUpdate?.status === 0 && (
                    <>
                        <Radio value="accept">Duyệt phản hồi</Radio>
                        <Radio value="reject">Từ chối</Radio>
                    </>
                )}
                {dataUpdate?.status === 1 && (
                    <Radio value="accept">Đã xử lý</Radio>
                )}
            </Radio.Group>
        </Modal>
    );
};

export default FeedbackModalUpdate;
