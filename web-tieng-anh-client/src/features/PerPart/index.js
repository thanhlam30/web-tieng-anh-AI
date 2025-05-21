import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Spin } from "antd";
import MainPage from "./pages/MainPage";
import NotFoundPage from "components/NotFoundPage";
import { useSelector } from "react-redux";
import TestPage from "./pages/TestPage";
import FinishPage from "./pages/FinishPage";

PerPart.propTypes = {};

function PerPart(props) {
  const { isLoading } = useSelector((state) => state.perPart);
  const { url } = useRouteMatch();

  return (
    <Spin spinning={isLoading}>
      <div>
        <Switch>
          <Route exact path={`${url}/:numberPart`} component={MainPage} />
          <Route
            exact
            path={`${url}/test/:examSlug/:numberPart`}
            component={TestPage}
          />
          <Route
            path={`${url}/test/:examSlug/:numberPart/finish`}
            component={FinishPage}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Spin>
  );
}

export default PerPart;
