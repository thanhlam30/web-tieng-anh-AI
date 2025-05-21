import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import TopicModal from "features/Course/components/TopicModal";
import TopicTable from "features/Course/components/TopicTable";
import { fetchTopics } from "features/Course/courseSlice";
import { topicValues } from "features/Course/initialAndValidateValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

function TopicPage(props) {
	const { topics } = useSelector((state) => state.course);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(topicValues.initial);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTopics());
	}, []);

	const handleOnClick = () => {
		setIsModalVisible(true);
		setIsAddMode(true);
		setInitialValue(topicValues.initial);
	};

	return (
		<div className="topic-page">
			<Space direction="vertical" style={{ width: "100%" }} size="large">
				<div className="topic-button--add">
					<Button
						type="primary"
						icon={<PlusCircleOutlined />}
						size="mediunm"
						onClick={handleOnClick}
					>
						Thêm chủ đề mới
					</Button>
				</div>

				<div className="topic-table">
					<TopicTable
						setInitialValue={setInitialValue}
						setIsModalVisible={setIsModalVisible}
						setIsAddMode={setIsAddMode}
						topics={topics}
					/>
				</div>
			</Space>

			{isModalVisible && (
				<TopicModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					isAddMode={isAddMode}
					initialValue={initialValue}
				/>
			)}
		</div>
	);
}

export default TopicPage;
