import { SwapRightOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const { Text } = Typography;
const { Option } = Select;

VideoSearch.propTypes = {
	categories: PropTypes.array.isRequired,
	onChange: PropTypes.func,
};

VideoSearch.defaultProps = {
	categories: [],
	onChange: null,
};

function VideoSearch(props) {
	const { categories, onChange } = props;
	const levels = [1, 2, 3, 4, 5, 6, 7];
	const [timeFrom, setTimeFrom] = useState(0);
	const [timeTo, setTimeTo] = useState(0);
	const [defaultValue, setDefaultValue] = useState("");
	const [categorySlug, setCategorySlug] = useState(defaultValue);
	const [level, setLevel] = useState(0);
	const typingTimeOutRef = useRef(null);

	const handleCategoryChange = (slug) => {
		setCategorySlug(slug);
	};
	const handleLevelChange = (level) => {
		setLevel(level);
	};

	const handleTimeChange = (e, isTimeFrom = true) => {
		const value = e.target.value;
		if (typingTimeOutRef.current) {
			clearTimeout(typingTimeOutRef.current);
		}
		typingTimeOutRef.current = setTimeout(() => {
			isTimeFrom ? setTimeFrom(value) : setTimeTo(value);
		}, 500);
	};

	useEffect(() => {
		onChange({ timeFrom, timeTo, level, categorySlug });
	}, [timeFrom, timeTo, level, categorySlug]);

	useEffect(() => {
		const newDefaultValue = categories?.length > 0 ? categories[0].slug : "";
		setDefaultValue(newDefaultValue);
	}, [categories]);

	return (
		<>
			<Col>
				<Row align="middle" gutter={[8, 8]}>
					<Col>
						<Text strong>Thời gian: </Text>
					</Col>
					<Col>
						<Input
							name="timeFrom"
							style={{ width: "40%" }}
							type="number"
							placeholder="Từ:"
							onChange={(e) => handleTimeChange(e, true)}
						/>
						<SwapRightOutlined />
						<Input
							name="timeTo"
							style={{ width: "40%" }}
							type="number"
							placeholder="Đến:"
							onChange={(e) => handleTimeChange(e, false)}
						/>
					</Col>
				</Row>
			</Col>

			<Col span={6}>
				<Row align="middle" gutter={[8, 8]}>
					<Col>
						<Text strong>Level: </Text>
					</Col>
					<Col span={12}>
						<Select
							defaultValue={0}
							style={{ width: "80%" }}
							onChange={handleLevelChange}
						>
							<Option value={0} key={0}>
								-- Tất cả --
							</Option>
							{levels.map((value) => {
								return (
									<Option value={value} key={value}>
										{value}
									</Option>
								);
							})}
						</Select>
					</Col>
				</Row>
			</Col>
			<Col span={6}>
				<Row align="middle" gutter={[8, 8]}>
					<Col>
						<Text strong>Chủ đề: </Text>
					</Col>
					<Col span={16}>
						<Select
							defaultValue={defaultValue}
							key={defaultValue}
							style={{ width: "80%" }}
							onChange={handleCategoryChange}
						>
							{categories.map((category, index) => {
								const { name, slug } = category;
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

export default VideoSearch;
