import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Result, Button } from "antd";
import "./style.scss";

NotFoundPage.propTypes = {};

function NotFoundPage(props) {
	useEffect(() => {
		document.title = "Trang không khả dụng";
	}, []);
	return (
		<div id="not-found-page">
			<div className="main">
				<Result status="404" title="404" subTitle="Trang không khả dụng" />
			</div>
		</div>
	);
}

export default NotFoundPage;
