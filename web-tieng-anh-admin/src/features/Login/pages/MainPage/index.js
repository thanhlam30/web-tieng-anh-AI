import { CloseCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Divider, Row, Tag, Typography } from "antd";
import InputField from "customfield/InputField";
import { login, setLoading } from "features/Login/loginSlice";
import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import "./main-page.scss";
import loginApi from "api/loginApi";
import { fetchNameRoles, setLogin } from "app/globalSlice";

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

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Tài khoản không được bỏ trống."),
    password: Yup.string().required("Mật khẩu không được bỏ trống"),
  });

  const handleSubmit = async (values, actions) => {
    const { username, password } = values;

    try {
      dispatch(setLoading(true));

      // 400 500
      const { token } = await loginApi.login(username, password);
      localStorage.setItem("token", token);
      dispatch(fetchNameRoles());
    } catch (error) {
      setError(true);
    }

    dispatch(setLoading(false));
  };

  return (
    <div id="login-main-page">
      {isLogin ? (
        <Redirect to="/admin" />
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
                <Form>
                  <Row gutter={[0, 16]}>
                    <Col span={24}>
                      <FastField
                        name="username"
                        component={InputField}
                        type="text"
                        title="Tài khoản"
                        placeholder="Nhập tài khoản"
                        maxLength={50}
                        titleCol={8}
                        inputCol={16}
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
                        titleCol={8}
                        inputCol={16}
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
