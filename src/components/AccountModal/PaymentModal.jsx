import { Modal, Button, Radio, message } from 'antd';
import { useState } from 'react';
import { callPayment } from '../../services/api';

const PaymentModal = ({ isVisible, onClose }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handlePayment = async () => {

        if (!selectedPlan) {
            message.warning('Vui lòng chọn một gói dịch vụ!');
            return;
        }

        const res = await callPayment(selectedPlan);
        if (res && res.data) {
            message.success('Chuyển đến trang thanh toán...');
            window.location.href = res.data
        }
    };

    const handleCloseModal = () => {
        setSelectedPlan(null); // Reset lựa chọn gói dịch vụ
        onClose();
    };

    return (
        <Modal
            title="Nâng cấp gói dịch vụ"
            open={isVisible}
            onCancel={handleCloseModal}
            maskClosable={false}
            footer={[
                <Button key="cancel" onClick={handleCloseModal}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handlePayment}>
                    Thanh toán
                </Button>,
            ]}
            centered
        >
            <Radio.Group
                onChange={(e) => setSelectedPlan(e.target.value)}
                value={selectedPlan}
                style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 20 }}
            >
                <Radio value="399000">Gói 6 tháng - 399,000đ</Radio>
                <Radio value="699000">Gói 1 năm - 699,000đ</Radio>
                <Radio value="1199000">Gói 3 năm - 1,199,000đ</Radio>
            </Radio.Group>
        </Modal>
    );
};

export default PaymentModal;
