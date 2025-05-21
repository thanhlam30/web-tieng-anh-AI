import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { fetchExam, setExamSelected, setIsSubmit, setScrollId, setsubPartSelected, writeAnswerSheet } from 'features/OnlineExam/onlineExamSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import useLoadExamSelectedAfterRefresh from 'utils/useLoadExamSelectedAfterRefresh';
import useWindowUnloadEffect from 'utils/useWindowUnloadEffect';
import Part1 from './Part1';
import Part2 from './Part2';
import Part3 from './Part3';
import Part4 from './Part4';
import Part5 from './Part5';
import Part6 from './Part6';
import Part7 from './Part7';
import './style.scss';

ToeicPart.propTypes = {

};

function ToeicPart(props) {

    useLoadExamSelectedAfterRefresh();
    const { questions, examSelected, scrollId, isSubmit } = useSelector(state => state.exam);
    const { part1, part2, part3, part4, part5, part6, part7, part3Audio, part1Audio, part2Audio, part4Audio } = questions;
    const { subPartSelected, part3MaxPage, part4MaxPage, part6MaxPage, part7MaxPage, transcript } = useSelector(state => state.exam);
    const history = useHistory();
    const { testId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        let check = localStorage.getItem("isSubmit");
        if (check !== "undefined" && check !== null) {
            dispatch(setIsSubmit(check));
        }
    }, []);


    useEffect(() => {

    }, [])

    useEffect(() => {

        if (examSelected === 8 && isSubmit === false) {

            history.push(`/exams/${testId}/checkout`);

            console.log("lệnh nàyh bị lỗi nè")
        }
    }, [examSelected]);

    useEffect(() => {
        dispatch(fetchExam({
            slug: testId
        }))
    }, []);

    useEffect(() => {
        console.log('effect', scrollId);
        document.getElementById(`${scrollId}`).scrollIntoView();
    }, [subPartSelected])



    function handlePreviousClick() {
        if (examSelected === 2) {
            dispatch(setExamSelected(examSelected - 1));
            dispatch(setScrollId('top'));
            return;
        }

        if (subPartSelected === 0) {
            dispatch(setExamSelected(examSelected - 1));
            dispatch(setScrollId('top'));
            if (examSelected === 4) {
                dispatch(setsubPartSelected(part3MaxPage));
                dispatch(setScrollId('top'));
            }
            if (examSelected === 5) {
                dispatch(setsubPartSelected(part4MaxPage));
                dispatch(setScrollId('top'));
            }
            if (examSelected === 7) {
                dispatch(setsubPartSelected(part6MaxPage));
                dispatch(setScrollId('top'));
            }
            return;
        }

        dispatch(setsubPartSelected(subPartSelected - 1));
        dispatch(setScrollId('top'));




    }
    function handleNextClick() {
        // if (examSelected == 7) {
        //     history.push(`/exams/${testId}/checkout`);
        // }


        if (isSubmit) {
            if (examSelected === 7 && subPartSelected === part7MaxPage) {
                history.push(`/exams/${testId}/result`);
            }
        }

        if (examSelected === 1 || examSelected === 2 || examSelected === 5) {
            console.log("Next");
            dispatch(setExamSelected(examSelected + 1));
            dispatch(setsubPartSelected(0));
            dispatch(setScrollId('top'));
            return;

        }
        if ((examSelected === 3 && subPartSelected === part3MaxPage) ||
            (examSelected === 4 && subPartSelected === part4MaxPage) ||
            (examSelected === 6 && subPartSelected === part6MaxPage) ||
            (examSelected === 7 && subPartSelected === part7MaxPage)

        ) {

            dispatch(setExamSelected(examSelected + 1));
            dispatch(setsubPartSelected(0));
            dispatch(setScrollId('top'));

        } else {
            dispatch(setsubPartSelected(subPartSelected + 1));
            dispatch(setScrollId('top'));
        }


    }

    function handleSelected(object) {
        dispatch(writeAnswerSheet(object));
    }

    function renderSwitch(selected) {
        switch (selected) {
            case 1:
                return <Part1 data={part1} longAudio={part1Audio} onAnswerSheetClick={handleSelected} />;
            case 2:
                return <Part2 data={part2} longAudio={part2Audio} onAnswerSheetClick={handleSelected} />;
            case 3:
                return <Part3 data={part3} longAudio={part3Audio} onAnswerSheetClick={handleSelected} name='part3' />;
            case 4:
                return <Part4 data={part4} longAudio={part4Audio} onAnswerSheetClick={handleSelected} name='part4' />;
            case 5:
                return <Part5 data={part5} onAnswerSheetClick={handleSelected} />;
            case 6:
                return <Part6 data={part6} onAnswerSheetClick={handleSelected} name='part6' />;
            case 7:
                return <Part7 data={part7} onAnswerSheetClick={handleSelected} name='part7' />;
            default:
                break;
        }
    }

    useWindowUnloadEffect(() => {
        localStorage.setItem('partSelected', examSelected);
        localStorage.setItem('Transcript', transcript)
    }, true);

    const disabled = examSelected == 1 ? true : false;






    return (
        <div id='top' className="toeic_part">
            <div className="toeic_part_content">

                {renderSwitch(examSelected)}
            </div>

            <div className="toeic_part_button">


                <Row justify="space-around">
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{ span: 10 }}>


                        <Button type="primary" block onClick={handlePreviousClick} disabled={disabled}>
                            <CaretLeftFilled />
                            <b>Previous</b>
                        </Button>
                    </Col>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{ span: 10 }}>
                        <Button type="primary" block onClick={handleNextClick} >
                            <b>Next</b>
                            <CaretRightFilled />
                        </Button>
                    </Col>

                </Row>
            </div>
        </div>

    );
}

export default ToeicPart;