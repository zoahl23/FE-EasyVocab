import './style.scss';

const CardEvent = ({ image, status, date, content, button }) => {
    return (
        <div className="card">
            <div className="img">
                <img src={image} alt="" />
            </div>
            <div className="event-content">
                <div className="subTitle">
                    <div className="status">{status}</div>
                    <div className="date">{date}</div>
                </div>
                <div className="body">{content}</div>
                <button className="button"><p>{button}</p></button>
            </div>
        </div>
    );
}

export default CardEvent;