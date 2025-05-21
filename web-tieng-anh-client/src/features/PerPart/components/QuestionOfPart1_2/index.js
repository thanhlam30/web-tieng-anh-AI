import { Alert, Col, Divider, Image, Row, Space, Typography } from "antd";
import { setChoiceOfPart1_2_5 } from "features/PerPart/perPartSlice";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ButtonCustom from "../ButtonCustom";
import EmptyButton from "../EmptyButtonList";
import "./style.scss";
import parse from "html-react-parser";

const { Text } = Typography;

QuestionOfPart1_2.propTypes = {
  question: PropTypes.object,
};

QuestionOfPart1_2.defaultProps = {
  question: {
    extra: "",
  },
};

function QuestionOfPart1_2({ question }) {
  const dispatch = useDispatch();

  const { content, a, b, c, d, result, extra = "", audio, type } = question;

  const [choice, setChoice] = useState("");

  const audioRef = useRef();

  const handleAnswerClick = (answer) => {
    setChoice(answer.toLowerCase());
    dispatch(setChoiceOfPart1_2_5(true));
  };

  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.load();
  }

  const renderQuestionAnswer = (char, content) => {
    return (
      <ButtonCustom
        content={content}
        type={
          result === char ? "primary" : choice === char ? "danger" : "default"
        }
      />
    );
  };

  useEffect(() => {
    setChoice("");
  }, [question]);

  return (
    <div className="question-of-part-1-2">
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {type == 1 && (
          <div className="image">
            <Image width="100%" height="300px" src={content} style={{ objectFit: 'contain' }} />
          </div>
        )}

        {type == 2 && (
          <div
            className="question-part-1-2__content"
            style={{ visibility: `${choice ? "visible" : "hidden"}` }}
          >
            <Text style={{ fontSize: "18px" }}>{content}</Text>
          </div>
        )}

        <div className="audio">
          <audio controls ref={audioRef} autoPlay>
            <source src={audio} type="audio/mp3" />
          </audio>
        </div>

        <Divider orientation="left">Câu hỏi</Divider>
        <div className="buttons">
          {choice ? (
            <Row gutter={[8, 24]}>
              <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>{renderQuestionAnswer("a", a)}</Col>

              <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>{renderQuestionAnswer("b", b)}</Col>

              <Col xl={type === 1 ? { span: 12 } : { span: 24 }} lg={type === 1 ? { span: 12 } : { span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                {renderQuestionAnswer("c", c)}
              </Col>

              <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>{renderQuestionAnswer("d", d)}</Col>
            </Row>
          ) : (
            <EmptyButton
              number={type === 1 ? 4 : 3}
              onAnswerClick={handleAnswerClick}
            />
          )}
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

export default QuestionOfPart1_2;
