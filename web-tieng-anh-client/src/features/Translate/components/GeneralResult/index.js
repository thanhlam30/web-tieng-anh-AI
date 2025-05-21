import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

function GeneralResult(props) {
	const { data } = props;
	const { type, means } = data;

	return (
		<li className="general-result">
			<span className="general-result__type">{type}</span>
			<ul>
				{means &&
					means.map((mean, index) => {
						return (
							<li key={index} className="general-result__mean">
								{mean.value}
								{mean.examples &&
									mean.examples.map((example, index) => {
										return (
											<ul key={index} className="general-result__example">
												<li>{example.key}</li>
												<li>{example.value}</li>
											</ul>
										);
									})}
							</li>
						);
					})}
			</ul>
		</li>
	);
}

GeneralResult.propTypes = {
	data: PropTypes.object,
};
GeneralResult.defaultProps = {
	data: {},
};

export default GeneralResult;
