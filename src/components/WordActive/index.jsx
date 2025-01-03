import { Button, Input, Select, List, message, notification, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import "./style.scss";
import { FiSearch } from "react-icons/fi";
import { callDeleteNotebook, callVocabNotebook } from "../../services/api";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import EmptyVocab from "../EmptyVocab";
import { DeleteTwoTone } from "@ant-design/icons";

const { Option } = Select;

const WordActive = () => {
    const [selectedLevel, setSelectedLevel] = useState(1); // Cấp độ được chọn
    const [searchTerm, setSearchTerm] = useState(""); // Nội dung tìm kiếm
    const [searchQuery, setSearchQuery] = useState("");
    const [listVocab, setListVocab] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    const levels = [
        { id: 1, label: "Cấp độ 1" },
        { id: 2, label: "Cấp độ 2" },
        { id: 3, label: "Cấp độ 3" },
        { id: 4, label: "Cấp độ 4" },
        { id: 5, label: "Cấp độ 5" },
    ];

    useEffect(() => {
        setIsEmpty(true);
        if (isAuthenticated) {
            fetchVocab();
        }
    }, [searchQuery, selectedLevel, isAuthenticated]);

    const fetchVocab = async () => {
        setIsLoading(true);

        let query = ``;
        if (searchQuery) {
            query += `&search=${removeVietnameseTones(searchQuery)}`;
        }
        if (selectedLevel) {
            query += `&level=${selectedLevel}`;
        }

        const res = await callVocabNotebook(query);
        const resCheck = await callVocabNotebook("");
        //console.log("test", res)
        if (res && res.data && res.data.length > 0) {
            setListVocab(res.data);
            setIsEmpty(false);
        } else {
            setListVocab([]);
            setIsEmpty(false);
        }

        if (resCheck?.data?.length === 0) {
            setIsEmpty(true);
        }
        setIsLoading(false)
    }

    const handleLevelChange = (value) => {
        setSelectedLevel(value);
        // console.log(`Bạn đã chọn cấp độ: ${value}`);
    };

    const handleSearch = () => {
        // console.log(`Tìm kiếm từ: ${searchTerm}`);
        setSearchQuery(searchTerm);
    };

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD") // Tách các dấu khỏi ký tự
            .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
            .replace(/đ/g, "d").replace(/Đ/g, "D"); // Chuyển 'đ' thành 'd'
    };

    const handleDeleteNotebook = async (id) => {
        const res = await callDeleteNotebook(id);
        if (res && res.data) {
            message.success('Xóa từ vựng thành công');
            fetchVocab();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }
    };

    return (
        isLoading ? (
            <Loading />
        ) :
            isEmpty ? (
                <EmptyVocab />
            ) : (
                <div className="container-notebook">
                    <div className="header-notebook">
                        <div className="search-bar">
                            <Input
                                placeholder="Nhập từ cần tìm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onPressEnter={handleSearch}
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
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <List
                                itemLayout="horizontal"
                                dataSource={listVocab}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div className="row-word">
                                            <div className="word">
                                                <span>{item.vocabulary.word}</span>
                                                <div className="pron">{item.vocabulary.pronunciation}</div>
                                            </div>
                                            <div className="mean">
                                                <span>{item.vocabulary.meaning}</span>
                                                <Popconfirm
                                                    placement="leftTop"
                                                    title={"Xác nhận xóa từ vựng"}
                                                    description={"Bạn có chắc chắn muốn xóa từ vựng này ?"}
                                                    onConfirm={() => handleDeleteNotebook(item.id)}
                                                    okText="Xác nhận"
                                                    cancelText="Hủy"
                                                >
                                                    <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                                        <DeleteTwoTone twoToneColor="#ff4d4f" />
                                                    </span>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        )}
                    </div>
                </div>

            )
    );
};

export default WordActive;
