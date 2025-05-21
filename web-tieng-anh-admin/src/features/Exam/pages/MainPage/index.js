import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row, Space } from "antd";
import ExamModal from "features/Exam/components/ExamModal";
import ExamSearch from "features/Exam/components/ExamSearch";
import ExamTable from "features/Exam/components/ExamTable";
import { fetchBooks, fetchExams } from "features/Exam/examSlice";
import { examValues } from "features/Exam/initialAndValidateValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import commonFuc from "utils/commonFuc";

MainPage.propTypes = {};

function MainPage(props) {
	const dispatch = useDispatch();
	const { examsPage, books } = useSelector((state) => state.exam);
	const { data, page, totalPages } = examsPage;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(examValues.initial);

	const [query, setQuery] = useState({
		name: "",
		bookName: "",
		page: 0,
		size: 10,
	});

	const handleOnClick = () => {
		setIsModalVisible(true);
		setIsAddMode(true);
		setInitialValue(examValues.initial);
	};

	const handleSearchChange = (queryValue) => {
		const { name, bookName } = queryValue;
		setQuery({ page: 0, size: 10, name, bookName });
	};

	const handlePageChange = (page, pageSize) => {
		setQuery({ ...query, page: page - 1 });
	};

	useEffect(() => {
		dispatch(fetchExams(query));
		dispatch(fetchBooks());
	}, [query]);

	return (
		<div id="exam-main-page">
			<Row justify="space-between" gutter={[8, 8]}>
				<Col xs={24} sm={24} md={24} lg={4} xl={4}>
					<Button
						type="primary"
						onClick={handleOnClick}
						icon={<PlusCircleOutlined />}
					>
						Thêm bài thi
					</Button>
				</Col>
				<ExamSearch books={books} onChange={handleSearchChange} />
			</Row>

			<Space direction="vertical" style={{ width: "100%" }}>
				<div className="course-main-page__table">
					<ExamTable
						exams={commonFuc.addSTTForList(data, query.page * query.size)}
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
				<ExamModal
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
