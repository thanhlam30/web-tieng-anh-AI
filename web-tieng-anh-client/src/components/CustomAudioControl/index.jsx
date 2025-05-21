import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

CustomAudioControl.propTypes = {
    audio: PropTypes.string,
    onPlay: PropTypes.bool,
};

CustomAudioControl.defaultProps = {
    audio: 'https://f9-stream.nixcdn.com/NhacCuaTui1017/NamDoiBanTay-KayTran-7042104.mp3?st=cEVXYLke_yysz0l1JQRv9g&e=1626257147&t=1626170747048&fbclid=IwAR2oKXq_D8ocwAJMXCxN48LWAXJDdo2FYDKlIyh-gkAaiuNDM2Z6x4aHvqM',
    onPlay: true
}

function CustomAudioControl(props) {
    const { audio, onPlay } = props;

    return (
        <div id="audio-player-container">

            {onPlay
                ?
                <audio controls autoPlay >
                    <source src={audio} type="audio/mp3" />
                </audio>
                :
                <audio controls  >
                    <source src={audio} type="audio/mp3" />
                </audio>
            }

        </div >

    );
}

export default CustomAudioControl;