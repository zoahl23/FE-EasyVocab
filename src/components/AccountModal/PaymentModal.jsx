import { Modal, Button, Radio, message } from 'antd';
import { useState } from 'react';
import { callPayment } from '../../services/api';
import { useSelector } from 'react-redux';

const PaymentModal = ({ isVisible, onClose }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const paid = useSelector((state) => state.account.user.paid);

    const getDiscountedPrice = (originalPrice, planType) => {
        if (paid === 0) {
            switch (planType) {
                case '6_months':
                    return 499000;
                case '1_year':
                    return 899000;
                case '3_years':
                    return 1299000;
                default:
                    return originalPrice;
            }
        } else if (paid === 1) {
            switch (planType) {
                case '6_months':
                    return 299000;
                case '1_year':
                    return 699000;
                case '3_years':
                    return 999000;
                default:
                    return originalPrice;
            }
        }
        return originalPrice;
    };

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
                <Radio value={getDiscountedPrice(599000, '6_months')}>
                    Gói 6 tháng - &nbsp;
                    <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: 8 }}>
                        599,000đ
                    </span>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                        {new Intl.NumberFormat('vi-VN').format(getDiscountedPrice(599000, '6_months'))}đ
                    </span>
                </Radio>
                <Radio value={getDiscountedPrice(999000, '1_year')}>
                    Gói 1 năm - &nbsp;
                    <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: 8 }}>
                        999,000đ
                    </span>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                        {new Intl.NumberFormat('vi-VN').format(getDiscountedPrice(999000, '1_year'))}đ
                    </span>
                </Radio>
                <Radio value={getDiscountedPrice(1399000, '3_years')}>
                    Gói 3 năm - &nbsp;
                    <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: 8 }}>
                        1,399,000đ
                    </span>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                        {new Intl.NumberFormat('vi-VN').format(getDiscountedPrice(1399000, '3_years'))}đ
                    </span>
                </Radio>
            </Radio.Group>
        </Modal>
    );
};

export default PaymentModal;
