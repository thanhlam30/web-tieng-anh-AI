import { CheckCircleTwoTone, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Radio, Space } from 'antd';
import CustomAudioControl from 'components/CustomAudioControl';
import Text from 'antd/lib/typography/Text';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';





ShortSub.propTypes = {
    data: PropTypes.array,
    onAnswerSheetClick: PropTypes.func,
    image: PropTypes.string,
    audio: PropTypes.string,
    checkPart: PropTypes.bool,
    para: PropTypes.string,
    name: ''

};

ShortSub.defaultProps = {
    data: [],
    onAnswerSheetClick: null,
    image: '',
    audio: null,
    checkPart: true,
    para: '',
    name: ''
}




function ShortSub(props) {
    const { data, onAnswerSheetClick, image, audio, checkPart, para, name } = props;
    const { answers, scrollId, isSubmit, transcript, subPartSelected } = useSelector(state => state.exam);

    let tempTranscript;

    if (name === 'part3') {
        tempTranscript = transcript.part3;
    } else if (name === 'part4') {
        tempTranscript = transcript.part4;
    }


    useEffect(() => {

        document.getElementById(`${scrollId}`).scrollIntoView();
    }, [scrollId]);

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
        <div className="short_part">
            <Space direction="vertical" style={{ width: "100%" }} size="large">
                <div className={checkPart ? '' : 'content'}>
                    {image && <img src={image} alt="error picture" />}

                    {checkPart && <CustomAudioControl audio={audio} onPlay={false} />}
                    {tempTranscript && parse(tempTranscript[subPartSelected])}


                    {checkPart ? '' :
                        <div >
                            {parse(audio)}
                        </div>

                    }

                </div>

                {
                    data.map((element, index) => (

                        <Space direction="vertical" key={index}>



                            <div id={element.stt} className='title_question' >{element.content}</div>
                            {isSubmit

                                ? (
                                    <Space direction="vertical">
                                        {renderQuestionAnswer("a", element.a, answers[element.stt - 1].result, answers[element.stt - 1].selected.toLowerCase())}
                                        {renderQuestionAnswer("b", element.b, answers[element.stt - 1].result, answers[element.stt - 1].selected.toLowerCase())}
                                        {renderQuestionAnswer("c", element.c, answers[element.stt - 1].result, answers[element.stt - 1].selected.toLowerCase())}
                                        {renderQuestionAnswer("d", element.d, answers[element.stt - 1].result, answers[element.stt - 1].selected.toLowerCase())}
                                    </Space>
                                )
                                : (
                                    <Radio.Group onChange={(e) => handleSelected(element.stt, e)} value={answers[element.stt - 1].selected}>

                                        <Space direction="vertical">
                                            <Radio value={'A'}>{element.a}</Radio>
                                            <Radio value={'B'}>{element.b}</Radio>
                                            <Radio value={'C'}>{element.c}</Radio>
                                            <Radio value={'D'}>{element.d}</Radio>
                                        </Space>
                                    </Radio.Group>)}
                        </Space>
                    ))
                }
            </Space>
        </div>
    );
}

export default ShortSub;