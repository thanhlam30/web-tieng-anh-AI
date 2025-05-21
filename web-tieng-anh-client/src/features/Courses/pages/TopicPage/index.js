import { FileTextOutlined } from "@ant-design/icons";
import { Affix, Divider, Pagination, Result, Row } from "antd";
import imageNotFound from "assets/images/image-not-found.svg";
import WordList from "features/Courses/components/WordList";
import {
	fetchCourseDetail,
	fetchCourseWords,
} from "features/Courses/courseSlice";
import { fetchWordNotes } from "features/WordNote/wordNoteSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./style.scss";

function TopicPage(props) {
	const { slug } = useParams();

	const { courseWords, courseDetail } = useSelector((state) => state.course);

	const { data = [], page = 1, size = 1, totalPages = 1 } = courseWords;

	const dispatch = useDispatch();

	const handleOnPageChange = (page) => {
		window.scrollTo(0, 0);
		dispatch(fetchCourseWords({ courseSlug: slug, page: page - 1 }));
	};

	useEffect(() => {
		document.title = courseDetail?.name || "Word";
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchCourseWords({ courseSlug: slug }));
		dispatch(fetchCourseDetail({ slug }));
		dispatch(fetchWordNotes());
	}, []);

	return (
		<div id="topic-page">
			{courseDetail && Object.keys(courseDetail).length > 0 ? (
				<>
					<Row justify="center" className="topic-thumbnail">
						<img
							src={courseDetail?.image || ""}
							alt={courseDetail?.name}
							onError={(e) => (e.target.src = imageNotFound)}
						/>
						<div className="topic-thumbnail__overlay">
							<div className="topic-thumbnail__title">{courseDetail?.name}</div>
							<div className="topic-thumbnail__description">
								{courseDetail?.description}
							</div>
							<div className="topic-thumbnail__word-count">
								<FileTextOutlined />
								&nbsp;&nbsp;
								{courseDetail?.wordNumber} words
							</div>
						</div>
					</Row>
					<Affix>
						<Row justify="center" className="pagination-top">
							<Pagination
								total={totalPages * size}
								showQuickJumper
								pageSize={size}
								onChange={handleOnPageChange}
								showSizeChanger={false}
								current={page + 1}
							/>
						</Row>
					</Affix>
					<Divider orientation="left" style={{ fontSize: 32 }}>
						<div className="name_of_topic">{courseDetail?.name}</div>
					</Divider>
					<div className="topic-page__content">
						<WordList data={data} />
					</div>
				</>
			) : (
				<Result status="404" title="không tìm thấy" />
			)}
		</div>
	);
}
TopicPage.propTypes = {};
TopicPage.defaultProps = {};

export default TopicPage;
