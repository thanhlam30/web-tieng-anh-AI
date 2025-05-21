import { Spin } from "antd";
import NotFoundPage from "components/NotFoundPage";
import MainPage from 'features/Video/pages/Mainpage';
import React from 'react';
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import VideoPage from './pages/VideoPage';

Video.propTypes = {

};

function Video(props) {

    const { isLoading } = useSelector((state) => state.login);
    return (
        <Spin spinning={isLoading} >
            <div>
                <Switch>
                    <Route exact path="/videos/:slugCategory" component={MainPage} />
                    <Route exact path="/videos/:slugCategory/:slugVideo" component={VideoPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Spin >
    );
}

export default Video;