import { Breadcrumb, Button, Layout, message } from 'antd';
import { setDefaultLogin } from 'app/globalSlice';
import AuthorizeRoute from 'components/AuthorizeRoute';
import NotFoundPage from 'components/NotFoundPage';
import SiderBar from 'components/SiderBar';
import Book from 'features/Book';
import Course from 'features/Course';
import Exam from 'features/Exam';
import Home from 'features/Home';
import User from 'features/User';
import Video from 'features/Video';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import './style.scss';

const { Header, Content, Footer, Sider } = Layout;

AdminLayout.propTypes = {};

function AdminLayout(props) {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    const { isLogin } = useSelector((state) => state.global);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setDefaultLogin());

        message.success('Đăng xuất thành công');
    };

    return (
        <div id="admin-layout">
            {!isLogin ? (
                <Redirect to="/login" />
            ) : (
                <Layout style={{ minHeight: '100vh' }}>
                    <SiderBar />
                    <Layout className="site-layout">
                        <Header
                            className="site-layout-background"
                            style={{ padding: 0 }}
                        >
                            <Button onClick={handleLogout}>Logout</Button>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>

                            <div className="site-layout-background">
                                <Switch>
                                    <Route exact path={url} component={Home} />

                                    <AuthorizeRoute
                                        path={`${url}/exams`}
                                        component={Exam}
                                        role="ROLE_EXAM"
                                    />

                                    <AuthorizeRoute
                                        path={`${url}/courses`}
                                        component={Course}
                                        role="ROLE_COURSE"
                                    />

                                    <AuthorizeRoute
                                        path={`${url}/books`}
                                        component={Book}
                                        role="ROLE_EXAM"
                                    />

                                    <AuthorizeRoute
                                        path={`${url}/videos`}
                                        component={Video}
                                        role="ROLE_VIDEO"
                                    />

                                    <AuthorizeRoute
                                        path={`${url}/users`}
                                        component={User}
                                    />

                                    <Route component={NotFoundPage} />
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            HaUI - Đại học Công nghiệp Hà Nội
                        </Footer>
                    </Layout>
                </Layout>
            )}
        </div>
    );
}

export default AdminLayout;
