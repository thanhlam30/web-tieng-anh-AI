import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "components/NotFoundPage";

function Me(props) {
  const { isLoading } = useSelector((state) => state.me);
  const match = useRouteMatch();
  const { url } = match;

  return (
    <Spin spinning={isLoading}>
      <div>
        <Switch>
          <Route exact path={url} component={MainPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Spin>
  );
}

export default Me;
