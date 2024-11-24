import { Modal, Button, Radio, message } from 'antd';
import { useState } from 'react';

const PaymentModal = ({ isVisible, onClose }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handlePayment = () => {
        if (!selectedPlan) {
            message.warning('Vui lòng chọn một gói dịch vụ!');
            return;
        }

        // Giả lập call API trả về link thanh toán
        const paymentUrl = `https://payment.example.com/${selectedPlan}`;
        message.success('Chuyển đến trang thanh toán...');
        window.location.href = paymentUrl; // Redirect đến link thanh toán
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
                <Radio value="6_months">Gói 6 tháng - 399,000đ</Radio>
                <Radio value="1_year">Gói 1 năm - 699,000đ</Radio>
                <Radio value="3_years">Gói 3 năm - 1,199,000đ</Radio>
            </Radio.Group>
        </Modal>
    );
};

export default PaymentModal;
