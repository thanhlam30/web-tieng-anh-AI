import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from 'app/globalSlice';
import { Redirect } from 'react-router-dom'
AuthPage.propTypes = {

};

function AuthPage(props) {
    const { isLogin } = useSelector((state) => state.global);
    const dispatch = useDispatch();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    useEffect(() => {
        const token = query.get("token");
        if (token !== null && token !== undefined && token !== "") {
            localStorage.setItem('token', token);
            dispatch(setLogin(true));
        }
    }, [])

    return (
        <div>
            {console.log("Login", isLogin)}
            {isLogin && <Redirect to="/" />}
        </div>
    );
}

export default AuthPage;