import { useState } from "react";
import { List, Checkbox } from "antd";
import "./style.scss"; // Bạn có thể chỉnh CSS tại đây

const VocabSelector = ({ vocabularies, onSubmit }) => {
    const [selectedWords, setSelectedWords] = useState([]);

    const handleSelect = (id) => {
        setSelectedWords((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id) // Bỏ chọn nếu đã được chọn
                : [...prev, id] // Thêm vào danh sách nếu chưa được chọn
        );
    };

    const handleSubmit = () => {
        onSubmit(selectedWords);
    };

    return (
        <div className="vocabulary-selector">
            <div className="title">Chọn từ bạn muốn lưu vào Sổ tay</div>
            <div className="list-vocab">
                <List
                    dataSource={vocabularies}
                    renderItem={(item) => (
                        <List.Item className="vocabulary-item">
                            <div className="item-word">
                                <div className="word">
                                    <Checkbox
                                        checked={selectedWords.includes(item.id)}
                                        onChange={() => handleSelect(item.id)}
                                    >
                                    </Checkbox>
                                    <p>
                                        <span>{item.word}</span>
                                        <div className="pron">{item.pronunciation}</div>
                                    </p>
                                </div>
                                <div className="mean">
                                    <span>{item.meaning}</span>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <button
                    className="btn-next"
                    onClick={handleSubmit}
                >Tiếp tục</button>
            </div>

        </div>
    );
};

export default VocabSelector;
