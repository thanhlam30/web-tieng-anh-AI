import React, { useEffect } from "react";

MainPage.propTypes = {};

function MainPage(props) {
	useEffect(() => {
		document.title = "Tài khoản";
	}, []);
	return <div id="me-main-page">Me main page</div>;
}

export default MainPage;
