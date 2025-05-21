import { FileTextOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { setSttInSub, setSubActive } from 'features/Video/videoSlice';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

AutoTranscript.propTypes = {
    subtitles: PropTypes.array,
    onSeek: PropTypes.func,
};

AutoTranscript.defaultProps = {
    subtitles: [],
    onSeek: null
}

function AutoTranscript(props) {

    const { subtitles, onSeek } = props;
    const { subActive, sttInSub, isPlay } = useSelector((state) => state.video);
    const table = document.getElementById('table');

    const dispatch = useDispatch();

    useEffect(() => {

        if (table) {
            if (sttInSub > 2 && isPlay) {
                let scroll = (sttInSub - 2) * 60;
                table.scroll(0, scroll);
            }
        }
    }, [subActive])


    useEffect(() => {

        if (table) {
            if (sttInSub > 2) {
                let scroll = (sttInSub - 2) * 60;
                table.scroll(0, scroll);
            }
        }
    }, [sttInSub])



    function handleRoundTime(time) {
        let minute = `0${Math.trunc(time / 1000 / 60)}`.slice(-2);
        let second = `0${Math.trunc(time / 1000 % 60)}`.slice(-2);

        return `${minute}:${second}`
    }

    const activeStyle = {
        backgroundColor: "#42a5f5",
        color: "#fff",
        fontStyle: "italic",
        transition: "all 0.25s ease-in-out 0s",
        border: 'none'
    }

    const buttonStyle = {
        backgroundColor: '#fff',
        color: '#42a5f5'
    }


    function handleMouseEnter(a, b) {
        const button = document.getElementById(`button--${a}`);
        if (b === 1) {
            button.style.color = '#fff';
            button.style.backgroundColor = "#4b91ff";
        } else {
            button.style.color = '#4b91ff';
            button.style.backgroundColor = "#fff";
        }


    }

    function handleMouseLeave(a, b) {
        const button = document.getElementById(`button--${a}`);
        if (b === 1) {
            button.style.color = '#4b91ff';
            button.style.backgroundColor = "#fff";
        } else {
            button.style.color = '#4b91ff';
            button.style.backgroundColor = "#fff";

        }
    }

    const handleSeekTo = (e, element) => {
        const temp = element.start / 1000;
        if (onSeek) {
            onSeek(temp);
        }
        dispatch(setSttInSub(element.stt));
        dispatch(setSubActive(element.id));
    }


    return (
        <div className="transcript-select_wrapper">
            <div className="transcript-select-header">Auto Transcript&nbsp;<FileTextOutlined /></div>
            <div id='table' className="transcript-select">
                <table className="transcript-select_table">

                    <tbody>

                        {
                            subtitles.map((element, index) => (
                                <tr key={index} style={element.id === subActive ? activeStyle : {}}>
                                    <td>
                                        <button
                                            id={'button--' + element.id}
                                            className="transcript-select--button"
                                            style={element.id === subActive ? buttonStyle : {}}
                                            onMouseOver={element.id !== subActive ? () => handleMouseEnter(element.id, 1) : () => handleMouseEnter(element.id, 0)}
                                            onMouseLeave={element.id !== subActive ? () => handleMouseLeave(element.id, 1) : () => handleMouseEnter(element.id, 0)}
                                            onClick={(e) => handleSeekTo(e, element)}
                                        >
                                            <div className="align">
                                                <div className='icon'>
                                                    <PlayCircleOutlined />
                                                </div>
                                                <div>
                                                    &nbsp;{handleRoundTime(element.start)}
                                                </div>
                                            </div>

                                        </button>
                                    </td>
                                    <td>{element.content}</td>
                                </tr>
                            ))
                        }


                    </tbody>




                </table>
            </div>


        </div >
    );
}

export default AutoTranscript;