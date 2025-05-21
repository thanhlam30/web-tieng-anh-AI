import { Button } from "antd";
import PropTypes from "prop-types";
import React from "react";

ButtonCustom.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

ButtonCustom.defaultProps = {
  content: "",
  type: "default",
  onClick: null,
};

function ButtonCustom({ content, type, onClick }) {
  const handleClick = () => {
    if (!onClick) return;

    onClick();
  };

  return (
    <>
      <Button
        type={type}
        shape="round"
        size="large"
        style={{
          width: "100%",
          padding: "20px 0px",
          height: "auto",
          textAlign: "center",
        }}
        onClick={handleClick}
      >
        {content}
      </Button>
    </>
  );
}

export default ButtonCustom;
