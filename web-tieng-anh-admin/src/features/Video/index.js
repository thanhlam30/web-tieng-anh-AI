import { Spin } from "antd";
import NotFoundPage from "components/NotFoundPage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import MainPage from "./pages/MainPage";
import VideoDetailPage from "./pages/VideoDetailPage";

Video.propTypes = {};

function Video(props) {
	const { url } = useRouteMatch();
	const { isLoading } = useSelector((state) => state.video);
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(fetchVideoCategories());
	// }, []);

	return (
		<Spin spinning={isLoading}>
			<Switch>
				<Route exact path={url} component={MainPage} />
				<Route exact path={`${url}/categories`} component={CategoryPage} />

				<Route exact path={`${url}/:slug`} component={VideoDetailPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</Spin>
	);
}

export default Video;
