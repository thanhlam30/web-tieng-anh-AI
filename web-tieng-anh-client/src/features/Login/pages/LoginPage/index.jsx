import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import logo from "images/logo/logo.png";
import authLink from "constants/authLink";
LoginPage.propTypes = {};

function LoginPage(props) {
	useEffect(() => {
		document.title = "Đăng nhập";
	}, []);
	return (
		<div id="form_wrapper">
			<div className="overlay-container">
				<div className="left_side">
					<img src={logo} alt="logo-english" />
				</div>

				<div className="right_side">
					<div>
						<h1 className="title">Đăng nhập</h1>
					</div>
					<div className="logo_sign-up">
						<a href={authLink.googleAuth}>
							<div className="block-google block">
								<div className="icon-login">
									<GoogleOutlined style={{ fontSize: "30px" }} />
								</div>
								<div className="text-button">
									<span>Đăng nhập với Google</span>
								</div>
							</div>
						</a>
						<a href={authLink.facebookAuth}>
							<div className="block-facebook block">
								<div className="icon-login">
									<FacebookOutlined style={{ fontSize: "30px" }} />
								</div>
								<div className="text-button">
									<span>Đăng nhập với Facebook</span>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
