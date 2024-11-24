import CardEvent from '../../components/CardEvent';
import MainContent from '../../components/MainContent';
import './style.scss';

const Event = () => {
    return (
        <MainContent>
            <div className="new-event">
                <div className="title">
                    <img src="../../../public/icon_new.svg" alt="" />
                    <p>Mới</p>
                </div>
                <div className="content">
                    <CardEvent
                        image="https://learn.mochidemy.com/_next/image?url=https%3A%2F%2Fmochien-server.mochidemy.com%2Fmarketing%2Fhot_deal%2F1727327297-aABorsxSDy.png&w=384&q=75"
                        status="Mới"
                        date="12-09-24"
                        content="Ưu đãi giảm giá 30%"
                        button="Nhận ưu đãi ngay"

                    />
                    <CardEvent
                        image="https://learn.mochidemy.com/_next/image?url=https%3A%2F%2Fmochien-server.mochidemy.com%2Fmarketing%2Fhot_deal%2F1727327297-aABorsxSDy.png&w=384&q=75"
                        status="Mới"
                        date="12-09-24"
                        content="Ưu đãi giảm giá 30%"
                        button="Nhận ưu đãi ngay"

                    />
                </div>
                <div className="title">
                    <img src="../../../public/icon_star.svg" alt="" />
                    <p>Đang diễn ra</p>
                </div>
                <div className="content">
                    <CardEvent
                        image="https://learn.mochidemy.com/_next/image?url=https%3A%2F%2Fmochien-server.mochidemy.com%2Fmarketing%2Fhot_deal%2F1727327297-aABorsxSDy.png&w=384&q=75"
                        status="Mới"
                        date="12-09-24"
                        content="Ưu đãi giảm giá 30%"
                        button="Nhận ưu đãi ngay"

                    />
                    <CardEvent
                        image="https://learn.mochidemy.com/_next/image?url=https%3A%2F%2Fmochien-server.mochidemy.com%2Fmarketing%2Fhot_deal%2F1727327297-aABorsxSDy.png&w=384&q=75"
                        status="Mới"
                        date="12-09-24"
                        content="Ưu đãi giảm giá 30%"
                        button="Nhận ưu đãi ngay"

                    />
                </div>
            </div>
        </MainContent>
    );
}

export default Event;