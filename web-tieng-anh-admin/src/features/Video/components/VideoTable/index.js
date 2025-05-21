import { Table } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import VideoAction from "../VideoAction";

function VideoTable(props) {
	const { setInitialValue, setIsModalVisible, setIsAddMode, videos, query } =
		props;

	return (
		<Table dataSource={videos} pagination={false}>
			<Column
				align="center"
				width="60px"
				title="STT"
				dataIndex="stt"
				key="stt"
			/>
			<Column title="Tên video" dataIndex="name" key="name" />

			<Column
				title="Thời lượng"
				dataIndex="durationString"
				key="durationString"
			/>
			<Column title="Level" dataIndex="level" key="level" />
			<Column
				key="action"
				align="center"
				render={(_, record, index) => {
					return (
						<VideoAction
							videoInf={record}
							setInitialValue={setInitialValue}
							setIsModalVisible={setIsModalVisible}
							setIsAddMode={setIsAddMode}
							query={query}
						/>
					);
				}}
			/>
		</Table>
	);
}

VideoTable.propTypes = {
	videos: PropTypes.array,
	categories: PropTypes.array,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
	query: PropTypes.object,
};

VideoTable.defaultProps = {
	videos: [],
	categories: [],
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
};

export default VideoTable;
