import { Col, Result, Row, Space } from "antd";
import BackToTopButton from "components/BackToTopButton";
import AutoTranscript from "features/Video/components/AutoTranscript";
import MoreVideo from "features/Video/components/MoreVideo";
import VideoInfo from "features/Video/components/VideoInfo";
import VideoPlayer from "features/Video/components/VideoPlayer";
import { fetchVideo, setSttInSub } from "features/Video/videoSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./style.scss";

VideoPage.propTypes = {};

function VideoPage(props) {
	const { slugCategory, slugVideo } = useParams();
	const { video } = useSelector((state) => state.video);
	const [timeSeek, setTimeSeek] = useState(0);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			fetchVideo({
				slug: slugVideo,
			})
		);
	}, [slugVideo]);

	useEffect(() => {
		document.title = video.name || "Video";
	});

	useEffect(() => {
		document.getElementById("top").scrollIntoView();
	}, [slugVideo]);

	useEffect(() => {
		dispatch(setSttInSub(""));
	}, [slugVideo]);

	const handleOnSeek = (timeSeek) => {
		setTimeSeek(timeSeek);
	};

	const handleOnSeekWord = (timeSeek) => {
		setTimeSeek(timeSeek);
	};

	function isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	}

	return (
		<>
			{!isEmpty(video) ? (
				<div className="videopage_background" id="top">
					<div className="videopage_wrapper">
						<Space direction="vertical" size="large" style={{ width: "100%" }}>
							<div className="videopage_top">
								<Row gutter={[16, 8]}>
									<Col
										xl={{ span: 16 }}
										lg={{ span: 16 }}
										md={{ span: 24 }}
										sm={{ span: 24 }}
										xs={{ span: 24 }}
									>
										<VideoPlayer url={video.url} onSeek={timeSeek} />
									</Col>
									<Col
										xl={{ span: 8 }}
										lg={{ span: 8 }}
										md={{ span: 24 }}
										sm={{ span: 24 }}
										xs={{ span: 24 }}
									>
										<AutoTranscript
											subtitles={video.subtitles}
											onSeek={handleOnSeek}
										/>
									</Col>
								</Row>
							</div>

							<div className="videopage_bottom">
								<Row gutter={[16, 8]}>
									<Col
										xl={{ span: 16 }}
										lg={{ span: 16 }}
										md={{ span: 24 }}
										sm={{ span: 24 }}
										xs={{ span: 24 }}
									>
										<VideoInfo
											slugCategory={slugCategory}
											videoWords={video.videoWords}
											name={video.name}
											description={video.description}
											level={video.level}
											categoryName={video.categoryName}
											onSeek={handleOnSeekWord}
										/>
									</Col>
									<Col
										xl={{ span: 8 }}
										lg={{ span: 8 }}
										md={{ span: 24 }}
										sm={{ span: 24 }}
										xs={{ span: 24 }}
									>
										<MoreVideo />
									</Col>
								</Row>
							</div>
						</Space>
					</div>
					<BackToTopButton />
				</div>
			) : (
				<div id="top">
					<Result
						status="404"
						title="404"
						subTitle="Sorry, the page you visited does not exist."
					/>
				</div>
			)}
		</>
	);
}

export default VideoPage;
