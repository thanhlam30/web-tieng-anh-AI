import React from 'react';
import { useSelector } from 'react-redux';
import VideoCard from '../VideoCard';
import VideoMoreSubCard from '../VideoMoreSubCard';
VideoMoreCard.propTypes = {

};

VideoCard.defaultProps = {

}

function VideoMoreCard(props) {

    const { more } = useSelector((state) => state.video);
    return (
        <>
            {
                more.map((element, index) => (
                    <VideoMoreSubCard key={index} data={element} />     
                ))
            }
        </>

    );
}

export default VideoMoreCard;