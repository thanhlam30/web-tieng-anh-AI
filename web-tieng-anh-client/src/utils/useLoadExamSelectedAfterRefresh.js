import { setExamSelected, setTranScript } from 'features/OnlineExam/onlineExamSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const useLoadExamSelectedAfterRefresh = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const part = localStorage.getItem('partSelected');
        const transcript = localStorage.getItem('transcript');
        if (part !== "undefined" && part !== null) {

            dispatch(setExamSelected(parseInt(part)));
        }

        if (transcript !== "undefined" && transcript !== null) {

            const tempTranscript = JSON.parse(transcript);
            dispatch(setTranScript(tempTranscript));

        }

        return () => {

        }
    }, []);
}

export default useLoadExamSelectedAfterRefresh;


