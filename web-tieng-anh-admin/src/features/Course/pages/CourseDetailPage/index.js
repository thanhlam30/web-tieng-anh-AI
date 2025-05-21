import { FileTextOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Pagination, Row, Space } from "antd";
import imageNotFound from "assets/images/image-not-found.svg";
import WordDetailModal from "features/Course/components/WordDetailModal";
import WordModal from "features/Course/components/WordModal";
import WordTable from "features/Course/components/WordTable";
import { fetchCourse, fetchWordsByCourse } from "features/Course/courseSlice";
import { wordValues } from "features/Course/initialAndValidateValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import commonFuc from "utils/commonFuc";
import "./style.scss";

function CourseDetailPage(props) {
	const { coursesDetail, wordsPage } = useSelector((state) => state.course);
	const { data, page, totalPages } = wordsPage;
	const { image, name, description, wordNumber } = coursesDetail;

	const dispatch = useDispatch();
	const { slug } = useParams();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetailViewMode, setIsDetailViewMode] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(wordValues.initial);

	const [query, setQuery] = useState({
		courseSlug: slug,
		page: 0,
		size: 10,
	});

	const handlePageChange = (page) => {
		setQuery({ ...query, page: page - 1 });
	};

	useEffect(() => {
		dispatch(fetchCourse(slug));
		dispatch(fetchWordsByCourse(query));
	}, [query]);

	const handleOnClick = () => {
		setIsModalVisible(true);
		setIsAddMode(true);
		setInitialValue(wordValues.initial);
	};

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
						<FileTextOutlined />
						&nbsp;&nbsp;
						{wordNumber} words
					</div>
				</div>
			</Row>
			<Divider />
			<Row justify="space-between" gutter={[8, 8]}>
				<Col xs={24} sm={24} md={24} lg={4} xl={4}>
					<Button
						type="primary"
						onClick={handleOnClick}
						icon={<PlusCircleOutlined />}
					>
						Thêm từ vựng
					</Button>
				</Col>
			</Row>
			<Space direction="vertical" style={{ width: "100%" }}>
				<div className="blog-main-page__table">
					<WordTable
						words={commonFuc.addSTTForList(data, query.page * query.size)}
						setInitialValue={setInitialValue}
						setIsModalVisible={setIsModalVisible}
						setIsAddMode={setIsAddMode}
						setIsDetailViewMode={setIsDetailViewMode}
						query={query}
					/>
				</div>
				<div style={{ textAlign: "right" }}>
					<Pagination
						current={page + 1}
						total={totalPages * 10}
						onChange={handlePageChange}
						showSizeChanger={false}
						showQuickJumper
					/>
				</div>
			</Space>
			{isModalVisible && (
				<WordModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					isAddMode={isAddMode}
					initialValue={initialValue}
					query={query}
				/>
			)}
			{isDetailViewMode && (
				<WordDetailModal
					isDetailViewMode={isDetailViewMode}
					setIsDetailViewMode={setIsDetailViewMode}
					word={initialValue}
				/>
			)}
		</div>
	);
}

export default CourseDetailPage;
