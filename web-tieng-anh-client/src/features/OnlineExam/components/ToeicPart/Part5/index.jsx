import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Divider, Radio, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


Part5.propTypes = {
    data: PropTypes.array,
    onAnswerSheetClick: PropTypes.func,
};
Part5.defaultProps = {
    data: [],
    onAnswerSheetClick: null,
}

function Part5(props) {
    const { data, onAnswerSheetClick } = props;
    const { answers, scrollId, isSubmit } = useSelector(state => state.exam);

    useEffect(() => {
        document.getElementById(`${scrollId}`).scrollIntoView();
    }, [scrollId])

    function handleSelected(question, e) {
        const answer = {
            question: question,
            selected: e.target.value
        };


        if (onAnswerSheetClick) {
            onAnswerSheetClick(answer);
        }

    }

    const renderQuestionAnswer = (char, content, result, answer) => {
        return (
            <div>
                {result === char ? (
                    <Text strong underline type="success">
                        {content} <CheckOutlined />
                    </Text>
                ) : answer === char ? (
                    <Text type="danger">
                        {content} <CloseOutlined />
                    </Text>
                ) : (
                    <Text>{content}</Text>
                )}
            </div>
        );
    };

    return (
        <div className="content_part" id="top">
            <Space direction="vertical" size='large' style={{ width: '100%' }} >
                <b>Mark your answer on your answer sheet:</b>
                <Divider />


                {
                    data.map((question, index) => (

                        <div className="question" key={index}>

                            <Space direction="vertical">

                                <p className='title_question' id={question.stt} >{question.content}</p>

                                {isSubmit

                                    ? (
                                        <Space direction="vertical">
                                            {renderQuestionAnswer("a", answers[question.stt - 1].scriptAudio.a, answers[question.stt - 1].result, answers[question.stt - 1].selected.toLowerCase())}
                                            {renderQuestionAnswer("b", answers[question.stt - 1].scriptAudio.b, answers[question.stt - 1].result, answers[question.stt - 1].selected.toLowerCase())}
                                            {renderQuestionAnswer("c", answers[question.stt - 1].scriptAudio.c, answers[question.stt - 1].result, answers[question.stt - 1].selected.toLowerCase())}
                                            {renderQuestionAnswer("d", answers[question.stt - 1].scriptAudio.d, answers[question.stt - 1].result, answers[question.stt - 1].selected.toLowerCase())}
                                        </Space>

                                    )
                                    : (
                                        <Radio.Group onChange={(e) => handleSelected(question.stt, e)} value={answers[question.stt - 1].selected}>

                                            <Space direction="vertical">
                                                <Radio value={'A'}>Option A</Radio>
                                                <Radio value={'B'}>Option B</Radio>
                                                <Radio value={'C'}>Option C</Radio>
                                                <Radio value={'D'}>Option D</Radio>
                                            </Space>
                                        </Radio.Group>)}
                            </Space>

                        </div>
                    ))
                }
            </Space>
        </div>
    );
}

export default Part5;