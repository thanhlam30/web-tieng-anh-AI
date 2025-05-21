import { Table } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import TopicAction from "../TopicAction";

function TopicTable(props) {
	const { topics, setInitialValue, setIsModalVisible, setIsAddMode } = props;
	return (
		<Table
			dataSource={topics}
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
					return <span>{index + 1}</span>;
				}}
			/>
			<Column title="Tên chủ đề" dataIndex="name" key="name" />
			<Column
				key="action"
				align="center"
				render={(_, record) => {
					const topic = { id: record.id, name: record.name };
					return (
						<TopicAction
							topic={topic}
							setInitialValue={setInitialValue}
							setIsModalVisible={setIsModalVisible}
							setIsAddMode={setIsAddMode}
						/>
					);
				}}
			/>
		</Table>
	);
}

TopicTable.propTypes = {
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
	topics: PropTypes.array,
};
TopicTable.defaultProps = {
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
	topics: [],
};

export default TopicTable;
