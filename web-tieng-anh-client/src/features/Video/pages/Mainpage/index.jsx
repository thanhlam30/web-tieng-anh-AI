import { Affix, Col, Divider, Empty, Row, Spin } from "antd";
import BackToTopButton from "components/BackToTopButton";
import { dataSelectDuration } from "constants/dataSelectLevel";
import SearchBar from "features/Video/components/SearchBar";
import Slider from "features/Video/components/Slider";
import VideoCard from "features/Video/components/VideoCard";
import {
	fetchByCategoryVideo,
	fetchNextPage,
	raisePage,
} from "features/Video/videoSlice";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./style.scss";

MainPage.propTypes = {};

function MainPage(props) {
	const { slugCategory } = useParams();
	const dispatch = useDispatch();
	const { movies, page, totalPages } = useSelector((state) => state.video);
	const { data } = movies;
	const [timeTo, setTimeTo] = useState(0);
	const [timeFrom, setTimeFrom] = useState("");
	const [durationSelected, setDurationSelected] = useState("");
	const [level, setLevel] = useState(0);

	useEffect(() => {
		if (slugCategory) {
			dispatch(
				fetchByCategoryVideo({
					slug: slugCategory,
				})
			);
		}

		setTimeTo(0);
		setTimeFrom("");
		setDurationSelected("");
		setLevel(0);
	}, [slugCategory]);

	useEffect(() => {
		if (slugCategory) {
			dispatch(
				fetchByCategoryVideo({
					slug: slugCategory,
					level: level,
					timeFrom: timeFrom,
					timeTo: timeTo,
				})
			);
		}
	}, [level, timeFrom, timeTo]);

	useEffect(() => {
		if (slugCategory && page) {
			dispatch(
				fetchNextPage({
					slug: slugCategory,
					page: page,
					level: level,
					timeFrom: timeFrom,
					timeTo: timeTo,
				})
			);
		}
	}, [page]);

	const handleNextScroll = () => {
		dispatch(raisePage());
	};

	let check = true;
	if (page === totalPages) {
		check = false;
	}

	function handleLevelChange(value) {
		setLevel(parseInt(value));
	}

	function handleDurationChange(value) {
		const valueObject = handleDataDuration(value);
		setTimeTo(valueObject.value.timeTo);
		setTimeFrom(valueObject.value.timeFrom);
		setDurationSelected(value);
	}

	function handleDataDuration(duration) {
		return dataSelectDuration.find((element) => element.duration === duration);
	}

	const history = useHistory();
	function handleOnClick(slug) {
		history.push(`/videos/${slugCategory}/${slug}`);
	}

	useEffect(() => {
		document.getElementById("top").scrollIntoView();
	}, [level, timeFrom, timeTo]);

	return (
		<div>
			<div className="slider">
				<Slider slug={slugCategory} />
			</div>
			<div className="mainpage_wrapper" id="top">
				<Affix offsetTop={-10}>
					<SearchBar
						onSelectedDuration={handleDurationChange}
						onSelectedLevel={handleLevelChange}
						onDurationSelected={durationSelected}
						level={level}
					/>
				</Affix>

				<Divider></Divider>

				<InfiniteScroll
					style={{ overflowX: "hidden", overflowY: "hidden" }}
					dataLength={data ? data.length : 0}
					next={handleNextScroll}
					hasMore={true}
					loader={
						check ? (
							<div className="loader">
								<Spin size="medium" />
							</div>
						) : (
							""
						)
					}
				>
					<Row gutter={[16, 16]}>
						{data &&
							data.map((element, index) => (
								<Col
									key={index}
									xl={{ span: 6 }}
									lg={{ span: 8 }}
									sm={{ span: 12 }}
									xs={{ span: 24 }}
								>
									<VideoCard data={element} onClick={handleOnClick} />
								</Col>
							))}
					</Row>
				</InfiniteScroll>

				{data && data.length === 0 ? (
					<Empty description={<span>Không có dữ liệu</span>} />
				) : (
					""
				)}
			</div>
			<BackToTopButton />
		</div>
	);
}

export default MainPage;
