import { useEffect, useRef, useState } from 'react';
import MainContent from '../MainContent';
import "./style.scss";
import { Input, Modal, notification } from 'antd';
import { callListVocab, callSaveVocab } from '../../services/api';
import FlipCard from '../FlipCard';
import CustomNotification from '../Notification';
import Loading from '../Loading';
import VocabSelector from '../VocabSelector';
import { useNavigate } from 'react-router-dom';

const LearningModal = (props) => {
    const { isVisible, onClose, topicId } = props;
    const sound = useRef();

    const navigate = useNavigate();

    const [isConfirmVisible, setIsConfirmVisible] = useState(false); // modal xác nhận thoát

    const [isLoading, setIsLoading] = useState(false);
    const [listVocab, setListVocab] = useState([]);

    const [step, setStep] = useState(0);
    const [vocabRender, setVocabRender] = useState([]);

    const [iteratorQuestion, setIteratorQuestion] = useState(0);
    const [iteratorError, setIteratorError] = useState(0);
    const [isReviewingErrors, setIsReviewingErrors] = useState(false); // xem đang duyệt list vocab hay list error

    const [isCompleted, setIsCompleted] = useState(false); // hoàn thành bài học

    const [vocabInput, setVocabInput] = useState("");
    const [vocabOTP, setVocabOTP] = useState("");

    const [isOpen, setIsOpen] = useState(false); // mở thông báo đúng sai
    const [isCorrect, setIsCorrect] = useState(false); // xác định đúng hay sai

    const [disabledInput, setDisabledInput] = useState(false);
    const [disabledOTP, setDisabledOTP] = useState(false);
    const [questionErrors, setQuestionErrors] = useState([]);

    const [animationClass, setAnimationClass] = useState(""); // hiệu ứng

    useEffect(() => {
        if (isVisible) {
            resetLearningState();
        }
    }, [isVisible]);

    const resetLearningState = () => {
        setStep(0);
        setVocabInput("");
        setVocabOTP("");
        setDisabledInput(false);
        setDisabledOTP(false);
        setIteratorQuestion(0);
        setIteratorError(0);
        setIsReviewingErrors(false);
        setIsCompleted(false);
        setQuestionErrors([]);
        setIsOpen(false);
        setIsCorrect(false);
        setAnimationClass("");
        handListVocab();
    };

    const handleSubmission = (selectedWord) => {
        console.log("Từ vựng đã chọn:", selectedWord);
        // Xử lý logic lưu từ vựng vào hệ thống
        saveVocab(selectedWord);
    };

    const saveVocab = async (listId) => {
        const res = await callSaveVocab(listId);
        if (res && res.data) {
            setIsConfirmVisible(false); // Đóng Modal
            onClose();
            navigate(`/learn/${topicId}`);
        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
    }

    const handleNextStep = () => {
        setAnimationClass("fade-out"); // bắt đầu hiệu ứng fade-out
        setTimeout(() => {
            setStep((prev) => prev + 1); // chuyển sang bước tiếp theo
            setAnimationClass("fade-in"); // hiệu ứng fade-in cho bước mới
        }, 300); // 300ms phải khớp với thời gian animation trong CSS
    };

    const handleNextCard = () => {
        setAnimationClass("fade-out"); // bắt đầu hiệu ứng fade-out
        setTimeout(() => {
            setStep((prev) => prev + 3); // chuyển sang bước tiếp theo
            setAnimationClass("fade-in"); // hiệu ứng fade-in cho bước mới
        }, 300); // 300ms phải khớp với thời gian animation trong CSS
    };

    const togglePopup = () => { // ẩn hiện thông báo
        // setStep(step + 1);
        handleNextStep();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (topicId) {
            handListVocab();
        }
    }, [topicId]);

    const handleInputChange = (e) => {
        setVocabInput(e.target.value);
    };

    const handleInputOTPChange = (text) => {
        setVocabOTP(text);
    };

    const handleNextStep2 = () => {
        if (vocabInput.toLowerCase().trim() === vocabRender.word.toLowerCase()) {
            setIsCorrect(true);
        }
        else {
            setIsCorrect(false);
            setQuestionErrors((prevErrors) => [...prevErrors, vocabRender]);
        }
        setIsOpen(true);
        setDisabledInput(true);
    }

    const handleNextStep3 = () => {
        if (vocabOTP.toLowerCase() === vocabRender.word.toLowerCase()) {
            setIsCorrect(true);
        }
        else {
            if (isCorrect) {
                setIsCorrect(false);
                setQuestionErrors((prevErrors) => [...prevErrors, vocabRender]);
            }
        }
        setIsOpen(true);
        setDisabledOTP(true);
    }

    useEffect(() => {
        if (isCompleted) {
            // console.log("All questions reviewed!");
            setStep(4);
        }

        if (step === 0) {
            if (!isReviewingErrors && listVocab.length > 0) {
                setVocabRender(listVocab[iteratorQuestion]);
            }
            else if (isReviewingErrors && questionErrors.length > 0) {
                setVocabRender(questionErrors[iteratorError]);
            }
        }
        if (step === 3) {
            setStep(0);
            setVocabInput("");
            setVocabOTP("");
            setDisabledInput(false);
            setDisabledOTP(false);
            if (!isReviewingErrors && iteratorQuestion < listVocab.length - 1) {
                setIteratorQuestion(iteratorQuestion + 1);
            }
            else if (!isReviewingErrors && iteratorQuestion >= listVocab.length - 1) {
                if (questionErrors.length > 0) {
                    setIsReviewingErrors(true);
                    setIteratorError(0);
                }
                else {
                    // console.log("No errors to review. Completed!");
                    setIsCompleted(true); // hoàn tất
                }
            }
            else if (isReviewingErrors && iteratorError < questionErrors.length - 1) {
                setIteratorError(iteratorError + 1);
            }
            else if (isReviewingErrors && iteratorError >= questionErrors.length - 1) {
                // console.log("Reviewed all errors!");
                setIsCompleted(true); // hoàn tất
            }
        }
        // console.log("check erorr", questionErrors);
    }, [step, listVocab, iteratorQuestion, isReviewingErrors, iteratorError]);

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
                setIsConfirmVisible(true); // Hiển thị modal xác nhận
                return ""; // Trình duyệt hiển thị hộp thoại mặc định
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
                        {isLoading && <Loading />}
                        {step === 4 ? (
                            <>
                                <VocabSelector vocabularies={listVocab} onSubmit={handleSubmission} />
                            </>
                        ) : (
                            <div className="content">
                                <button className="closeButton" onClick={() => { setIsConfirmVisible(true) }}>×</button>
                                <div className={`content ${animationClass}`}>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 auto" }}>
                                        {
                                            step === 0 ? (
                                                <>
                                                    <FlipCard
                                                        word={vocabRender.word}
                                                        mean={vocabRender.meaning}
                                                        exam={vocabRender.exampleSentence}
                                                        pron={vocabRender.pronunciation}
                                                        audio={vocabRender.audio}
                                                    />
                                                    <button
                                                        className="btn-next"
                                                        onClick={() => {
                                                            // setStep(step + 1);
                                                            handleNextStep();
                                                        }}
                                                    >Tiếp tục</button>
                                                    <p
                                                        className="btn-cancel"
                                                        onClick={() => {
                                                            // setStep(step + 3);
                                                            handleNextCard();
                                                        }}
                                                    >Mình đã thuộc từ này</p>
                                                </>
                                            ) : step === 1 ? (
                                                <>
                                                    <audio ref={sound} src={vocabRender.audio} autoPlay />
                                                    <p className="title-content">Nghe và viết lại</p>
                                                    <div className="sound-btn">
                                                        <button
                                                            className="sound-btn__normal"
                                                            onClick={() => {
                                                                sound.current.playbackRate = 1;
                                                                sound.current.play()
                                                            }}
                                                            disabled={disabledInput}
                                                        >🔊</button>
                                                        <button
                                                            className="sound-btn__slow"
                                                            onClick={() => {
                                                                sound.current.playbackRate = 0.5;
                                                                sound.current.play()
                                                            }}
                                                            disabled={disabledInput}
                                                        >🐌</button>
                                                    </div>
                                                    <input
                                                        className="input-step2"
                                                        type="text"
                                                        value={vocabInput}
                                                        onChange={(e) => handleInputChange(e)}
                                                        disabled={disabledInput}
                                                    ></input>
                                                    <div style={{ height: "35vh" }}></div>
                                                    <button
                                                        className="btn-next"
                                                        onClick={() => {
                                                            handleNextStep2();
                                                        }}
                                                    >Kiểm tra</button>
                                                </>
                                            ) : step === 2 ? (
                                                <>
                                                    <p className="title-content">Điền từ</p>
                                                    <p className="text-answer">{vocabRender.meaning}</p>
                                                    <Input.OTP
                                                        type="text"
                                                        length={vocabRender.word.length}
                                                        onChange={(text) => handleInputOTPChange(text)}
                                                        size="large"
                                                        variant="outlined"
                                                        disabled={disabledOTP}
                                                    />
                                                    <div style={{ height: "50vh" }}></div>
                                                    <button
                                                        className="btn-next"
                                                        onClick={() => {
                                                            handleNextStep3();
                                                        }}
                                                    >Kiểm tra</button>
                                                </>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <CustomNotification
                                    isOpen={isOpen}
                                    togglePopup={togglePopup}
                                    word={vocabRender.word}
                                    mean={vocabRender.meaning}
                                    exam={vocabRender.exampleSentence}
                                    pron={vocabRender.pronunciation}
                                    audio={vocabRender.audio}
                                    isCorrect={isCorrect}
                                />
                            </div>
                        )}
                    </MainContent>
                </div>
            </div>

            <Modal
                open={isConfirmVisible}
                onOk={() => {
                    setIsConfirmVisible(false);
                }}
                onCancel={() => {
                    setIsConfirmVisible(false);
                    onClose();
                }}
                cancelText="Thoát"
                okText="Tiếp tục học"
                closeIcon={false}
                centered
                width={400}
                maskClosable={false}
            >
                <p>Làm nốt bài đi. Thoát bây giờ là toàn bộ kết quả học không được lưu lại đó 😭</p>
            </Modal>
        </>
    );
}

export default LearningModal;