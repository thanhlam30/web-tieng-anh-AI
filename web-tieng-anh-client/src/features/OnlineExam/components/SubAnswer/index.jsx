import { CheckSquareTwoTone, CloseSquareTwoTone, WarningTwoTone } from '@ant-design/icons';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setExamSelected, setScrollId, setsubPartSelected } from 'features/OnlineExam/onlineExamSlice';
import './style.scss';

SubAnswer.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
};
SubAnswer.defaultProps = {
    title: '',
    data: []
}

function SubAnswer(props) {
    const { title, data } = props;
    const { questions } = useSelector(state => state.exam);
    const { part3, part4, part6, part7 } = questions;

    const dispatch = useDispatch();

    function handleOnClick(stt, e) {
        e.preventDefault();
        if (stt <= 6) {
            dispatch(setExamSelected(1));
        } else if (stt <= 31) {
            dispatch(setExamSelected(2));

        } else if (stt <= 70) {
            let subPart = part3.findIndex((element) => {
                let temp = element.questions.findIndex(e => e.stt === stt);
                return temp !== -1;

            })
            dispatch(setExamSelected(3));
            dispatch(setsubPartSelected(subPart));

        } else if (stt <= 100) {
            let subPart = part4.findIndex((element) => {
                let temp = element.questions.findIndex(e => e.stt === stt);
                return temp !== -1;

            })
            dispatch(setExamSelected(4));
            dispatch(setsubPartSelected(subPart));
        } else if (stt <= 130) {
            dispatch(setExamSelected(5));

        } else if (stt <= 146) {
            let subPart = part6.findIndex((element) => {
                let temp = element.questions.findIndex(e => e.stt === stt);
                return temp !== -1;

            })
            dispatch(setExamSelected(6));
            dispatch(setsubPartSelected(subPart));

        } else {
            let subPart = part7.findIndex((element) => {
                let temp = element.questions.findIndex(e => e.stt === stt);
                return temp !== -1;

            })
            dispatch(setExamSelected(7));
            dispatch(setsubPartSelected(subPart));
        };
        dispatch(setScrollId(stt));

    }

    return (
        <div className='sub_answer'>
            <span>{title}</span>
            <br />
            <a href="#">Instruction</a>
            <Row gutter={[8, 8]}>
                {data.map((sub, index) => (
                    <Col span={3} key={index}>

                        {/* móc ra subpart */}
                        <a href={`#${sub.stt}`} onClick={(e) => handleOnClick(sub.stt, e)}>
                            <div className='sub_answer--block' >
                                <div className='sub_answer--status'>
                                    {sub.status === 'selected' && <CheckSquareTwoTone />}
                                    {sub.status === false && <CloseSquareTwoTone twoToneColor="#eb2f96" />}
                                    {sub.status === true && <CheckSquareTwoTone twoToneColor="#52c41a" />}
                                    {sub.status === 'yet' && < WarningTwoTone twoToneColor="#ec8d22" />}

                                </div>
                                {sub.stt}
                            </div>
                        </a>

                    </Col>
                ))}

            </Row>
        </div>
    );
}

export default SubAnswer;