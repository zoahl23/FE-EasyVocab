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
                        image="../../../public/event_christmas.jpg"
                        status="Mới"
                        date="01.12.24 - 25.12.24"
                        content="🎄EasyVocab - Christmas Vocabulary Challenge"
                        button="Thử thách ngay"
                        link="https://www.facebook.com/huyentrangday43"
                    />
                    <CardEvent
                        image="../../../public/event_newyear.jpg"
                        status="Mới"
                        date="26.12.24 - 15.01.25"
                        content="🎉EasyVocab - Tết Nguyên Đán Vocabulary Challenge"
                        button="Thử thách ngay"
                        link="https://www.facebook.com/huyentrangday43"
                    />
                </div>
                <div className="title">
                    <img src="../../../public/icon_star.svg" alt="" />
                    <p>Đang diễn ra</p>
                </div>
                <div className="content">
                    <CardEvent
                        image="../../../public/event_Nov.jpg"
                        status="Mới"
                        date="01-11-24"
                        content="🔥Ưu đãi giảm giá 30% - Đăng ký ngay!"
                        button="Nhận ưu đãi ngay"
                        link="https://www.facebook.com/huyentrangday43"
                    />
                    <CardEvent
                        image="../../../public/event_halloween.jpg"
                        status="Mới"
                        date="10-10-24"
                        content="🎃 Easy Vocab Halloween Hunt - Săn từ vựng ma quái!"
                        button="Tham gia ngay"
                        link="https://www.facebook.com/huyentrangday43"
                    />
                </div>
            </div>
        </MainContent>
    );
}

export default Event;