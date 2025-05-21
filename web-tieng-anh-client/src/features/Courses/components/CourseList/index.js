import { Col, Result, Row } from "antd";
import BackToTopButton from "components/BackToTopButton";
import TopicCard from "components/TopicCard";
import PropTypes from "prop-types";
import React from "react";
import "./style.scss";

function CourseList(props) {
	const { courses } = props;

	return courses.length > 0 ? (
		<Row justify="start" gutter={[36, 24]}>
			{courses.map((course, index) => {
				const topic = {
					...course,
					additionalInfo: `${course.wordNumber} words`,
				};
				return (
					<Col key={index} xs={24} sm={12} md={8} lg={6}>
						<TopicCard topic={topic} />
					</Col>
				);
			})}
			<BackToTopButton />
		</Row>
	) : (
		<Result status="404" title="Không tìm thấy" />
	);
}

CourseList.propTypes = {
	courses: PropTypes.array,
};
CourseList.defaultProps = {
	courses: [],
};
export default CourseList;
