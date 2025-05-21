import PropTypes from 'prop-types';
import React from 'react';
import ShortPart from '../ShortPart';

Part6.propTypes = {
    data: PropTypes.array,
    onAnswerSheetClick: PropTypes.func,
    name: PropTypes.string,
};

Part6.defaultProps = {
    data: [],
    onAnswerSheetClick: null,
    name: ''
}

function Part6(props) {
    const { data, onAnswerSheetClick, name, scrollId } = props;

   
    return (
        <div id='top'>
            <ShortPart data={data} onAnswerSheetClick={onAnswerSheetClick} name={name} /> :
        </div>
    );
}

export default Part6;