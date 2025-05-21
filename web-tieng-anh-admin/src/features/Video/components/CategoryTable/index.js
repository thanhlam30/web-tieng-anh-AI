import { Table } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import CategoryAction from "../CategoryAction";

function CategoryTable(props) {
	const { categories, setInitialValue, setIsModalVisible, setIsAddMode } =
		props;
	return (
		<Table
			dataSource={categories}
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
					const category = { id: record.id, name: record.name };
					return (
						<CategoryAction
							category={category}
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

CategoryTable.propTypes = {
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
	categories: PropTypes.array,
};
CategoryTable.defaultProps = {
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
	categories: [],
};

export default CategoryTable;
