import { useRef, useState } from 'react';
import './style.scss';

const FlipCard = (props) => {
    const { word, mean, exam, pron, audio } = props;
    const [flipped, setFlipped] = useState(false);
    const soundWind = useRef(null);
    const soundEng = useRef(null);

    const handleCardClick = () => {
        setFlipped(!flipped);
        soundWind.current.play();
    };

    const playNormal = () => {
        soundEng.current.playbackRate = 1;
        soundEng.current.play();
    };

    const playSlow = () => {
        soundEng.current.playbackRate = 0.5;
        soundEng.current.play();
    };


    return (
        <>
            <div className="card-container">
                <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleCardClick}>
                    <div className="card-front">
                        <div className="sound-btn">
                            <button
                                className="sound-btn__normal"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playNormal();
                                }}
                            >🔊</button>
                            <button
                                className="sound-btn__slow"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playSlow();
                                }}
                            >🐌</button>
                        </div>
                        <b>{word}</b>
                        <p>{exam}</p>
                    </div>
                    <div className="card-back">
                        <div className="sound-btn">
                            <button
                                className="sound-btn__normal"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playNormal();
                                }}
                            >🔊</button>
                            <button
                                className="sound-btn__slow"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playSlow();
                                }}
                            >🐌</button>
                        </div>
                        <b>{word}</b>
                        <p className="pron">{pron}</p>
                        <p className="mean">{mean}</p>
                    </div>
                </div>
                <audio ref={soundWind} src={'https://learn.mochidemy.com/audios/Flip_flashcard.mp3'} />
                <audio ref={soundEng} src={audio} />
            </div>
        </>
    );
};

export default FlipCard;