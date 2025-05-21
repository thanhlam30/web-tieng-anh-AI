import { AppstoreAddOutlined } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import {
	BackToTopButton,
	WordNoteCard,
	WordNoteForm,
	WordNoteHeader,
} from "features/WordNote/common";
import { WORDNOTE_IMAGES } from "features/WordNote/constants";
import { fetchWordNotes } from "features/WordNote/wordNoteSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

function MainPage(props) {
	const { wordNotes } = useSelector((state) => state.wordNote);
	const dispatch = useDispatch();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { Title } = Typography;
	const wordnoteBgs = WORDNOTE_IMAGES;

	useEffect(() => {
		dispatch(fetchWordNotes());
		document.title = "Wordnote";
	}, []);
	return (
		<div id="word-note-main-page">
			<WordNoteHeader isMainPage={true} />

			<Row justify="start" gutter={[24, 24]}>
				<Col xs={24} sm={24} md={12} lg={8}>
					<div className="word-note-card">
						<div
							className="word-note-card__overlay add-word-note"
							onClick={() => {
								setIsModalVisible(true);
							}}
						>
							<Space align="center">
								<Title level={3}>
									<AppstoreAddOutlined /> Thêm wordnote
								</Title>
							</Space>
						</div>
					</div>
				</Col>

				{wordNotes.map((wordNote, index) => {
					const i = index % 10;
					return (
						<Col key={wordNote.id} xs={24} sm={24} md={12} lg={8}>
							<WordNoteCard wordNote={wordNote} image={wordnoteBgs[i]} />
						</Col>
					);
				})}
				<BackToTopButton />
			</Row>

			<WordNoteForm
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				isAddMode={true}
			/>
		</div>
	);
}

MainPage.propTypes = {};
MainPage.defaultProps = {};

export default MainPage;
