import { Col, Result, Row, Space, Tabs, Typography } from "antd";
import AudioButton from "components/AudioButton";
import BackToTopButton from "components/BackToTopButton";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import GeneralResult from "../GeneralResult";
import RelateResult from "../RelateResult";
import "./style.scss";

function TranslateResult(props) {
	const { translateResult } = props;

	const { name, pronounce, usSound, ukSound, common, specialized, relate } =
		translateResult;

	const { isNotFound } = useSelector((state) => state.translate);

	const { TabPane } = Tabs;
	const { Title } = Typography;

	return (
		<div className="translate-result">
			{isNotFound ? (
				<Result status="404" title="404" subTitle="Không tìm thấy" />
			) : (
				<>
					{/* Header */}
					<div className="header-result">
						<Title level={2}>
							<Row>
								<Space align="start" size="middle" wrap>
									<Col>
										<span className="header-result__word">{name}</span>
									</Col>
									<Col>
										<span className="header-result__pronounce">
											{pronounce && `/${pronounce}/`}
										</span>
									</Col>

									<Col>
										<AudioButton
											audioUrl={usSound}
											toolTip={"Nghe"}
											title={"US"}
										/>
										<AudioButton
											audioUrl={ukSound}
											toolTip={"Nghe"}
											title={"UK"}
										/>
									</Col>
								</Space>
							</Row>
						</Title>
					</div>
					{/* Result */}
					<Tabs defaultActiveKey="1" type="line" size="large">
						{/* Common */}
						<TabPane tab="Thông dụng" key="1">
							{common &&
								common.map((data, index) => {
									return <GeneralResult key={index} data={data} />;
								})}
						</TabPane>

						{/* Specialized */}
						<TabPane tab="Chuyên ngành" key="2">
							{specialized &&
								specialized.map((data, index) => {
									return <GeneralResult key={index} data={data} />;
								})}
						</TabPane>

						{/* Relate */}
						<TabPane tab="Các từ liên quan" key="3">
							{relate && Object.keys(relate).length !== 0 && (
								<>
									{/* Synonymous */}
									{relate?.synonymous?.length > 0 && (
										<RelateResult
											title={"Từ đồng nghĩa"}
											datas={relate.synonymous}
										/>
									)}

									{/* Antonym */}
									{relate?.antonym?.length > 0 && (
										<RelateResult
											title={"Từ trái nghĩa"}
											datas={relate.antonym}
										/>
									)}
								</>
							)}
						</TabPane>
					</Tabs>
					<BackToTopButton />)
				</>
			)}
		</div>
	);
}

TranslateResult.propTypes = { translateResult: PropTypes.object };

TranslateResult.defaultProps = {
	translateResult: {},
};

export default TranslateResult;
