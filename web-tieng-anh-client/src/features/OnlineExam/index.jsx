import NotFoundPage from "components/NotFoundPage";
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { fetchBooks } from "./onlineExamSlice";
import CheckInExam from "./pages/CheckInExam";
import Checkout from './pages/Checkout';
import Examining from './pages/Examining';
import MainPage from './pages/MainPage';
import ResultPage from './pages/ResultPage';

OnlineExam.propTypes = {

};

function OnlineExam(props) {
    const match = useRouteMatch();
    const { url } = match;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);



    return (
        <div >
            <Switch>

                <Route path={`${url}/:testId/checkin`} component={CheckInExam} />
                <Route path={`${url}/:testId/examining`} component={Examining} />
                <Route path={`${url}/:testId/checkout`} component={Checkout} />
                <Route path={`${url}/:testId/result`} component={ResultPage} />
                <Route exact path={url} component={MainPage} />
                <Route component={NotFoundPage} />

            </Switch>
        </div>
    );
}

export default OnlineExam;