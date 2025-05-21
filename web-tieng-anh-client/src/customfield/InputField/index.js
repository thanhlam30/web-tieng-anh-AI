import React from "react";
import PropTypes from "prop-types";
import { Col, Input, Row, Tag, Typography } from "antd";
import { ErrorMessage } from "formik";

const { Text } = Typography;

InputField.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  isRequire: PropTypes.bool,
  disabled: PropTypes.bool,
  titleCol: PropTypes.number,
  inputCol: PropTypes.number,
};

InputField.defaultProps = {
  title: "",
  type: "text",
  placeholder: "",
  maxLength: 50,
  isRequire: false,
  disabled: false,
  titleCol: 8,
  inputCol: 16,
};

function InputField(props) {
  const {
    field,
    title,
    type,
    placeholder,
    maxLength,
    disabled,
    isRequire = false,
    titleCol = 8,
    inputCol = 16,
  } = props;
  const { name } = field;

  return (
    <Row>
      <Col span={titleCol}>
        <Text strong>
          {title}

          {isRequire && <Text type="danger"> *</Text>}
        </Text>
      </Col>
      <Col span={inputCol}>
        <Input
          {...field}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
        />
        <ErrorMessage name={name}>
          {(text) => <Tag color="red">{text}</Tag>}
        </ErrorMessage>
      </Col>
    </Row>
  );
}

export default InputField;
