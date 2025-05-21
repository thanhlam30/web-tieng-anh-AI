import { Col, Input, Row, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const { Text } = Typography;

function UserSearch({ onChange }) {
	const [username, setUsername] = useState("");
	const typingTimeOutRef = useRef(null);

	const handleUserNameChange = (e) => {
		const value = e.target.value;
		if (typingTimeOutRef.current) {
			clearTimeout(typingTimeOutRef.current);
		}
		typingTimeOutRef.current = setTimeout(() => {
			setUsername(value);
		}, 500);
	};

	useEffect(() => {
		onChange(username);
	}, [username]);

	return (
		<>
			<Col xs={24} sm={24} md={24} lg={10} xl={10}>
				<Row align="middle" gutter={[8, 8]}>
					<Col xs={24} sm={24} md={6} lg={6} xl={6}>
						<Text strong>Tài khoản: </Text>
					</Col>
					<Col xs={24} sm={24} md={18} lg={18} xl={18}>
						<Input
							name="name"
							style={{ width: "80%" }}
							onChange={handleUserNameChange}
						/>
					</Col>
				</Row>
			</Col>
		</>
	);
}

UserSearch.propTypes = {
	onChange: PropTypes.func,
};

UserSearch.defaultProps = {
	onChange: null,
};
export default UserSearch;
