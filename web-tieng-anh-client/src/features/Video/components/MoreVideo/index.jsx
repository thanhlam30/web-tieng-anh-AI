import { Button } from 'antd';
import { fetchMoreVideo, setShowMore } from 'features/Video/videoSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VideoMoreCard from '../VideoMoreCard';
import './style.scss';
MoreVideo.propTypes = {

};

function MoreVideo(props) {
    const { slugCategory } = useParams();
    const dispatch = useDispatch();
    const [checkShow, setCheckShow] = useState(false);
    


    useEffect(() => {
        const size = checkShow ? 20 : 3;
        dispatch(fetchMoreVideo({
            slug: slugCategory,
            size: size
        }))
    }, [slugCategory, checkShow]);


    const handleShowVideo = (e) => {
        setCheckShow(!checkShow)
    }

    return (
        <div className='more_video_wrapper'>
            <div className='more_video_title' >
                More like this
            </div>

            <div className='more_video_list'>
                <VideoMoreCard />
            </div>

            <div className="more_video_button">
                <Button type="primary" size='large' block onClick={handleShowVideo}>
                    {checkShow ? 'Hide' : 'Show more'}
                </Button>
            </div>
        </div>
    );
}

export default MoreVideo;