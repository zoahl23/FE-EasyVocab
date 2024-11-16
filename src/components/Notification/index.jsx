import { useRef } from 'react';
import './style.scss';

const CustomNotification = (props) => {
    const { isOpen, togglePopup, word, pron, mean, exam, audio, isCorrect } = props;
    const soundEng = useRef(null);

    const notificationBackground = isCorrect ? '#23AC38' : '#EB5757';

    return (
        <div className="notification-wrapper">
            {isOpen && (
                <div className="notification" style={{ backgroundColor: notificationBackground }}>
                    <audio src={audio} autoPlay />
                    <audio ref={soundEng} src={audio} />
                    <div className="notification-content">
                        <div className="text-content">
                            <button
                                className="audio-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    soundEng.current.play();
                                }}
                            >🔊</button>
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
                        <button className="icon" style={{ backgroundColor: notificationBackground }}>🚨</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomNotification;