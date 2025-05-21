import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MainPage from "features/Home/pages/MainPage";
import NotFoundPage from "components/NotFoundPage";

Home.propTypes = {};

function Home(props) {
  const { url } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={url} component={MainPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default Home;
