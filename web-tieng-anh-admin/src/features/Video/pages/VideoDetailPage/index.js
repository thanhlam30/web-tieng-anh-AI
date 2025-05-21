import { FileTextOutlined } from "@ant-design/icons";
import { Divider, Row, Space, Tabs } from "antd";
import imageNotFound from "assets/images/image-not-found.svg";
import { wordValues } from "features/Course/initialAndValidateValues";
import SubtitleTab from "features/Video/components/SubtitleTab";
import VideoWordTab from "features/Video/components/VideoWordTab";
import { fetchVideo } from "features/Video/videoSlice";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./style.scss";
const { TabPane } = Tabs;

function VideoDetailPage(props) {
	const { videoDetails } = useSelector((state) => state.video);
	const {
		name,
		image,
		level,
		url,
		description,
		subtitles,
		videoWords,
		categoryName,
		durationString,
	} = videoDetails;

	const dispatch = useDispatch();
	const { slug } = useParams();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetailViewMode, setIsDetailViewMode] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(wordValues.initial);

	useEffect(() => {
		dispatch(fetchVideo(slug));
	}, []);

	return (
		<div className="course-detail-page">
			<Row justify="center" className="topic-thumbnail">
				<img
					src={image ? image : imageNotFound}
					alt={name}
					onError={(e) => (e.target.src = imageNotFound)}
				/>
				<div className="topic-thumbnail__overlay">
					<div className="topic-thumbnail__title">{name}</div>
					<div className="topic-thumbnail__description">{description}</div>
					<div className="topic-thumbnail__word-count">
						<FileTextOutlined /> Thời luọng: {durationString}
						<br />
						<FileTextOutlined /> Level: {level}
					</div>
				</div>
			</Row>
			<Divider />
			<Tabs defaultActiveKey="1" type="line" size="large">
				<TabPane tab="Video" key="1">
					<ReactPlayer url={url} controls light={image} playing />
				</TabPane>
				<TabPane tab="Phụ đề" key="2">
					<SubtitleTab subtitles={subtitles} videoId={videoDetails.id} />
				</TabPane>

				<TabPane tab="Từ vựng" key="3">
					<VideoWordTab videoWords={videoWords} videoId={videoDetails.id} />
				</TabPane>
			</Tabs>
			<Space direction="vertical" style={{ width: "100%" }}>
				<div className="blog-main-page__table"></div>
				<div style={{ textAlign: "right" }}></div>
			</Space>
		</div>
	);
}

export default VideoDetailPage;
