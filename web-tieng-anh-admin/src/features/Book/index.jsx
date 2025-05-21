import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import MainPage from 'features/Book/pages/MainPage';

Book.propTypes = {

};

function Book(props) {
    const { isLoading } = useSelector((state) => state.book)
    const { url } = useRouteMatch();
    return (
        <Spin spinning={isLoading}>
            <Switch>
                <Route exact path={url} component={MainPage} />
            </Switch>
        </Spin>
    );
}

export default Book;