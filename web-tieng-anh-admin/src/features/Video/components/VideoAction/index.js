import {
	DeleteTwoTone,
	EditTwoTone,
	ExclamationCircleOutlined,
	InfoCircleTwoTone,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Dropdown, Menu, message, Modal } from "antd";
import { videoApi } from "api";
import {
	deleteVideo,
	fetchVideo,
	fetchVideos,
	setLoading,
} from "features/Video/videoSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { confirm, Text } = Modal;

function VideoAction(props) {
	const { videoInf, setInitialValue, setIsModalVisible, setIsAddMode, query } =
		props;

	const { videoDetails } = useSelector((state) => state.video);
	const history = useHistory();
	const dispatch = useDispatch();

	const handleOnDetailClick = () => {
		history.push(`/admin/videos/${videoInf.slug}`);
	};

	const handleOnUpdateClick = async () => {
		dispatch(setLoading(true));
		const response = await videoApi.fetchVideo(videoInf.slug);
		console.log({ response });
		const categoryId = response.categoryId;
		const description = response.description;
		const video = response.url;

		const videoUpdate = { ...videoInf, categoryId, description, video };
		console.log({ videoUpdate });
		dispatch(setLoading(false));
		setInitialValue(videoUpdate);
		setIsAddMode(false);
		setIsModalVisible(true);
	};

	const handleOnDeleteClick = async () => {
		confirm({
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có muốn xóa video này không ?",
			async onOk() {
				try {
					unwrapResult(await dispatch(deleteVideo({ videoId: videoInf.id })));
					message.success("Xóa thành công");
					dispatch(fetchVideos(query));
				} catch (error) {
					message.error("Xóa thất bại");
				}
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const menu = (
		<Menu>
			<Menu.Item onClick={handleOnDetailClick}>
				<div className="menu-adjust--center">
					<InfoCircleTwoTone />
					<span className="menu-title">Xem chi tiết</span>
				</div>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item onClick={handleOnUpdateClick}>
				<div className="menu-adjust--center">
					<EditTwoTone twoToneColor="#ad8b00" />
					<span className="menu-title">Sửa</span>
				</div>
			</Menu.Item>

			<Menu.Divider />
			<Menu.Item onClick={handleOnDeleteClick}>
				<div className="menu-adjust--center">
					<DeleteTwoTone twoToneColor="#a8071a" />
					<span className="menu-title">Xóa</span>
				</div>
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu} placement="bottomLeft">
			<Button type="primary" ghost>
				Thao tác
			</Button>
		</Dropdown>
	);
}

VideoAction.propTypes = {
	blogId: PropTypes.number,
	videoInf: PropTypes.object,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
};

VideoAction.defaultProps = {
	blogId: 0,
	videoInf: {},
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
};

export default VideoAction;
