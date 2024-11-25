import { useEffect, useRef, useState } from 'react';
import audioCorrect from '../../../public/correct_answer.mp3';
import audioIncorrect from '../../../public/incorrect_answer.mp3';
import './style.scss';
import { LuFlag } from 'react-icons/lu';
import { HiMiniSpeakerWave } from 'react-icons/hi2';
import { Modal, Input, Button, Form, message } from 'antd';
import { callCreateFeedback } from '../../services/api';

const { TextArea } = Input;

const CustomNotification = (props) => {
    const { isOpen, togglePopup, word, pron, mean, exam, audio, isCorrect } = props;
    const soundEng = useRef(null);
    const correctSound = useRef(null);
    const incorrectSound = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);

    const listBtn = [
        "Audio",
        "Từ tiếng Anh",
        "Nghĩa tiếng Việt",
        "Phiên âm",
        "Câu ví dụ tiếng Anh",
        "Câu ví dụ tiếng Việt",
        "Vấn đề khác",
    ];

    const handleButtonClick = (index) => {
        setSelectedButton(index); // Lưu chỉ số của nút được chọn
        console.log(111, index);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (selectedButton === null) {
            message.error("Vui lòng chọn loại lỗi bạn gặp phải!");
            return;
        }

        if (!value.trim()) {
            message.error("Vui lòng mô tả chi tiết lỗi!");
            return;
        }

        handleCreateFeeback(selectedButton, value);
        // console.log(111, selectedButton);
        // console.log(112, value);
        // handleCancel();
    };

    const handleCreateFeeback = async (formType, content) => {
        const res = await callCreateFeedback(formType, content);

        if (res && res.data) {
            message.success("Gửi phản hồi thành công!");
            handleCancel();
        }
    }

    const handleCancel = () => {
        setSelectedButton(null);
        setValue('');
        setIsModalOpen(false);
    };

    const notificationBackground = isCorrect ? '#23AC38' : '#EB5757';

    useEffect(() => {
        if (isOpen) {
            if (isCorrect && correctSound.current) {
                correctSound.current.play();
            } else if (!isCorrect && incorrectSound.current) {
                incorrectSound.current.play();
            }
        }
    }, [isCorrect, isOpen]);

    return (
        <>
            <div className="notification-wrapper">
                {isOpen && (
                    <div className="notification" style={{ backgroundColor: notificationBackground }}>
                        <audio ref={soundEng} src={audio} />
                        <audio ref={correctSound} src={audioCorrect} />
                        <audio ref={incorrectSound} src={audioIncorrect} />
                        <div className="notification-content">
                            <div className="text-content">
                                <button
                                    className="audio-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        soundEng.current.play();
                                    }}
                                ><HiMiniSpeakerWave /></button>
                                <div>
                                    <b className="word">{word}</b>
                                    <p className="pron">{pron}</p>
                                    <p className="mean">{mean}</p>
                                    <p className="exam">{exam}</p>
                                </div>
                            </div>
                            <div className="continue-button">
                                <button onClick={togglePopup}>Tiếp tục</button>
                            </div>
                            <button
                                className="icon"
                                style={{ backgroundColor: notificationBackground }}
                                onClick={showModal}
                            ><LuFlag /></button>
                        </div>
                    </div>
                )}
            </div>
            <Modal
                title="Bạn đang gặp vấn đề gì nhỉ?"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                maskClosable={false}
                className="custom-confirm-modal"
            >
                <div className="main-problem">
                    <div className="problem">
                        {listBtn.map((label, index) => (
                            <Button
                                key={index}
                                className={`problem-button ${selectedButton === index ? "selected" : ""}`}
                                onClick={() => handleButtonClick(index)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                    <TextArea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Mô tả chi tiết lỗi bạn gặp phải"
                        autoSize={{ minRows: 4, maxRows: 4 }}
                    />
                </div>
            </Modal>
        </>
    );
};

export default CustomNotification;