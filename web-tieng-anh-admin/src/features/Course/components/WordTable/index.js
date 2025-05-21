import { Table } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import WordAction from "../WordAction";

function WordTable(props) {
	const {
		setInitialValue,
		setIsModalVisible,
		setIsAddMode,
		setIsDetailViewMode,
		words,
		query,
	} = props;

	const handleRedundantProperty = (id) => {
		const filter = words.filter((course) => course.id === id);
		const course = filter ? filter[0] : null;
		if (course) {
			delete course.stt;
			delete course.personNumber;
			delete course.wordNumber;
		}
		return course;
	};

	return (
		<Table dataSource={words} pagination={false}>
			<Column
				align="center"
				width="60px"
				title="STT"
				dataIndex="stt"
				key="stt"
			/>
			<Column title="Từ vựng" width="140px" dataIndex="name" key="name" />
			<Column title="Loại từ" dataIndex="type" key="type" />
			<Column title="Phát âm" dataIndex="pronounce" key="pronounce" />
			<Column title="Định nghĩa" dataIndex="definition" key="mean" />
			<Column title="Nghĩa tiếng Việt" dataIndex="mean" key="mean" />
			<Column
				key="action"
				align="center"
				render={(_, record, index) => {
					return (
						<WordAction
							word={record}
							setInitialValue={setInitialValue}
							setIsModalVisible={setIsModalVisible}
							setIsAddMode={setIsAddMode}
							setIsDetailViewMode={setIsDetailViewMode}
							query={query}
						/>
					);
				}}
			/>
		</Table>
	);
}

WordTable.propTypes = {
	words: PropTypes.array,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
	setIsDetailViewMode: PropTypes.func,
	query: PropTypes.object,
};

WordTable.defaultProps = {
	words: [],
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
	setIsDetailViewMode: null,
};

export default WordTable;
