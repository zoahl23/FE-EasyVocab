import { useEffect, useRef, useState } from 'react';
import MainContent from '../MainContent';
import { Input, Modal } from 'antd';
import { callListReview } from '../../services/api';
import CustomNotification from '../Notification';
import Loading from '../Loading';
import './style.scss';
import { HiSpeakerWave } from 'react-icons/hi2';

const ReviewModal = (props) => {
    const { isVisible, onClose } = props;
    const sound = useRef();
    // const navigate = useNavigate();

    const [isConfirmVisible, setIsConfirmVisible] = useState(false); // modal xác nhận thoát

    const [isLoading, setIsLoading] = useState(false);
    const [listVocab, setListVocab] = useState([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // chỉ mục câu hiện tại
    const [currentQuestion, setCurrentQuestion] = useState(null); // câu hiện tại

    const [incorrectQuestions, setIncorrectQuestions] = useState([]); // câu sai

    const [isCompleted, setIsCompleted] = useState(false); // hoàn thành bài học

    const [isOpen, setIsOpen] = useState(false); // mở thông báo đúng sai
    const [isCorrect, setIsCorrect] = useState(false); // xác định đúng hay sai

    const [vocabInput, setVocabInput] = useState("");

    const [selectedAnswer, setSelectedAnswer] = useState(null); // button được chọn

    const [isDisabled, setIsDisabled] = useState(false);

    const [animationClass, setAnimationClass] = useState(""); // hiệu ứng

    const [notificationData, setNotificationData] = useState(null);

    useEffect(() => {
        if (isVisible) {
            resetLearningState();
        }
    }, [isVisible]);

    const resetLearningState = () => {
        setCurrentQuestionIndex(0);
        setCurrentQuestion(null);
        setIncorrectQuestions([]);
        setIsCompleted(false);
        setIsOpen(false);
        setIsCorrect(false);
        setVocabInput("");
        setSelectedAnswer(null);
        setIsDisabled(false);
        setNotificationData(null);
        handleListVocab();
    };

    useEffect(() => {
        if (currentQuestionIndex === listVocab.length && incorrectQuestions.length === 0) {
            setIsCompleted(true);
        }
    }, [currentQuestionIndex, listVocab, incorrectQuestions]);

    const goToNextQuestion = () => {
        setAnimationClass("fade-out");

        setTimeout(() => {
            setVocabInput("");
            setSelectedAnswer(null);
            setIsDisabled(false);
            setNotificationData(null);

            if (currentQuestionIndex < listVocab.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
            } else if (incorrectQuestions.length > 0) {
                // console.log("Kết thúc câu hỏi chính, bắt đầu ôn lại câu sai.");
                setListVocab(incorrectQuestions);
                setCurrentQuestionIndex(0);
                setIncorrectQuestions([]);
            } else {
                // console.log("Đã hoàn thành tất cả các câu hỏi!");
                setIsCompleted(true);
            }

            // Thêm lớp fade-in sau khi câu hỏi thay đổi
            setAnimationClass("fade-in");
        }, 300); // 300ms là thời gian hiệu ứng fade-out
        // console.log(123, incorrectQuestions);
    };

    const handleAnswer = () => {
        const { correct } = currentQuestion;

        setIsCorrect(false);
        if (vocabInput) {
            if (vocabInput.toLowerCase().trim() === correct.word.toLowerCase()) {
                setIsCorrect(true);
            }
            else {
                setIncorrectQuestions((prev) => [...prev, currentQuestion]);
            }
        }
        else if (selectedAnswer) {
            if (selectedAnswer.id === correct.id) {
                setIsCorrect(true);
            } else {
                setIncorrectQuestions((prev) => [...prev, currentQuestion]);
            }
        }
        else {
            setIncorrectQuestions((prev) => [...prev, currentQuestion]);
        }

        setNotificationData(correct);

        setIsOpen(true);
        setIsDisabled(true);
    };

    const renderQuestion = () => {
        if (!currentQuestion) return null;

        const { type, correct, shuffledAnswers } = currentQuestion;

        switch (type) {
            case 1:
                return (
                    <>
                        <p className="title-content">Chọn audio phù hợp với nghĩa</p>
                        <p className="title-word">{correct.word}</p>
                        <div className="answer-select">
                            {shuffledAnswers.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        const sound = new Audio(option.audio);
                                        sound.play();
                                        setSelectedAnswer(option);
                                    }}
                                    className={`answer-option ${selectedAnswer === option ? 'selected' : ''}`}
                                    style={{ fontSize: 22 }}
                                    disabled={isDisabled}
                                >
                                    <HiSpeakerWave />
                                </button>
                            ))}
                        </div>
                        <div style={{ height: "15vh" }}></div>
                        <button
                            className="btn-next"
                            onClick={() => {
                                handleAnswer();
                            }}
                        >Kiểm tra</button>
                    </>
                );
            case 2:
                return (
                    <>
                        <p className="title-content">Chọn đáp án đúng</p>
                        <p className="title-word">{correct.word}</p>
                        <div className="answer-select">
                            {shuffledAnswers.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedAnswer(option);
                                    }}
                                    className={`answer-option ${selectedAnswer === option ? 'selected' : ''}`}
                                    disabled={isDisabled}
                                >
                                    {option.meaning}
                                </button>
                            ))}
                        </div>
                        <div style={{ height: "15vh" }}></div>
                        <button
                            className="btn-next"
                            onClick={() => {
                                handleAnswer();
                            }}
                        >Kiểm tra</button>
                    </>
                );
            case 3:
                return (
                    <>
                        <p className="title-content">Chọn từ phù hợp với nghĩa</p>
                        <p className="title-word">{correct.meaning}</p>
                        <div className="answer-select">
                            {shuffledAnswers.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedAnswer(option);
                                    }}
                                    className={`answer-option ${selectedAnswer === option ? 'selected' : ''}`}
                                    disabled={isDisabled}
                                >
                                    {option.word}
                                </button>
                            ))}
                        </div>
                        <div style={{ height: "15vh" }}></div>
                        <button
                            className="btn-next"
                            onClick={() => {
                                handleAnswer();
                            }}
                        >Kiểm tra</button>
                    </>
                );
            case 4:
                return (
                    <>
                        <p className="title-content">Điền từ</p>
                        <p className="text-answer">{correct.meaning}</p>
                        <Input.OTP
                            type="text"
                            length={correct.word.length}
                            value={vocabInput}
                            onChange={(text) => setVocabInput(text)}
                            size="large"
                            variant="outlined"
                            disabled={isDisabled}
                        />
                        <div style={{ height: "47vh" }}></div>
                        <button
                            className="btn-next"
                            onClick={() => {
                                handleAnswer();
                            }}
                        >Kiểm tra</button>
                    </>
                );
            case 5:
                return (
                    <>
                        <audio ref={sound} src={correct.audio} autoPlay />
                        <p className="title-content">Nghe và viết lại</p>
                        <div className="sound-btn">
                            <button
                                className="sound-btn__normal"
                                onClick={() => {
                                    sound.current.playbackRate = 1;
                                    sound.current.play()
                                }}
                                disabled={isDisabled}
                            >🔊</button>
                            <button
                                className="sound-btn__slow"
                                onClick={() => {
                                    sound.current.playbackRate = 0.5;
                                    sound.current.play()
                                }}
                                disabled={isDisabled}
                            >🐌</button>
                        </div>
                        <input
                            className="input-step2"
                            type="text"
                            value={vocabInput}
                            onChange={(e) => setVocabInput(e.target.value)}
                            disabled={isDisabled}
                        ></input>
                        <div style={{ height: "37vh" }}></div>
                        <button
                            className="btn-next"
                            onClick={() => {
                                handleAnswer();
                            }}
                        >Kiểm tra</button>
                    </>
                );
            case 6:
                return (
                    <>
                        <audio ref={sound} src={correct.audio} autoPlay />
                        <p className="title-content">Nghe và chọn đáp án đúng</p>
                        <div className="sound-btn">
                            <button
                                className="sound-btn__normal"
                                onClick={() => {
                                    sound.current.playbackRate = 1;
                                    sound.current.play()
                                }}
                                disabled={isDisabled}
                            >🔊</button>
                            <button
                                className="sound-btn__slow"
                                onClick={() => {
                                    sound.current.playbackRate = 0.5;
                                    sound.current.play()
                                }}
                                disabled={isDisabled}
                            >🐌</button>
                        </div>
                        <div className="answer-select">
                            {shuffledAnswers.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedAnswer(option);
                                    }}
                                    className={`answer-option ${selectedAnswer === option ? 'selected' : ''}`}
                                    disabled={isDisabled}
                                >
                                    {option.meaning}
                                </button>
                            ))}
                        </div>
                        <div style={{ height: "11vh" }}></div>
                        <button
                            className="btn-next"
                            onClick={() => {
                                handleAnswer();
                            }}
                        >Kiểm tra</button>
                    </>
                );
            default:
                return <p>Không xác định loại câu hỏi.</p>;
        }
    };

    useEffect(() => {
        if (listVocab.length > 0) {
            setCurrentQuestion(listVocab[currentQuestionIndex]);
        }
    }, [listVocab, currentQuestionIndex]);

    useEffect(() => {
        if (isVisible) {
            handleListVocab();
        }
    }, [isVisible])

    const handleListVocab = async () => {
        setIsLoading(true);
        const res = await callListReview();
        if (res && res.data) {
            // console.log("Data fetched:", res.data);

            const shuffledData = res.data.map((question) => {
                const { incorrect, correct } = question;

                // Trộn đáp án
                const shuffledAnswers = [...incorrect, correct].sort(() => Math.random() - 0.5);

                // Gắn thêm danh sách đã trộn vào câu hỏi
                return {
                    ...question,
                    shuffledAnswers,
                };
            });

            // console.log("Shuffle data:", shuffledData);
            setListVocab(shuffledData);
        }
        setIsLoading(false);
    }

    if (!isVisible) return null;

    return (
        <>
            <div className="overlay-review">
                <div className="container-review">
                    <MainContent>
                        {isLoading ? (
                            <Loading />
                        ) : isCompleted ? (
                            <div className="completed-message">
                                <h2>Chúc mừng! Bạn đã hoàn thành bài ôn tập.</h2>
                                <button onClick={onClose}>Kết thúc</button>
                            </div>
                        ) : (
                            <div className="content">
                                <button className="closeButton" onClick={() => { setIsConfirmVisible(true) }}>×</button>
                                <div className={`content ${animationClass}`}>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 auto" }}>
                                        {renderQuestion()}
                                    </div>
                                </div>

                                <CustomNotification
                                    isOpen={isOpen}
                                    togglePopup={() => {
                                        setIsOpen(!isOpen);
                                        goToNextQuestion();
                                    }}
                                    word={notificationData?.word}
                                    mean={notificationData?.meaning}
                                    exam={notificationData?.exampleSentence}
                                    pron={notificationData?.pronunciation}
                                    audio={notificationData?.audio}
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
                className="custom-confirm-modal"
            >
                <p>Làm nốt bài đi. Thoát bây giờ là toàn bộ kết quả học không được lưu lại đó 😭</p>
            </Modal>
        </>
    );
}

export default ReviewModal;