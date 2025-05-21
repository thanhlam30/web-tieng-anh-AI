import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

AuthorizeRoute.propTypes = {};

function AuthorizeRoute({ component: Component, role, path }) {
  const { roles } = useSelector((state) => state.global);

  const handleAuthorizeCheck = () => {
    const index = roles.findIndex(
      (roleEle) => roleEle === "ROLE_ADMIN" || roleEle === role
    );

    return index !== -1;
  };

  return (
    <Route
      path={path}
      render={(props) => {
        if (handleAuthorizeCheck()) return <Component />;

        return (
          <Redirect
            to={{
              pathname: "/admin",
            }}
          />
        );
      }}
    />
  );
}

export default AuthorizeRoute;
