import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/MainPage";

User.propTypes = {};

function User(props) {
  const { url } = useRouteMatch();
  const { isLoading } = useSelector((state) => state.exam);

  return (
    <Spin spinning={isLoading}>
      <Switch>
        <Route exact path={url} component={MainPage} />
      </Switch>
    </Spin>
  );
}

export default User;
