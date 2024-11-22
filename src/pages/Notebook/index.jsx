import EmptyVocab from '../../components/EmptyVocab';
import MainContent from '../../components/MainContent';
import WordActive from '../../components/WordActive';
import './style.scss';

const Notebook = () => {
    return (
        <MainContent>
            {/* <EmptyVocab /> */}
            <WordActive />
        </MainContent>
    );
}

export default Notebook;