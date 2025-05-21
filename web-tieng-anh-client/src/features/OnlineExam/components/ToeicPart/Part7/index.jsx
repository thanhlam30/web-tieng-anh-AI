import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import ShortPart from '../ShortPart';

Part7.propTypes = {
    data: PropTypes.array,
    onAnswerSheetClick: PropTypes.func,
    name: PropTypes.string,
};

Part7.defaultProps = {
    data: [],
    onAnswerSheetClick: null,
    name: ''
}

function Part7(props) {
    const { data, onAnswerSheetClick, name, scrollId } = props;
    const dispatch = useDispatch();


    return (
        <div id='top'>
            <ShortPart data={data} onAnswerSheetClick={onAnswerSheetClick} name={name} /> :
        </div>
    );
}

export default Part7;