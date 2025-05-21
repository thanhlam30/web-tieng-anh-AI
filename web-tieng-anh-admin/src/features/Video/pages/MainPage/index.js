import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row, Space } from "antd";
import { videoCategoryApi } from "api";
import VideoModal from "features/Video/components/VideoModal";
import VideoSearch from "features/Video/components/VideoSearch";
import VideoTable from "features/Video/components/VideoTable";
import { videoValues } from "features/Video/initialAndValidateValues";
import { fetchVideoCategories, fetchVideos } from "features/Video/videoSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import commonFuc from "utils/commonFuc";
import "./style.scss";

function MainPage(props) {
	const dispatch = useDispatch();

	const { videosPage, videoCategories } = useSelector((state) => state.video);
	const { data, page, totalPages } = videosPage;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(videoValues.initial);

	const [query, setQuery] = useState({
		categorySlug: "",
		timeFrom: 0,
		timeTo: 0,
		level: 0,
		page: 0,
		size: 10,
	});

	const handleOnClick = () => {
		setIsModalVisible(true);
		setIsAddMode(true);
		setInitialValue(videoValues.initial);
	};

	const handleSearchChange = (queryValue) => {
		setQuery({ page: 0, size: 10, ...queryValue });
	};

	const handlePageChange = (page, pageSize) => {
		setQuery({ ...query, page: page - 1 });
	};

	// initial query for the first render
	const handleInitialQuery = async () => {
		const data = await videoCategoryApi.fetchVideoCategories();

		const slug = data.length > 0 ? data[0].slug : "";
		console.log(slug);
		const initialQuery = {
			...query,
			categorySlug: slug,
		};

		setQuery(initialQuery);

		return initialQuery;
	};

	useEffect(() => {
		const checkQuery = query.categorySlug !== "" ? query : handleInitialQuery();
		dispatch(fetchVideoCategories());
		dispatch(fetchVideos(checkQuery));
	}, [query]);

	return (
		<div id="course-main-page">
			<div></div>
			<Row justify="space-between" gutter={[8, 8]}>
				<Col
					// xs={24} sm={24} md={24} lg={4} xl={4}
					span={2}
				>
					<Button
						type="primary"
						onClick={handleOnClick}
						icon={<PlusCircleOutlined />}
					>
						Thêm video
					</Button>
				</Col>
				<VideoSearch
					categories={videoCategories}
					onChange={handleSearchChange}
				/>
			</Row>

			<Space direction="vertical" style={{ width: "100%" }}>
				<div className="course-main-page__table">
					<VideoTable
						videos={commonFuc.addSTTForList(data, query.page * query.size)}
						setInitialValue={setInitialValue}
						setIsModalVisible={setIsModalVisible}
						setIsAddMode={setIsAddMode}
						query={query}
					/>
				</div>
				<div style={{ textAlign: "right" }}>
					<Pagination
						current={page + 1}
						total={totalPages * 10}
						onChange={handlePageChange}
						showSizeChanger={false}
					/>
				</div>
			</Space>

			{isModalVisible && (
				<VideoModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					isAddMode={isAddMode}
					initialValue={initialValue}
					query={query}
				/>
			)}
		</div>
	);
}

export default MainPage;
