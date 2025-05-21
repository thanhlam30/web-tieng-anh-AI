import { Spin } from "antd";
import NotFoundPage from "components/NotFoundPage";
import MainPage from "features/Login/pages/MainPage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";

function Login(props) {
  const { url } = useRouteMatch();
  const { isLoading } = useSelector((state) => state.login);

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

export default Login;
