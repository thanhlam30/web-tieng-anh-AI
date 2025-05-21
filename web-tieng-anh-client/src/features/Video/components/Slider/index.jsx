import VideoCard from 'features/Video/components/VideoCard';
import { fetchSliderBySlug } from 'features/Video/videoSlice';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

Slider.propTypes = {
    slug: PropTypes.string,
};

Slider.defaultProps = {
    slug: ''
}

function Slider(props) {
    const { slug } = props;
    const { moviesSlider } = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const history = useHistory();
    const { slugCategory } = useParams();
    useEffect(() => {
        dispatch(fetchSliderBySlug({
            slug: slug
        }))
    }, [slug])

    const responsive = {
        0: { items: 1, dot: false },
        568: { items: 1 },
        768: { items: 1 },
        992: { items: 2 },
        1200: { items: 3 },
    };

    let items = [];


    const handleClick = (element) => {
        history.push(`/videos/${slugCategory}/${element}`)
    }

    if (moviesSlider.length > 0) {
        for (let index = 0; index < 5; index++) {
            items.push(
                <VideoCard onClick={handleClick} data={moviesSlider[index]} height='300px'  />
            )

        }

    }


    return (

        <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
            autoPlay={true}
            animationDuration={4000}
            disableButtonsControls={true}
            infinite={true}
            paddingLeft={30}

        />
    );
}

export default Slider;