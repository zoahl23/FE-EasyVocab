import { Progress } from 'antd';
import './style.scss';

const ResultSummary = ({ correctAnswers, incorrectAnswers, totalQuestions, onContinue }) => {

    // Lọc correctAnswers để loại bỏ các phần tử đã tồn tại trong incorrectAnswers
    const filteredCorrectAnswers = correctAnswers.filter(
        (correctItem) => !incorrectAnswers.some(
            (incorrectItem) => incorrectItem.correct.word === correctItem.correct.word
        )
    );

    const correctCount = Math.round(correctAnswers.length - incorrectAnswers.length);
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    return (
        <div className="result-summary">
            <h2>Bạn đã hoàn thành bài ôn tập!</h2>
            <div className="result-circle">
                <Progress
                    type="circle"
                    percent={percentage}
                />
            </div>
            <p>Bạn đã trả lời đúng {correctCount}/{totalQuestions} câu</p>
            <div className="result-details">
                {incorrectAnswers.map((item, index) => (
                    <div className="result-item incorrect" key={index}>
                        <div className="item-1">
                            <span className="icon">❌</span>
                            <span className="word">{item.correct.word}</span>
                        </div>
                        <div className="item-2">
                            <span className="meaning">{item.correct.meaning}</span>
                        </div>
                    </div>
                ))}
                {filteredCorrectAnswers.map((item, index) => (
                    <div className="result-item correct" key={index}>
                        <div className="item-1">
                            <span className="icon">✅</span>
                            <span className="word">{item.correct.word}</span>
                        </div>
                        <div className="item-2">
                            <span className="meaning">{item.correct.meaning}</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn-next" onClick={onContinue}>Tiếp tục</button>
        </div>
    );
};

export default ResultSummary;
