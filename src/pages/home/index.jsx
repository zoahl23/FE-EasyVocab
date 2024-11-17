import './style.scss';
import MainContent from '../../components/MainContent';
import EmptyVocab from '../../components/EmptyVocab';
import ReviewChart from '../../components/ReviewChart';

const Home = () => {
    return (
        <MainContent>
            {/* <EmptyVocab /> */}
            <ReviewChart />
        </MainContent>
    )
}

export default Home