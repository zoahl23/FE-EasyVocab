import { useEffect, useState } from 'react';
import MainContent from '../MainContent';
import "./style.scss";
import { Button, Modal } from 'antd';
import { callListVocab } from '../../services/api';
import FlipCard from '../FlipCard';
import CustomNotification from '../Notification';

const LearningModal = (props) => {
    const { isVisible, onClose, topicId } = props;

    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [listVocab, setListVocab] = useState([]);

    // === Notification
    const [isOpen, setIsOpen] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false); // Biến để xác định đúng hay sai

    // Hàm toggle để hiển thị/ẩn thông báo
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    // Hàm để xác định đúng hay sai và thay đổi màu thông báo
    const handleAnswer = (isAnswerCorrect) => {
        setIsCorrect(isAnswerCorrect);  // Cập nhật giá trị isCorrect
        setIsOpen(true); // Mở thông báo
    };
    // === Notification

    useEffect(() => {
        handListVocab();
    }, [topicId]);

    const handListVocab = async () => {
        setIsLoading(true);
        const res = await callListVocab(`id=${topicId}`);
        if (res && res.data) {
            setListVocab(res.data);
        }
        setIsLoading(false);
    }

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
                            {/* <FlipCard
                                word="mother"
                                mean="mẹ (n)"
                                exam="a female parent: "
                                pron="/ˈmʌð.ɚ/"
                                audio="https://dictionary.cambridge.org/us/media/english/us_pron/m/mot/mothe/mother.mp3"
                            /> */}
                            <Button onClick={() => handleAnswer(true)} className="toggle-btn">
                                Đáp án đúng
                            </Button>
                            <Button onClick={() => handleAnswer(false)} className="toggle-btn">
                                Đáp án sai
                            </Button>
                            <CustomNotification
                                isOpen={isOpen}
                                togglePopup={togglePopup}
                                word="mother"
                                mean="mẹ (n)"
                                exam="a female parent: "
                                pron="/ˈmʌð.ɚ/"
                                audio="https://dictionary.cambridge.org/us/media/english/us_pron/m/mot/mothe/mother.mp3"
                                isCorrect={isCorrect}
                            />
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