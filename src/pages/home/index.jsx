import './style.scss';
import MainContent from '../../components/MainContent';
import EmptyVocab from '../../components/EmptyVocab';
import ReviewChart from '../../components/ReviewChart';
import { useEffect, useState } from 'react';
import { callVocabLever } from '../../services/api';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';

const Home = () => {

    const defaultData = [
        { level: "1", count: 0, color: "#EC5858" },
        { level: "2", count: 0, color: "#FCCC0A" },
        { level: "3", count: 0, color: "#56CCF0" },
        { level: "4", count: 0, color: "#307FEC" },
        { level: "5", count: 0, color: "#20367F" },
    ];

    const [data, setData] = useState(defaultData);
    const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    useEffect(() => {
        setData(defaultData);
        setIsEmpty(true);
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        setLoading(true);
        const res = await callVocabLever();
        if (res && res.data) {
            const apiData = res.data;

            const updatedData = defaultData.map((item) => ({
                ...item,
                count: apiData[item.level] || 0, // Nếu level không có trong API, giữ count = 0
            }));

            setData(updatedData);
            const allZero = updatedData.every(item => item.count === 0);
            setIsEmpty(allZero);
        } else {
            setIsEmpty(true); // Nếu không có dữ liệu từ API, coi như rỗng
        }
        setLoading(false);
    };

    return (
        <MainContent>
            {loading ? (
                <Loading />
            ) : isEmpty ? (
                <EmptyVocab />
            ) : (
                <ReviewChart key={isAuthenticated ? "auth-" + Date.now() : "unauth"} data={data} />
            )}
        </MainContent>
    )
}

export default Home