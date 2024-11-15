import { useEffect, useState } from 'react';
import MainContent from '../MainContent';
import "./style.scss";
import { Modal } from 'antd';

const LearningModal = ({ isVisible, onClose }) => {

    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isVisible) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        // thêm sự kiện khi cố gắng thoát khỏi trang
        window.addEventListener('beforeunload', handleBeforeUnload);

        // xóa sự kiện khi không cần thiết
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <div className="overlay">
                <div className="container">
                    <MainContent>
                        <div className="content">
                            <button className="closeButton" onClick={() => { setIsConfirmVisible(true) }}>×</button>
                            <h2>Đây là giao diện học từ vựng!sdadsdddddddddddddddđ</h2>
                            <p>Nội dung học từ sẽ xuất hiện tại đây.</p>
                        </div>
                    </MainContent>

                </div>
            </div>
            <Modal
                title="Bạn có chắc muốn thoát"
                open={isConfirmVisible}
                onOk={() => {
                    setIsConfirmVisible(false);
                    onClose();
                }}
                onCancel={() => {
                    setIsConfirmVisible(false);
                }}
                okText="Xác nhận"
                cancelText="Hủy"
                closeIcon={false}
                width={300}
                centered
            >
                <p>Thoát bây giờ là toàn bộ kết quả học không được lưu lại đó. 😭😭😭</p>
            </Modal>
        </>
    );
}

export default LearningModal;