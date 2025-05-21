import { Spin } from "antd";
import NotFoundPage from "components/NotFoundPage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import LoginPage from 'features/Login/pages/LoginPage';
import MainPage from 'features/Login/pages/MainPage';

function Login(props) {
  const { isLoading } = useSelector((state) => state.login);
  const { url } = useRouteMatch();

  return (
    <Spin spinning={isLoading}>
      <div>
        <Switch>
          <Route exact path={url} component={LoginPage} />
          <Route exact path={url + "/manage"} component={MainPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Spin>
  );
}

export default Login;
