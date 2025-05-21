import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Space } from 'antd';
import ShortSub from '../ShortSub';
import { useSelector, useDispatch } from 'react-redux';
import useWindowUnloadEffect from 'utils/useWindowUnloadEffect';


ShortPart.propTypes = {
    data: PropTypes.array,
    onAnswerSheetClick: PropTypes.func,
    name: PropTypes.string,
};

ShortPart.defaultProps = {
    data: [],
    onAnswerSheetClick: null,
    name: ''
}

function ShortPart(props) {
    const { data, onAnswerSheetClick, name } = props;
    const { subPartSelected } = useSelector(state => state.exam);
    let tempData = data[subPartSelected];


    const from = 0;
    const to = tempData ? tempData.questions.length - 1 : 0;


    let checkPart;

    if (name === 'part6' || name === 'part7') {
        checkPart = false;
    } else {
        checkPart = true;
    }






    useWindowUnloadEffect(() => {
        localStorage.setItem('subPartSelected', subPartSelected);


    }, true);



    return (
        <div>
            {tempData &&
                <Space direction="vertical" size='large' style={{ width: '100%' }} >
                    <b>Question {tempData.questions[from].stt} - {tempData.questions[to].stt} {name ? ' refer to following conversation:' : 'refer to following paragraph:'}: </b>
                    <Divider />
                    {name ? <p>Please refrain from replaying the audio, you can only listen one time when in real exam.</p> : ''}

                    {

                        <div className="question" >
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <ShortSub name={name} audio={tempData.paragraph} image={tempData.image} data={tempData.questions} onAnswerSheetClick={onAnswerSheetClick} checkPart={checkPart} />
                            </Space>
                        </div>


                    }
                </Space>

            }

        </div>
    );
}

export default ShortPart;