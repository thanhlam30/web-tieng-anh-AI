import { Row } from 'antd';
import BackToTopButton from 'components/BackToTopButton';
import ExamCard from 'features/OnlineExam/components/ExamCard';
import { fetchBooks, setExamCheckin } from 'features/OnlineExam/onlineExamSlice';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import './style.scss';

ListExam.propTypes = {
    examList: PropTypes.array
};

ListExam.defaultProps = {
    examList: []
}



function ListExam(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBooks());


    }, []);


    function handleClick(test) {
        dispatch(setExamCheckin(test.name));
        history.push(`/exams/${test.slug}/checkin`);
    }


    const { examList } = props;

    return (

        <>
            {examList.map((exam, index) => (
                <div className='list_exam' key={index}>
                    <div className="list_exam--head">
                        <div className='list_exam--head-img' >
                            <img src={exam.image} alt="image_exam" />
                        </div>
                        <div className='list_exam--head-title'>
                            <span>{exam.name}</span>
                        </div>
                    </div>

                    <Row gutter={[16, 16]}>

                        <ExamCard listTest={exam.exams} onClick={handleClick} />

                    </Row>

                </div>
            ))}
            <BackToTopButton/>
        </>

    );
}

export default ListExam;