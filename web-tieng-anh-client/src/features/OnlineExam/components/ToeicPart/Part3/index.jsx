import PropTypes from 'prop-types';
import React from 'react';
import LongPart from '../LongPart';
import ShortPart from '../ShortPart';

Part3.propTypes = {
    data: PropTypes.array,
    onAnswerSheetClick: PropTypes.func,
    longAudio: PropTypes.string,
    name: PropTypes.string,
};

Part3.defaultProps = {
    data: [],
    onAnswerSheetClick: null,
    longAudio: null,
    name: ''
}

function Part3(props) {
    const { data, onAnswerSheetClick, longAudio, name } = props;


    let flag = 0;

    data.forEach(element => {
        if (element.pharagraph !== null && element.pharagraph != '') {
            flag += 1;
        }
    });

    let checkShortAudio = data.length / flag;
    let typePart = checkShortAudio == 1 ? 'short' : 'long';

    // const saveLocal = data.length - 1
    // useWindowUnloadEffect(() => {
    //     localStorage.setItem('maxPartSelected', saveLocal);

    // }, true);




    return (
        <div id='top'>

            {typePart == 'short' ?
                <ShortPart data={data} onAnswerSheetClick={onAnswerSheetClick} name={name} /> :
                <LongPart data={data} longAudio={longAudio} onAnswerSheetClick={onAnswerSheetClick} name={name} />
            }




        </div>
    );
}

export default Part3;