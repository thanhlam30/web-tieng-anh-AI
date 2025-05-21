import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row, Space } from "antd";
import CourseModal from "features/Course/components/CourseModal";
import CourseSearch from "features/Course/components/CourseSearch";
import CourseTable from "features/Course/components/CourseTable";
import { fetchCourses, fetchTopics } from "features/Course/courseSlice";
import { courseValues } from "features/Course/initialAndValidateValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import commonFuc from "utils/commonFuc";
import "./style.scss";

function MainPage(props) {
	const dispatch = useDispatch();
	const { coursesPage, topics } = useSelector((state) => state.course);
	const { data, page, totalPages } = coursesPage;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(courseValues.initial);

	const [query, setQuery] = useState({
		name: "",
		topicSlug: "",
		page: 0,
		size: 10,
	});

	const handleOnClick = () => {
		setIsModalVisible(true);
		setIsAddMode(true);
		setInitialValue(courseValues.initial);
	};

	const handleSearchChange = (queryValue) => {
		const { name, topicSlug } = queryValue;

		setQuery({ page: 0, size: 10, name, topicSlug });
	};

	const handlePageChange = (page, pageSize) => {
		setQuery({ ...query, page: page - 1 });
	};

	useEffect(() => {
		dispatch(fetchCourses(query));
		dispatch(fetchTopics());
	}, [query]);

	return (
		<div id="course-main-page">
			<div></div>
			<Row justify="space-between" gutter={[8, 8]}>
				<Col xs={24} sm={24} md={24} lg={4} xl={4}>
					<Button
						type="primary"
						onClick={handleOnClick}
						icon={<PlusCircleOutlined />}
					>
						Thêm khóa học
					</Button>
				</Col>
				<CourseSearch topics={topics} onChange={handleSearchChange} />
			</Row>

			<Space direction="vertical" style={{ width: "100%" }}>
				<div className="course-main-page__table">
					<CourseTable
						courses={commonFuc.addSTTForList(data, query.page * query.size)}
						topics={topics}
						setInitialValue={setInitialValue}
						setIsModalVisible={setIsModalVisible}
						setIsAddMode={setIsAddMode}
						query={query}
					/>
				</div>
				<div style={{ textAlign: "right" }}>
					<Pagination
						current={page + 1}
						total={totalPages * 10}
						onChange={handlePageChange}
						showSizeChanger={false}
					/>
				</div>
			</Space>

			{isModalVisible && (
				<CourseModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					isAddMode={isAddMode}
					initialValue={initialValue}
					query={query}
				/>
			)}
		</div>
	);
}

export default MainPage;
