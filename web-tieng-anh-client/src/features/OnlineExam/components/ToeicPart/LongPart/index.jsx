import { Divider, Space } from 'antd';
import CustomAudioControl from 'components/CustomAudioControl';
import PropTypes from 'prop-types';
import React from 'react';
import LongSub from '../LongSub';
import { useSelector } from 'react-redux';
LongPart.propTypes = {
    data: PropTypes.array,
    longAudio: PropTypes.string,
    onAnswerSheetClick: PropTypes.func,
    name: PropTypes.string,
};

LongPart.defaultProps = {
    data: [],
    longAudio: '',
    onAnswerSheetClick: null,
    name: ''

}

function LongPart(props) {
    const { data, longAudio, onAnswerSheetClick, name } = props;
    const { transcript } = useSelector(state => state.exam);
    console.log("check dataa long", data);

    let tempTranscript;

    if (name === 'part3') {
        tempTranscript = transcript.part3;
    } else if (name === 'part4') {
        tempTranscript = transcript.part4;
    }

    return (
        <div>
            <Space direction="vertical" size='large' style={{ width: '100%' }} >
                <b>Question 71 - 74 refer to following conversation: </b>
                <Divider />
                <p>Please refrain from replaying the audio, you can only listen one time when in real exam.</p>

                <CustomAudioControl audio={longAudio} />



                {
                    data.map((question, index) => (
                        <div className="question" key={index} id={question.stt} >
                            <Space direction="vertical">
                                {question.image && <img src={question.image} alt="" />}
                                {tempTranscript && <div>{tempTranscript[index]}</div>}

                                <LongSub data={question.questions} onAnswerSheetClick={onAnswerSheetClick} name={name} />
                            </Space>


                        </div>

                    ))
                }
            </Space>
        </div>
    );
}

export default LongPart;