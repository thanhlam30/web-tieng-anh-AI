import { PlayCircleOutlined } from '@ant-design/icons';
import DefaultImage from 'assets/images/default_img.jpg';
import BlockLevel from 'components/BlockLevel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './style.scss';
VideoCard.propTypes = {
    data: PropTypes.object,
    height: PropTypes.string,
    padding: PropTypes.string,
    onClick: PropTypes.func,
};

VideoCard.defaultProps = {
    data: {},
    height: '',
    padding: '',
    onClick: null
};


function VideoCard(props) {
    const { data, height, padding, onClick } = props;

    const { durationString, level, image, slug, name } = data || {};

    let noneRadius = height ? '0px' : '';

    const styleSlider = {
        flexDirection: "column",
        justifyContent: "flex-start"
    };

    const [checkImage, setCheckImage] = useState(true);

    const handleError = () => {
        setCheckImage(false)
    }

    function handleOnClick(slug) {

        if (onClick) {
            onClick(slug);
        }
    }

    return (
        <div className='wrapper' style={{ paddingRight: padding }} onClick={() => handleOnClick(slug)}>
            <div className="video_card" style={{ borderRadius: noneRadius }}>

                <div className="video_card_img" style={{ borderRadius: noneRadius }}>
                    <img
                        src={checkImage ? image : DefaultImage}
                        alt="error image"
                        style={{ height: height }}
                        onError={handleError}

                    />

                    <div className="video_card_img--info" style={height ? styleSlider : {}}>
                        <div className="video_card_img--info-level">
                            <BlockLevel level={level && level.toString()} width='40' height='30' />
                        </div>


                        {height ?
                            <div className="video_card_title" style={{ fontSize: '2rem', textAlign: 'start' }} >
                                {name}
                            </div>
                            : ''
                        }
                        {!height ?
                            <div className="video_card_img--info-duration">
                                <div>{durationString}</div>
                            </div>
                            : ''
                        }
                    </div>
                </div>


                <div className="video_card_overlay" style={{ borderRadius: noneRadius }}>
                    <div className="video_card_overlay--btn" >
                        <PlayCircleOutlined style={{ fontSize: '5rem' }} />
                    </div>
                </div>



            </div>

            {
                !height ?
                    <div className="video_card_title" >
                        {name}
                    </div>
                    : ''
            }



        </div >
    );
}

export default VideoCard;