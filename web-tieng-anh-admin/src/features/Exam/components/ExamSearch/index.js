import { Col, Input, Row, Select, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const { Text } = Typography;
const { Option } = Select;

ExamSearch.propTypes = {
	books: PropTypes.array.isRequired,
	onChange: PropTypes.func,
};

ExamSearch.defaultProps = {
	books: [],
	onChange: null,
};

function ExamSearch(props) {
	const { books, onChange } = props;
	const [name, setName] = useState("");
	const [bookName, setBookName] = useState("");
	const typingTimeOutRef = useRef(null);

	const handleTopicChange = (value) => {
		setBookName(value);
	};

	const handleNameChange = (e) => {
		const value = e.target.value;
		if (typingTimeOutRef.current) {
			clearTimeout(typingTimeOutRef.current);
		}
		typingTimeOutRef.current = setTimeout(() => {
			setName(value);
		}, 500);
	};

	useEffect(() => {
		onChange({ name, bookName });
	}, [name, bookName]);

	return (
		<>
			<Col xs={24} sm={24} md={24} lg={10} xl={10}>
				<Row align="middle" gutter={[8, 8]}>
					<Col xs={24} sm={24} md={6} lg={6} xl={6}>
						<Text strong>Tên đề thi: </Text>
					</Col>
					<Col xs={24} sm={24} md={18} lg={18} xl={18}>
						<Input
							name="name"
							style={{ width: "80%" }}
							onChange={handleNameChange}
						/>
					</Col>
				</Row>
			</Col>

			<Col xs={24} sm={24} md={24} lg={10} xl={10}>
				<Row align="middle" gutter={[8, 8]}>
					<Col xs={24} sm={24} md={6} lg={6} xl={6}>
						<Text strong>Bộ đề: </Text>
					</Col>
					<Col xs={24} sm={24} md={18} lg={18} xl={18}>
						<Select
							defaultValue=""
							style={{ width: "80%" }}
							onChange={handleTopicChange}
						>
							<Option value="" key={-1}>
								-- Tất cả --
							</Option>
							{books?.map((book) => {
								const { id, name } = book;
								return (
									<Option value={name} key={id}>
										{name}
									</Option>
								);
							})}
						</Select>
					</Col>
				</Row>
			</Col>
		</>
	);
}

export default ExamSearch;
