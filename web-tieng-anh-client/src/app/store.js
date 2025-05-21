import { configureStore } from "@reduxjs/toolkit";
import course from "features/Courses/courseSlice";
import home from "features/Home/homeSlice";

import login from "features/Login/loginSlice";
import me from "features/Me/meSlice";
import exam from "features/OnlineExam/onlineExamSlice";
import perPart from "features/PerPart/perPartSlice";
import translate from "features/Translate/translateSlice";
import wordNote from "features/WordNote/wordNoteSlice";
import video from "features/Video/videoSlice";
import global from "./globalSlice";

const rootReducer = {
    global,
    me,
    login,
    home,
    video,
    exam,
    course,
    translate,
    perPart,
    wordNote,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
