import { CloseCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Divider, Row, Tag, Typography } from "antd";
import InputField from "customfield/InputField";
import { login, setLoading } from "features/SignUp/signUpSlice";
import { FastField, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import "./main-page.scss";
import { setLogin } from "app/globalSlice";
import signUpApi from "api/signUpApi";
import { useHistory } from "react-router-dom";
import { message } from "antd"; 

const { Text, Title } = Typography;

MainPage.propTypes = {};

const initialValues = {
    name: "",
	username: "",
	password: "",
    repeat: "",
};

function MainPage(props) {
	const dispatch = useDispatch();
    const history = useHistory(); 

	const { isLogin } = useSelector((state) => state.global);
	const [isError, setError] = useState(false);

	useEffect(() => {
		document.title = "Đăng Ký";
	}, []);

	const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên hiển thị không được bỏ trống."),
		username: Yup.string().required("Tài khoản không được bỏ trống."),
		password: Yup.string().required("Mật khẩu không được bỏ trống"),
            repeat: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu nhập lại không khớp.")
        .required("Vui lòng nhập lại mật khẩu."),
	});

	const handleSubmit = async (values, actions) => {
		const { name, username, password } = values;

		try {
			dispatch(setLoading(true));
			const response = await signUpApi.signUp(name, username, password);

            if (response?.status === 201) {
				message.success("Đăng ký thành công! Vui lòng đăng nhập.");
				history.push("/login/manage"); 
			} else {
				setError(true);
			}

		} catch (error) {
			setError(true);
		}

		dispatch(setLoading(false));
	};

	return (
		<div id="signup-main-page">
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
												name="name"
												component={InputField}
												type="text"
												title="Tên hiển thị"
												placeholder="Nhập tên hiển thị"
												maxLength={50}
											></FastField>
										</Col>
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
                                        <Col span={24}>
											<FastField
												name="repeat"
												component={InputField}
												type="password"
												title="Nhập lại mật khẩu"
												placeholder="Nhập lại mật khẩu"
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
												Đăng ký
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
