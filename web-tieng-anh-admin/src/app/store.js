import { configureStore } from "@reduxjs/toolkit";
import global from "./globalSlice";
import login from "features/Login/loginSlice";
import exam from "features/Exam/examSlice";
import video from "features/Video/videoSlice";
import user from "features/User/userSlice";
import course from "features/Course/courseSlice";
import book from "features/Book/bookSlice";

const rootReducer = {
	global,
	login,
	exam,
	video,
	user,
	book,
	course,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
