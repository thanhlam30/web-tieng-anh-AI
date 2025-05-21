import { Col, Input, Row, Select, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const { Text } = Typography;
const { Option } = Select;

CourseSearch.propTypes = {
	topics: PropTypes.array.isRequired,
	onChange: PropTypes.func,
};

CourseSearch.defaultProps = {
	categories: [],
	onChange: null,
};

function CourseSearch({ topics, onChange }) {
	const [name, setName] = useState("");
	const [topicSlug, setTopicSlug] = useState("");
	const typingTimeOutRef = useRef(null);

	const handleTopicChange = (slug) => {
		setTopicSlug(slug === 0 ? "" : slug);
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
		onChange({ name, topicSlug });
	}, [name, topicSlug]);

	return (
		<>
			<Col xs={24} sm={24} md={24} lg={10} xl={10}>
				<Row align="middle" gutter={[8, 8]}>
					<Col xs={24} sm={24} md={6} lg={6} xl={6}>
						<Text strong>Tên khóa học: </Text>
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
						<Text strong>Chủ đề: </Text>
					</Col>
					<Col xs={24} sm={24} md={18} lg={18} xl={18}>
						<Select
							defaultValue={0}
							style={{ width: "80%" }}
							onChange={handleTopicChange}
						>
							<Option value={0} key={-1}>
								-- Tất cả --
							</Option>
							{topics.map((topic, index) => {
								const { name, slug } = topic;
								return (
									<Option value={slug} key={index}>
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

export default CourseSearch;
