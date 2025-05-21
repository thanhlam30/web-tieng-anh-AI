import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import AudioButton from "components/AudioButton";
import { videoWordValues } from "features/Video/initialAndValidateValues";
import PropTypes from "prop-types";
import React, { useState } from "react";
import VideoWordAction from "../VideoWordAction";
import VideoWordModal from "../VideoWordModal";

function VideoWordTab(props) {
	const { videoWords, videoId } = props;
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(videoWordValues.initial);

	const handleOnAddClick = () => {
		setIsModalVisible(true);
		setIsAddMode(true);
		setInitialValue(videoWordValues.initial);
	};

	return (
		<div>
			<Space direction="vertical" style={{ width: "100%" }} size="large">
				<Button
					type="primary"
					icon={<PlusCircleOutlined />}
					size="mediunm"
					onClick={handleOnAddClick}
				>
					Thêm từ mới
				</Button>

				<div className="topic-table">
					<Table
						dataSource={videoWords}
						pagination={false}
						scroll={{ y: 420 }}
						style={{ height: "490px" }}
					>
						<Column
							align="center"
							width="60px"
							title="STT"
							key="stt"
							render={(_, __, index) => {
								return <>{index + 1}</>;
							}}
						/>
						<Column title="Từ vựng" dataIndex="name" key="name" />
						<Column title="Từ gốc" dataIndex="origin" key="origin" />

						<Column title="Phổ biến" dataIndex="frequency" key="frequency" />
						<Column
							title="Audio"
							key="sound"
							align="center"
							render={(_, record) => {
								const audioUrl = record.sound;
								return <AudioButton audioUrl={audioUrl} toolTip="Nghe" />;
							}}
						/>
						<Column
							key="action"
							align="center"
							render={(_, record) => {
								return (
									<VideoWordAction
										videoWord={record}
										setInitialValue={setInitialValue}
										setIsModalVisible={setIsModalVisible}
										setIsAddMode={setIsAddMode}
									/>
								);
							}}
						/>
					</Table>
				</div>
			</Space>
			{isModalVisible && (
				<VideoWordModal
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
VideoWordTab.propTypes = {
	videoWords: PropTypes.array,
	videoId: PropTypes.number,
};
VideoWordTab.defaultProps = {
	videoWords: [],
	videoId: 0,
};

export default VideoWordTab;
