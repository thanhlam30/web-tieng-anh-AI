import { CloseCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Divider, Row, Tag, Typography } from "antd";
import InputField from "customfield/InputField";
import { login, setLoading } from "features/Login/loginSlice";
import { FastField, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import "./main-page.scss";
import loginApi from "api/loginApi";
import { setLogin } from "app/globalSlice";

const { Text, Title } = Typography;

MainPage.propTypes = {};

const initialValues = {
	username: "",
	password: "",
};

function MainPage(props) {
	const dispatch = useDispatch();

	const { isLogin } = useSelector((state) => state.global);
	const [isError, setError] = useState(false);

	useEffect(() => {
		document.title = "Đăng nhập";
	}, []);

	const validationSchema = Yup.object().shape({
		username: Yup.string().required("Tài khoản không được bỏ trống."),
		password: Yup.string().required("Mật khẩu không được bỏ trống"),
	});

	const handleSubmit = async (values, actions) => {
		const { username, password } = values;

		try {
			dispatch(setLoading(true));
			const { token } = await loginApi.login(username, password);

			dispatch(setLogin(true));
			localStorage.setItem("token", token);

			const parseJwt = (token) => {
				try {
					const base64Url = token.split('.')[1];
					const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
					const jsonPayload = decodeURIComponent(
						atob(base64)
							.split('')
							.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
							.join('')
					);
					return JSON.parse(jsonPayload);
				} catch (e) {
					return null;
				}
			};

			const decoded = parseJwt(token);
			if (decoded?.sub) {
				localStorage.setItem("username", decoded.sub);
			}
		} catch (error) {
			setError(true);
		}

		dispatch(setLoading(false));
	};

	return (
		<div id="login-main-page">
			{isLogin ? (
				<Redirect to="/" />
			) : (
				<div className="main">
					<Title level={2} style={{ textAlign: "center" }}>
						<Text style={{ color: "#08aeea" }}>Đăng</Text> nhập
					</Title>
					<Divider />

					<Formik
						initialValues={{ ...initialValues }}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
						enableReinitialize={true}
					>
						{(formikProps) => {
							return (
								<Form layout="horizontal">
									<Row gutter={[0, 16]}>
										<Col span={24}>
											<FastField
												name="username"
												component={InputField}
												type="text"
												title="Tài khoản"
												placeholder="Nhập tài khoản"
												maxLength={50}
											></FastField>
										</Col>

										<Col span={24}>
											<FastField
												name="password"
												component={InputField}
												type="password"
												title="Mật khẩu"
												placeholder="Nhập mật khẩu"
												maxLength={200}
											></FastField>
										</Col>
										{isError ? (
											<Col offset={8} span={16}>
												<Tag
													color="error"
													style={{ fontWeight: "bold" }}
													icon={<CloseCircleOutlined />}
												>
													Tài khoản không hợp lệ
												</Tag>
											</Col>
										) : (
											""
										)}

										<Col offset={8}>
											<Button type="primary" htmlType="submit">
												Đăng nhập
											</Button>
										</Col>
									</Row>
								</Form>
							);
						}}
					</Formik>
				</div>
			)}
		</div>
	);
}

export default MainPage;
