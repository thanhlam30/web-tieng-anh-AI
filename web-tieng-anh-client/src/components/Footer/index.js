import React from "react";
import PropTypes from "prop-types";
import "./footer.scss";
import { Col, Divider, Row, Space } from "antd";
import logo from 'images/logo/logo.png';
import { FacebookFilled, InstagramFilled, TwitterSquareFilled, GithubOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

Footer.propTypes = {};

function Footer(props) {
    return (
        <div className="footer">
            <Divider style={{ marginTop: '0px' }} />
            <Row gutter={[0, 16]}>
                <Col xl={{ span: 10 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                    <div className='footer_left'>


                        <Link to="/" >
                            <div className="footer_left-logo-page">
                                <img src={logo} alt="SMP-English" />
                            </div>
                        </Link>




                        <div className="footer_left-intro">
                            Website có thi thử TOEIC online!
                        </div>

                        <div className="footer_left-contact">

                            <a href="#" className='footer_left-contact--logo-branch'>
                                <FacebookFilled />
                            </a>
                            <a href="#" className='footer_left-contact--logo-branch'>
                                <TwitterSquareFilled />
                            </a>
                            <a href="#" className='footer_left-contact--logo-branch'>
                                <InstagramFilled />
                            </a>
                        </div>


                    </div>
                </Col>

                <Col xl={{ span: 14 }} xs={{ span: 24 }} sm={{ span: 24 }} >
                    <div className='footer_right'>
                        <Row gutter={[8, 8]}>
                            <Col xl={{ span: 8 }} xs={{ span: 24 }} sm={{ span: 8 }} >
                                <ul className="footer_right-title">
                                    <span>Hỗ trợ</span>

                                    <li className="footer_right-list">
                                        {/* <Link to={"/videos/" + slugCategory}>{categoryName}</Link> */}
                                        <Link to="/" >Hướng dẫn sủ dụng</Link>
                                    </li>
                                    <li className="footer_right-list">
                                        <Link to="/">Cộng đồng</Link>
                                    </li>
                                    <li className="footer_right-list">
                                        <Link to="/">Báo cáo lạm dụng</Link>
                                    </li>
                                </ul>

                            </Col>
                            <Col xl={{ span: 8 }} xs={{ span: 24 }} sm={{ span: 8 }}>
                                <ul className="footer_right-title">
                                    <span>Khám phá</span>

                                    <li className="footer_right-list">
                                        {/* <Link to={"/videos/" + slugCategory}>{categoryName}</Link> */}
                                        <Link to="/">Trang chủ</Link>
                                    </li>
                                    <li className="footer_right-list">
                                        <Link to="/exams">Thi Online</Link>
                                    </li>
                                    <li className="footer_right-list">
                                        <Link to="/translate">Tra từ</Link>
                                    </li>
                                </ul>

                            </Col>
                            <Col xl={{ span: 8 }} xs={{ span: 24 }} sm={{ span: 8 }} >
                                <ul className="footer_right-title">
                                    <span>Creators</span>

                                    <li className="footer_right-list">
                                        <a href="https://github.com/thanhlam30" target="_blank"><GithubOutlined /> Đỗ Thanh Lâm</a>
                                    </li>
                                </ul>

                            </Col>
                        </Row>



                        <Row gutter={[8, 8]}>
                            <Col span={24} >
                                <div className='footer_right-copyright'>
                                    © Copyright by Do Thanh Lam. All rights reserved.
                                </div>
                            </Col>

                        </Row>
                    </div>
                </Col>



            </Row>
        </div >
    );
}

export default Footer;
