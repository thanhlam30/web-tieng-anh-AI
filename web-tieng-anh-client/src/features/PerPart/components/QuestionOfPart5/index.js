import { Alert, Col, Divider, Image, Row, Space, Typography } from "antd";
import { setChoiceOfPart1_2_5 } from "features/PerPart/perPartSlice";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ButtonCustom from "../ButtonCustom";
import EmptyButton from "../EmptyButtonList";
import "./style.scss";
import parse from "html-react-parser";

const { Title, Text } = Typography;

QuestionOfPart5.propTypes = {
  question: PropTypes.object,
};

QuestionOfPart5.defaultProps = {
  question: {},
};

function QuestionOfPart5({ question }) {
  const dispatch = useDispatch();

  const { content, a, b, c, d, result, extra } = question;

  const [choice, setChoice] = useState("");

  const handleAnswerClick = (answer) => {
    setChoice(answer.toLowerCase());
    dispatch(setChoiceOfPart1_2_5(true));
  };

  const renderQuestionAnswer = (char, content) => {
    if (choice) {
      return (
        <ButtonCustom
          content={content}
          type={
            result === char ? "primary" : choice === char ? "danger" : "default"
          }
        />
      );
    }

    return (
      <ButtonCustom
        content={content}
        type="default"
        onClick={() => handleAnswerClick(char)}
      />
    );
  };

  useEffect(() => {
    setChoice("");
  }, [question]);

  return (
    <div className="question-of-part-5">
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <div className="question-part-5__content">
          <Text style={{ fontSize: "18px" }}>{content}</Text>
        </div>

        <Divider orientation="left">Câu hỏi</Divider>
        <div className="buttons">
          <Row gutter={[8, 24]}>
            <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>{renderQuestionAnswer("a", a)}</Col>

            <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>{renderQuestionAnswer("b", b)}</Col>

            <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>{renderQuestionAnswer("c", c)}</Col>

            <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>{renderQuestionAnswer("d", d)}</Col>
          </Row>
        </div>

        {choice && extra && (
          <div className="extras">
            <Divider orientation="left">Giải thích</Divider>

            {parse(
              `<div style="font-size:16px; font-weight:500">${extra}</div>`
            )}
          </div>
        )}
      </Space>
    </div>
  );
}

export default QuestionOfPart5;
