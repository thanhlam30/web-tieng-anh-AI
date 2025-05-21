import { Divider, Pagination, Row } from "antd";
import CourseList from "features/Courses/components/CourseList";
import CourseSearch from "features/Courses/components/CourseSearch";
import { fetchCourses, fetchTopics } from "features/Courses/courseSlice";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.scss";

function MainPage(props) {
	const history = useHistory();

	const [query, setQuery] = useState({
		name: "",
		topicSlug: "",
		page: 0,
		size: 12,
	});

	const dispatch = useDispatch();
	const { courses, topics } = useSelector((state) => state.course);

	const { data = [], page = 1, size = 1, totalPages = 1 } = courses;

	const handleSearchChange = (queryValue) => {
		const { name, topicSlug } = queryValue;
		let params = {};
		if (name !== "") {
			params.name = encodeURIComponent(name);
		}
		if (topicSlug !== "") {
			params.topic = topicSlug;
		}
		history.replace({ search: queryString.stringify(params) });

		setQuery({ page: 0, size: 12, name, topicSlug });
	};

	const handlePageChange = (page, pageSize) => {
		setQuery({ ...query, page: page - 1 });
	};

	useEffect(() => {
		document.title = "Khóa học từ vựng";
	}, []);
	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchCourses(query));
		dispatch(fetchTopics());
	}, [query]);

	return (
		// <div className='course-wrapper'>
		<div id="course-main-page">
			<Row justify="start" gutter={[8, 8]}>
				<CourseSearch topics={topics} onChange={handleSearchChange} />
			</Row>

			<Divider />

			<CourseList courses={data} />

			{totalPages > 1 && (
				<Row justify="center">
					<Pagination
						total={totalPages * size}
						showQuickJumper
						pageSize={size}
						onChange={handlePageChange}
						showSizeChanger={false}
						current={page + 1}
					/>
				</Row>
			)}
		</div>
		// </div>
	);
}

MainPage.propTypes = {};
MainPage.defaultProps = {};

export default MainPage;
