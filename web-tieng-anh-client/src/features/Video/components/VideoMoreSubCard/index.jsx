import { PlayCircleOutlined } from '@ant-design/icons';
import DefaultImage from 'assets/images/default_img.jpg';
import BlockLevel from 'components/BlockLevel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import './style.scss';
VideoMoreSubCard.propTypes = {
    data: PropTypes.object,
};

VideoMoreSubCard.defaultProps = {
    dataL: {}
}

function VideoMoreSubCard(props) {
    const { data } = props;
    const { slugCategory } = useParams();

    const [checkImage, setCheckImage] = useState(true);


    const handleError = () => {
        setCheckImage(false);

    }

    const history = useHistory();

    const handleOnClick = (slugVideo) => {
        history.push(`/videos/${slugCategory}/${slugVideo}`)
    }

    return (
        <div className='video-more_card'>
            <div className='video-more_card-left' onClick={() => handleOnClick(data.slug)}>
                <div className="video-more_card_content">
                    <div className="video-more_card_content-image">
                        <img
                            id='img'
                            src={checkImage ? data.image : DefaultImage}
                            // src={data.image}
                            alt="error image"
                            onError={handleError}
                        />
                    </div>
                    <div className="video-more_card_content-overlay">
                        <PlayCircleOutlined style={{ fontSize: '2.5rem' }} />
                    </div>

                    <div className="video-more_card_content-info">
                        <BlockLevel level="3" width="25" height="25" fontsize='1rem' />

                        <div className="video-more_card_content-info--duration">
                            <div>
                                {data.durationString}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='video-more_card-right'>
                <Link className='video-more_card--link' to={"/videos/" + slugCategory + "/" + data.slug} >
                    {data.name}
                </Link>


            </div>
        </div >
    );
}

export default VideoMoreSubCard;