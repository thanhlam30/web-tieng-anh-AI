import React from "react";
import PropTypes from "prop-types";
import ButtonCustom from "../ButtonCustom";
import { Col, Row } from "antd";

EmptyButton.propTypes = {
  number: PropTypes.number,
  onAnswerClick: PropTypes.func,
};

EmptyButton.propTypes = {
  number: 4,
  onAnswerClick: null,
};

const STT_CHAR = ["A", "B", "C", "D"];

function EmptyButton({ number, onAnswerClick }) {
  const renderButton = (number) => {
    const result = [];

    for (let i = 0; i < number; i++) {
      const char = STT_CHAR[i];

      const isRenderColumn24 = number === 3 && i === 2;
      
      result.push(
        <Col xl={isRenderColumn24 ? { span: 24 } : { span: 12 }} lg={isRenderColumn24 ? { span: 24 } : { span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }} key={i}>
          <ButtonCustom
            type="default"
            content={char}
            onClick={() => onAnswerClick(char)}
          />
        </Col>
      );
    }

    return result;
  };

  return <Row gutter={[8, 24]}>{renderButton(number)}</Row>;
}

export default EmptyButton;
