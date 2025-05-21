import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { setIsPlay, setSttInSub, setSubActive } from 'features/Video/videoSlice';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';



VideoPlayer.propTypes = {
    url: PropTypes.string,
    onSeek: PropTypes.number.isRequired,
};

VideoPlayer.defaultProps = {
    url: '',

}


function VideoPlayer(props) {
    // seekTo,
    const { transcript, isPlay, sttInSub } = useSelector((state) => state.video);
    const [textPane, setTextPane] = useState(". . .");
    const { onSeek } = props;

    const dispatch = useDispatch();

    const { url } = props;
    let player = {};

    const setRef = (rs) => {
        player = rs;
    }

    useEffect(() => {
        if (sttInSub === "") {
            setTextPane(". . .");
            return;
        }

        let tempScript = transcript.find(x => x.stt === sttInSub);
        if (tempScript) {
            setTextPane(tempScript.content);
        }

    }, [sttInSub])


    useEffect(() => {
        if (onSeek) {
            player.seekTo(Math.ceil(onSeek));
        }
    }, [onSeek]);


    function handleOnProgress(state) {
        const { playedSeconds } = state;
        const tempSecond = playedSeconds;

        if (isPlay) {
            const subSelected = transcript.find((sub, index) => {
                const { start, end } = sub;
                return tempSecond * 1000 >= start && tempSecond * 1000 < end;
            });

            if (subSelected) {
                console.log(subSelected);
                dispatch(setSubActive(subSelected.id));
                dispatch(setSttInSub(subSelected.stt));
            }
        }

    }

    const handlePreviousPane = () => {
        if (sttInSub === '') {
            return;
        }

        if (sttInSub === 0) {
            return;
        }

        let temp = sttInSub - 1;
        let tempScript = transcript.find(x => x.stt === temp);
        let timeTemp = Math.trunc(tempScript.start / 1000);
        dispatch(setSttInSub(temp));
        player.seekTo(Math.ceil(timeTemp));

        dispatch(setSubActive(tempScript.id))


    }


    const handleNextPane = () => {
        if (sttInSub === '') {
            let tempScript = transcript.find(x => x.stt === 0);

            if (!tempScript) {
                console.error('Không tìm thấy script stt === 0');
                return;
            }

            let timeTemp = Math.trunc(tempScript.start / 1000);


            dispatch(setSttInSub(0));
            player.seekTo(Math.ceil(timeTemp));
            dispatch(setSubActive(tempScript.id));

            return;
        }

        let temp = sttInSub + 1;
        if (temp <= transcript.length) {
            let tempScript = transcript.find(x => x.stt === temp);

            if (tempScript) {
                let timeTemp = Math.trunc(tempScript.start / 1000);
                dispatch(setSttInSub(temp));
                player.seekTo(Math.ceil(timeTemp));
                dispatch(setSubActive(tempScript.id));

                return;
            }

        }
    }

    const handleOnStart = () => {
        dispatch(setIsPlay(true));
    }

    const handleOnPause = () => {
        dispatch(setIsPlay(false));
    }

    const hanleOnEnded = () => {
        dispatch(setIsPlay(false));
    }

    const handleOnSeek = (second) => {
        // console.log(second);
    }


    return (
        <div className='video-player_wrapper'>

            <Space direction="vertical" style={{ width: '100%' }}>
                <div className='container-player'>
                    <ReactPlayer
                        className='player-demension'
                        playing={isPlay}
                        ref={setRef}
                        url={url}
                        width='100%'
                        controls={true}
                        height='440px'
                        onProgress={handleOnProgress}
                        onPlay={handleOnStart}
                        onPause={handleOnPause}
                        onEnded={hanleOnEnded}
                        onSeek={handleOnSeek}

                    />
                </div>


                <div className='video-player_sub'>

                    <div className="video-player_sub--previous video-player_sub-flex" onClick={handlePreviousPane}>
                        <div className="icon " >
                            <StepBackwardOutlined />
                        </div>
                    </div>

                    <div className="video-player_sub--content video-player_sub-flex ">
                        {textPane}
                    </div>

                    <div className="video-player_sub--next video-player_sub-flex " onClick={handleNextPane}>
                        <div className="icon">
                            <StepForwardOutlined />
                        </div>
                    </div>

                </div>



            </Space>



        </div>
    );
}

export default VideoPlayer;