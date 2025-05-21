import { setLogin } from "app/globalSlice";
import Footer from "components/Footer";
import Header from "components/Header";
import NotFoundPage from "components/NotFoundPage";
import ProtectedRoute from "components/ProtectedRoute";
import Course from "features/Courses";
import Home from "features/Home";
import Login from "features/Login";
import SignUp from "features/SignUp";
import Me from "features/Me";
import OnlineExam from "features/OnlineExam";
import PerPart from "features/PerPart";
import Translate from "features/Translate";
import Video from "features/Video";
import WordNote from "features/WordNote";
import React, { useEffect } from "react";
import ChatWithAI from "features/ChatWithAI";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) dispatch(setLogin(true));
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/translate" component={Translate} />
                    <Route path="/videos" component={Video} />
                    <Route path="/exams" component={OnlineExam} />
                    <Route path="/courses" component={Course} />
                    <Route path="/chat" component={ChatWithAI} />
                    <ProtectedRoute path="/wordnotes" component={WordNote} />
                    <ProtectedRoute path="/me" component={Me} />
                    <Route path="/parts" component={PerPart} />
                    <Route component={NotFoundPage} />

                </Switch>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
