import React from "react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";
import "./style.scss";
import { Link, useRouteMatch } from "react-router-dom";

FinishPage.propTypes = {};

function FinishPage(props) {
  const match = useRouteMatch();
  const { examSlug, numberPart } = match.params;

  return (
    <div id="per-part-finish-page">
      <div class="main">
        <Result
          status="success"
          title="Bạn đã hoàn thành"
          //subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console" size="large">
              <Link to={`/parts/${numberPart}`}>Làm các đề khác</Link>
            </Button>,
            <Button key="buy" size="large">
              <Link to={`/parts/test/${examSlug}/${numberPart}`}>Làm lại</Link>
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}

export default FinishPage;
