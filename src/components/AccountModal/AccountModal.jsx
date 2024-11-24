import { useState } from 'react';
import { Modal, Button, Descriptions, Divider } from 'antd';
import ChangePassModal from './ChangePassModal'; // Modal đổi mật khẩu
import PaymentModal from './PaymentModal'; // Modal thanh toán
import { FORMAT_DATE_DISPLAY } from "../../utils/constant";
import moment from 'moment';

const AccountModal = ({ isVisible, onClose, userData }) => {
    const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);


    const planTranslations = {
        '6_months': '6 tháng',
        '1_year': '1 năm',
        '3_years': '3 năm',
    };
    // gói dịch vụ
    const currentSub =
        userData?.subscriptionPlan === 'none'
            ? 'Chưa đăng ký'
            : planTranslations[userData?.subscriptionPlan] || 'Chưa đăng ký';

    // ngày hết hạn
    const dateSub =
        userData?.subscriptionEndDate
            ? moment(userData?.subscriptionEndDate).format(FORMAT_DATE_DISPLAY)
            : "Không có";

    return (
        <Modal
            title="Thông tin tài khoản"
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width={600}
            centered
        >
            {/* Phần thông tin tài khoản */}
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Họ và tên">{userData?.fullName || 'Chưa cập nhật'}</Descriptions.Item>
                <Descriptions.Item label="Email">{userData?.email || 'Chưa có email'}</Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">{moment(userData?.createdAt).format(FORMAT_DATE_DISPLAY) || 'Chưa cập nhật'}</Descriptions.Item>
                <Descriptions.Item label="Gói dịch vụ">{currentSub}</Descriptions.Item>
                <Descriptions.Item label="Ngày hết hạn gói">{dateSub}</Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Các hành động */}
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button type="primary" onClick={() => setIsChangePasswordVisible(true)}>
                    Đổi mật khẩu
                </Button>
                <Button type="primary" onClick={() => setIsPaymentModalVisible(true)}>
                    Nâng cấp gói dịch vụ
                </Button>
            </div>

            {/* Modal đổi mật khẩu */}
            <ChangePassModal
                isVisible={isChangePasswordVisible}
                onClose={() => setIsChangePasswordVisible(false)}
            />

            {/* Modal thanh toán */}
            <PaymentModal
                isVisible={isPaymentModalVisible}
                onClose={() => setIsPaymentModalVisible(false)}
                userData={userData}
            />
        </Modal>
    );
};

export default AccountModal;
