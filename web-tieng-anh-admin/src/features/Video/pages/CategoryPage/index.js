import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import CategoryModal from "features/Video/components/CategoryModal";
import CategoryTable from "features/Video/components/CategoryTable";
import { videoCategoryValues } from "features/Video/initialAndValidateValues";
import { fetchVideoCategories } from "features/Video/videoSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

function CategoryPage(props) {
	const { videoCategories } = useSelector((state) => state.video);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(videoCategoryValues.initial);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVideoCategories());
	}, []);

	const handleOnClick = () => {
		setIsModalVisible(true);
		setIsAddMode(true);
		setInitialValue(videoCategoryValues.initial);
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
						Thêm danh mục mới
					</Button>
				</div>

				<div className="topic-table">
					<CategoryTable
						setInitialValue={setInitialValue}
						setIsModalVisible={setIsModalVisible}
						setIsAddMode={setIsAddMode}
						categories={videoCategories}
					/>
				</div>
			</Space>

			{isModalVisible && (
				<CategoryModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					isAddMode={isAddMode}
					initialValue={initialValue}
				/>
			)}
		</div>
	);
}

export default CategoryPage;
