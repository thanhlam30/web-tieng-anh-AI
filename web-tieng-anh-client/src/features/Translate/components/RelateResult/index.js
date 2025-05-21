import React from "react";
import PropTypes from "prop-types";

function RelateResult(props) {
	const { datas, title } = props;

	return (
		<>
			{title}
			{datas.map((data, index) => {
				return (
					<ul key={index}>
						<li>{data.type}</li>
						<p>
							{data.value &&
								data.value.map((value, index) => {
									return <span key={index}>{`${value}, `}</span>;
								})}
						</p>
					</ul>
				);
			})}
		</>
	);
}

RelateResult.propTypes = {
	data: PropTypes.array,
	title: PropTypes.string,
};
RelateResult.defaultProps = {
	data: [],
	title: "",
};

export default RelateResult;
