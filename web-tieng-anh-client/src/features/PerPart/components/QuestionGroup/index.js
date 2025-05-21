import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Radio, Space, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import parse from "html-react-parser";

const { Text } = Typography;

QuestionGroup.propTypes = {
  questions: PropTypes.array,
  isChoice: PropTypes.bool,
};

QuestionGroup.defaultProps = {
  questions: [],
  isChoice: false,
};

function QuestionGroup({ questions, isChoice }) {
  const [radioValues, setRadioValues] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    const radioValuesTempt = [...radioValues];

    const searchIndex = radioValuesTempt.findIndex(
      (answerTempt) => answerTempt.stt === name
    );

    // không tìm thấy
    if (searchIndex === -1) {
      radioValuesTempt.push({ stt: name, answer: value });
    } else radioValuesTempt[searchIndex].answer = value;

    setRadioValues(radioValuesTempt);
  };

  const renderQuestionAnswer = (char, content, result, answer) => {
    return (
      <div>
        {result === char ? (
          <Text strong underline type="success">
            {content} <CheckOutlined />
          </Text>
        ) : answer === char ? (
          <Text type="danger">
            {content} <CloseOutlined />
          </Text>
        ) : (
          <Text>{content}</Text>
        )}
      </div>
    );
  };

  return (
    <div>
      {questions.map((questionEle, index) => {
        const { stt, content, a, b, c, d, result, extra } = questionEle;

        const answerEle = radioValues.find((answerEle) => answerEle.stt == stt);
        const answer = answerEle ? answerEle.answer : "";

        return (
          <div>
            <div>
              <Text strong style={{ fontSize: "18px" }}>
                {content}
              </Text>
            </div>

            <div>
              {!isChoice ? (
                <Radio.Group onChange={handleChange} name={`${stt}`}>
                  <Space direction="vertical">
                    <Radio value="a">{a}</Radio>
                    <Radio value="b">{b}</Radio>
                    <Radio value="c">{c}</Radio>
                    <Radio value="d">{d}</Radio>
                  </Space>
                </Radio.Group>
              ) : (
                <Space direction="vertical">
                  {renderQuestionAnswer("a", a, result, answer)}
                  {renderQuestionAnswer("b", b, result, answer)}
                  {renderQuestionAnswer("c", c, result, answer)}
                  {renderQuestionAnswer("d", d, result, answer)}

                  {extra && (
                    <div className="extras">
                      {parse(
                        `<div style="font-size:16px; font-weight:500">- Giải thích: ${extra}</div>`
                      )}
                    </div>
                  )}
                </Space>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default QuestionGroup;
