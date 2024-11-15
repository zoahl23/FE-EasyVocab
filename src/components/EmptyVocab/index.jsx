import { useNavigate } from 'react-router-dom';
import './style.scss';

const EmptyVocab = () => {
    const navigate = useNavigate();

    const handleLearnClick = () => {
        navigate('/learn');
    };

    return (
        <div className="empty-vocab">
            <p className="message-text">Bạn chưa học từ vựng nào. <br />Hãy học 1 bài từ mới</p>
            <button className="learn-button" onClick={handleLearnClick}>
                Học từ mới
            </button>
        </div>
    );
};

export default EmptyVocab;