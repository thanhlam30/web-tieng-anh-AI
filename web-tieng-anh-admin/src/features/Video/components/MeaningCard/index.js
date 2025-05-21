import PropTypes from "prop-types";
import React from "react";

function MeaningCard(props) {
	const { isTranslate, definition, example } = props;

	return (
		<div className={isTranslate ? "box" : "box--large"}>
			<div className="box__title">
				{isTranslate ? "Nghĩa tiếng Việt" : "Định nghĩa"}
			</div>

			{definition.length > 0 && (
				<div className="box__detail">
					<div className="text-box--fat">{definition}</div>
					{!isTranslate && <div className="text-box--thin">{example}</div>}
				</div>
			)}
		</div>
	);
}

MeaningCard.propTypes = {
	isTranslate: PropTypes.bool,
	definition: PropTypes.string,
	example: PropTypes.string,
};
MeaningCard.defaultProps = {
	isTranslate: false,
	definition: "",
	example: "",
};
export default MeaningCard;
