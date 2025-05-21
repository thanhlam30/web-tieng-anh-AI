import { SoundTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';


AudioCustom.propTypes = {
    url: PropTypes.string,
    id: PropTypes.number.isRequired,
};

AudioCustom.defaultProps = {
    url: '',
}



function AudioCustom(props) {

    const { url, onClick } = props;
    const handleClick = () => {
        if (!onClick)
            return;

        onClick(url);


    }

    return (
        <div className='audio-custom_wrapper' style={{ cursor: 'pointer' }}>
            <div onClick={handleClick}>
                <SoundTwoTone twoToneColor="#52c41a" style={{ fontSize: '2.2rem' }} />
            </div>
        </div>

    );
}

export default AudioCustom;