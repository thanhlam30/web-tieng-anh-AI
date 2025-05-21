import { setAnswerAfterRefresh } from 'features/OnlineExam/onlineExamSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useLoadDataAfterRefresh = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        
        const tempAnswers = localStorage.getItem('answers');
        if (tempAnswers !== "undefined" && tempAnswers !== null) {
            const answers = JSON.parse(tempAnswers);
            dispatch(setAnswerAfterRefresh(answers));
        }

        return () => {

        }
    }, []);

}

export default useLoadDataAfterRefresh;