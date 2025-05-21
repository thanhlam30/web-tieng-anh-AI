import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Divider, Radio, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import CustomAudioControl from 'components/CustomAudioControl';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


Part1.propTypes = {
    data: PropTypes.array,
    onAnswerSheetClick: PropTypes.func,
    longAudio: PropTypes.string
};

Part1.defaultProps = {
    data: [],
    onAnswerSheetClick: null,
    longAudio: null
}

function Part1(props) {

    const { data, onAnswerSheetClick, longAudio } = props;
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
                <p>Please refrain from replaying the audio, you can only listen one time when in real exam.</p>


                {(isSubmit === false && longAudio != null) ?
                    <div className="content_part--audio">
                        <CustomAudioControl audio={longAudio} onPlay={!isSubmit} />
                    </div> : ''
                }


                {
                    data.map((question, index) => (

                        <div className="question" key={index}>

                            <Space direction="vertical">
                                {
                                    (longAudio == null && isSubmit == false)
                                        ? <CustomAudioControl audio={question.audio} onPlay={false} />
                                        : ''
                                }


                                <div className="question--img" id={question.stt}>
                                    <img src={question.content} alt="" />
                                </div>

                                {
                                    isSubmit ? <CustomAudioControl audio={answers[question.stt - 1].audio} onPlay={false} /> : ''
                                }

                                <p className='title_question'>{question.stt} : Select the answer</p>

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

export default Part1;