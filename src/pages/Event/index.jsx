import CardEvent from '../../components/CardEvent';
import MainContent from '../../components/MainContent';
import './style.scss';

const Event = () => {
    return (
        <MainContent>
            <div className="new-event">
                <div className="title">
                    <img src="/icon_new.svg" alt="" />
                    <p>Mới</p>
                </div>
                <div className="content">
                    <CardEvent
                        image="/event_christmas.png"
                        status="Mới"
                        date="01.12.24 - 25.12.24"
                        content="🎄EasyVocab - Christmas Vocabulary Challenge"
                        button="Thử thách ngay"
                        link="https://www.facebook.com/share/p/1H44hSSTAs/"
                    />
                    <CardEvent
                        image="/event_newyear.png"
                        status="Mới"
                        date="26.12.24 - 15.01.25"
                        content="🎉EasyVocab - Tết Nguyên Đán Vocabulary Challenge"
                        button="Thử thách ngay"
                        link="https://www.facebook.com/share/p/1H44hSSTAs/"
                    />
                </div>
                <div className="title">
                    <img src="/icon_star.svg" alt="" />
                    <p>Đang diễn ra</p>
                </div>
                <div className="content">
                    <CardEvent
                        image="/event_Nov.png"
                        status="Mới"
                        date="01-11-24"
                        content="🔥Ưu đãi giảm giá 30% - Đăng ký ngay!"
                        button="Nhận ưu đãi ngay"
                        link="https://www.facebook.com/share/p/1H44hSSTAs/"
                    />
                    <CardEvent
                        image="/event_halloween.png"
                        status="Mới"
                        date="10-10-24"
                        content="🎃 Easy Vocab Halloween Hunt - Săn từ vựng ma quái!"
                        button="Tham gia ngay"
                        link="https://www.facebook.com/share/p/1H44hSSTAs/"
                    />
                </div>
            </div>
        </MainContent>
    );
}

export default Event;