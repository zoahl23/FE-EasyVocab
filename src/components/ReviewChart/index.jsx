import './style.scss';

const ReviewChart = ({ data }) => {

    // lấy giá trị lớn nhất để chuẩn hóa chiều cao
    const maxCount = Math.max(...data.map((item) => item.count));

    return (
        <div className="bar-chart">
            <div className="bars">
                {data.map((item, index) => (
                    <div className="bar-container" key={index}>
                        <div
                            className="bar"
                            style={{
                                // height: `${(item.count / maxCount) * 200}px`,
                                "--height": `${(item.count / maxCount) * 200}px`, // Chiều cao chuẩn hóa tối đa 200px
                                animationDelay: `${index * 0.2}s`, // Đặt độ trễ
                                backgroundColor: item.color,
                            }}
                        >
                            <span
                                className="count"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            ><b>{item.count}</b> từ</span>
                        </div>
                        <span className="level">{item.level}</span>
                    </div>
                ))}
                <div className="thanh-bars"></div>
            </div>
            <button className="btn-next">Ôn tập ngay</button>
        </div>
    );
};

export default ReviewChart;