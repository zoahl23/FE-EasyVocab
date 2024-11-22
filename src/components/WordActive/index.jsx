import { Button, Input, Select, List } from "antd";
import { useState } from "react";
import "./style.scss";
import { FiSearch } from "react-icons/fi";

const { Option } = Select;

const data = [
    { word: "training", pronunciation: "/ˈtreɪnɪŋ/", type: "(n)", meaning: "Sự đào tạo" },
    { word: "teamwork", pronunciation: "/tiːmwɜːrk/", type: "(n)", meaning: "Làm việc nhóm" },
    { word: "daring", pronunciation: "/ˈderɪŋ/", type: "(adjective)", meaning: "Táo bạo, cà gan, liều lĩnh" },
    { word: "chivalrous", pronunciation: "/ˈʃɪvlrəs/", type: "(adjective)", meaning: "Hào hiệp, ga lăng" },
    { word: "exercise", pronunciation: "/ˈeksərsaɪz/", type: "(n)", meaning: "Bài tập" },
    { word: "break time", pronunciation: "/breɪk taɪm/", type: "(n)", meaning: "Giờ giải lao" },
    { word: "training", pronunciation: "/ˈtreɪnɪŋ/", type: "(n)", meaning: "Sự đào tạo" },
    { word: "teamwork", pronunciation: "/tiːmwɜːrk/", type: "(n)", meaning: "Làm việc nhóm" },
    { word: "daring", pronunciation: "/ˈderɪŋ/", type: "(adjective)", meaning: "Táo bạo, cà gan, liều lĩnh" },
    { word: "chivalrous", pronunciation: "/ˈʃɪvlrəs/", type: "(adjective)", meaning: "Hào hiệp, ga lăng" },
    { word: "exercise", pronunciation: "/ˈeksərsaɪz/", type: "(n)", meaning: "Bài tập" },
    { word: "break time", pronunciation: "/breɪk taɪm/", type: "(n)", meaning: "Giờ giải lao" },
    { word: "training", pronunciation: "/ˈtreɪnɪŋ/", type: "(n)", meaning: "Sự đào tạo" },
    { word: "teamwork", pronunciation: "/tiːmwɜːrk/", type: "(n)", meaning: "Làm việc nhóm" },
    { word: "daring", pronunciation: "/ˈderɪŋ/", type: "(adjective)", meaning: "Táo bạo, cà gan, liều lĩnh" },
    { word: "chivalrous", pronunciation: "/ˈʃɪvlrəs/", type: "(adjective)", meaning: "Hào hiệp, ga lăng" },
    { word: "exercise", pronunciation: "/ˈeksərsaɪz/", type: "(n)", meaning: "Bài tập" },
    { word: "break time", pronunciation: "/breɪk taɪm/", type: "(n)", meaning: "Giờ giải lao" },
];

const WordActive = () => {
    const [selectedLevel, setSelectedLevel] = useState(1); // Cấp độ được chọn
    const [searchTerm, setSearchTerm] = useState(""); // Nội dung tìm kiếm

    const levels = [
        { id: 1, label: "Cấp độ 1" },
        { id: 2, label: "Cấp độ 2" },
        { id: 3, label: "Cấp độ 3" },
        { id: 4, label: "Cấp độ 4" },
        { id: 5, label: "Cấp độ 5" },
    ];

    const handleLevelChange = (value) => {
        setSelectedLevel(value);
        console.log(`Bạn đã chọn cấp độ: ${value}`);
    };

    const handleSearch = () => {
        console.log(`Tìm kiếm từ: ${searchTerm}`);
        // Thực hiện logic tìm kiếm tại đây
    };

    return (
        <div className="container-notebook">
            <div className="header-notebook">
                <div className="search-bar">
                    <Input
                        placeholder="Nhập từ cần tìm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        onClick={handleSearch}
                    >
                        <FiSearch />
                    </Button>
                    <Select
                        value={selectedLevel}
                        onChange={handleLevelChange}
                    >
                        {levels.map((level) => (
                            <Option key={level.id} value={level.id}>
                                {level.label}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="body-notebook">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <div className="row-word">
                                <div className="word">
                                    <span>{item.word}</span>
                                    <div className="pron">{item.pronunciation}</div>
                                </div>
                                <div className="mean">
                                    <span>{item.meaning}</span>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default WordActive;
