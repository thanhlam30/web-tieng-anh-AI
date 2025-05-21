import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, message, Modal, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { subtitleValues } from "features/Video/initialAndValidateValues";
import { deleteSubtitle, fetchVideo } from "features/Video/videoSlice";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SubtitleModal from "../SubtitleModal";

function SubtitleTab(props) {
	const { subtitles, videoId } = props;
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(subtitleValues.initial);
	const dispatch = useDispatch();
	const { slug } = useParams();
	const { confirm } = Modal;

	const handleDelete = () => {
		confirm({
			content: "Bạn có muốn xóa phụ đề cuối không ?",
			async onOk() {
				try {
					unwrapResult(await dispatch(deleteSubtitle({ videoId })));
					message.success(`Xóa thành công`);
					dispatch(fetchVideo(slug));
				} catch (error) {
					message.error("Không thể xóa phụ đề này");
				}
			},
		});
	};

	const handleOnAddClick = () => {
		setIsModalVisible(true);
		setIsAddMode(true);
		setInitialValue(subtitleValues.initial);
	};

	const handleOnUpdateClick = (subtitle) => {
		setInitialValue(subtitle);
		setIsAddMode(false);
		setIsModalVisible(true);
	};

	return (
		<div>
			<Space direction="vertical" style={{ width: "100%" }} size="large">
				<Space size="large">
					<Button
						type="primary"
						icon={<PlusCircleOutlined />}
						size="mediunm"
						onClick={handleOnAddClick}
					>
						Thêm phụ đề mới
					</Button>
					<Button
						type="danger"
						icon={<DeleteOutlined />}
						size="mediunm"
						onClick={handleDelete}
					>
						Xóa phụ đề cuối
					</Button>
				</Space>

				<div className="topic-table">
					<Table
						dataSource={subtitles}
						pagination={false}
						scroll={{ y: 420 }}
						style={{ height: "490px" }}
					>
						<Column
							align="center"
							width="60px"
							title="STT"
							dataIndex="stt"
							key="stt"
							render={(_, record) => <>{record.stt + 1}</>}
						/>
						<Column title="Nội dung phụ đề" dataIndex="content" key="content" />

						<Column title="Bắt đầu" dataIndex="start" key="start" />
						<Column title="Kết thúc" dataIndex="end" key="end" />
						<Column
							key="action"
							align="center"
							render={(_, record) => {
								return (
									<Button onClick={() => handleOnUpdateClick(record)}>
										Sửa
									</Button>
								);
							}}
						/>
					</Table>
				</div>
			</Space>
			{isModalVisible && (
				<SubtitleModal
					videoId={videoId}
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					isAddMode={isAddMode}
					initialValue={initialValue}
				/>
			)}
		</div>
	);
}
SubtitleTab.propTypes = {
	subtitles: PropTypes.array,
	videoId: PropTypes.number,
};
SubtitleTab.defaultProps = {
	subtitles: [],
	videoId: 0,
};

export default SubtitleTab;
